import { createContext, useContext, useState, useRef } from "react";

type Mode = "create" | "edit";

interface WizardData {
  datosGenerales?: any;
  perfiles?: any[];
  skills?: any;
  proyecto?: any;
}

interface WizardContextType {
  mode: Mode;
  setMode: (mode: Mode) => void;

  id: string | null;
  setId: (id: string | null) => void;

  data: WizardData;

  isLoading: boolean;
  setIsLoading: (value: boolean) => void;

  setDatosGenerales: (data: any) => void;
  setPerfiles: (data: any[]) => void;
  setSkills: (data: any) => void;
  setProyecto: (data: any) => void;

  setAllData: (data: WizardData) => void;

  reset: () => void;
}

const WizardContext = createContext<WizardContextType | null>(null);

export const PersonalWizardProvider = ({ children }: any) => {
  const [data, setData] = useState<WizardData>({});
  const [mode, setModeState] = useState<Mode>("create");
  const [id, setIdState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 🔥 CONTROL PARA EVITAR RESETS ACCIDENTALES
  const initializedRef = useRef(false);

  // ✅ setters protegidos
  const setMode = (newMode: Mode) => {
    setModeState((prev) => {
      if (prev === newMode) return prev;
      return newMode;
    });
  };

  const setId = (newId: string | null) => {
    setIdState((prev) => {
      if (prev === newId) return prev;
      return newId;
    });
  };

  // ✅ setters de data seguros
  const setDatosGenerales = (datosGenerales: any) => {
    setData((prev) => ({
      ...prev,
      datosGenerales,
    }));
  };

  const setPerfiles = (perfiles: any[]) => {
    setData((prev) => ({
      ...prev,
      perfiles,
    }));
  };

  const setSkills = (skills: any) => {
    setData((prev) => ({
      ...prev,
      skills,
    }));
  };

  const setProyecto = (proyecto: any) => {
    setData((prev) => ({
      ...prev,
      proyecto,
    }));
  };

  // 🔥 IMPORTANTE: no sobreescribir si ya hay data
  const setAllData = (newData: WizardData) => {
    setData((prev) => {
      // evita borrar datos existentes si ya hay info
      if (Object.keys(prev).length > 0 && initializedRef.current) {
        return prev;
      }

      initializedRef.current = true;
      return newData;
    });
  };

  const reset = () => {
    initializedRef.current = false;
    setData({});
    setModeState("create");
    setIdState(null);
    setIsLoading(false);
  };

  return (
    <WizardContext.Provider
      value={{
        mode,
        setMode,

        id,
        setId,

        data,

        isLoading,
        setIsLoading,

        setDatosGenerales,
        setPerfiles,
        setSkills,
        setProyecto,

        setAllData,

        reset,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};

export const usePersonalWizard = () => {
  const context = useContext(WizardContext);
  if (!context)
    throw new Error("usePersonalWizard must be used within provider");
  return context;
};
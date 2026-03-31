import { useEffect, useState } from "react";

export const usePersonalData = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData([
        {
          numero: "001",
          compania: "Tech SA",
          nombre: "Juan Perez",
          curp: "XXXX",
          rfc: "YYYY",
          telefono: "5551234567",
          email: "juan@mail.com",
          direccion: "CDMX",
          esquema: "Nomina",
          tipo: "Interno",
          nss: "123456",
          fechaAlta: "2024-01-01",
          fechaBaja: "",
          fechaMod: "2024-02-01",
          usuarioMod: "admin",
        },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  return { data, loading };
};

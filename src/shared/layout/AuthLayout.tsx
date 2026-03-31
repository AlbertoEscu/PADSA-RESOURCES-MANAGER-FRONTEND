import logo from "../../assets/logo.png";

interface Props {
  children: React.ReactNode;
}

export const AuthLayout = ({ children }: Props) => {

  return (

    <div className="min-h-screen bg-padsa-background flex items-center justify-center relative overflow-hidden">

      {/* fondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-padsa-background to-black"/>

      {/* glow rojo */}
      <div className="absolute w-[500px] h-[500px] bg-padsa-primary rounded-full blur-[140px] opacity-20 top-[-150px] left-[-150px]" />

      <div className="absolute w-[400px] h-[400px] bg-padsa-primary rounded-full blur-[140px] opacity-10 bottom-[-100px] right-[-100px]" />

      {/* contenido */}
      <div className="relative z-10 w-full max-w-md">

        {/* logo */}
        <div className="flex flex-col items-center mb-8">

          <img
            src={logo}
            className="w-20 mb-4"
          />

          <h1 className="text-padsa-text-primary text-2xl font-semibold">
            PADSA
          </h1>

          <p className="text-padsa-text-secondary text-sm">
            Resources Manager
          </p>

        </div>

        {/* card */}
        <div className="
          bg-padsa-surface/80
          backdrop-blur-xl
          border border-padsa-border
          rounded-2xl
          p-8
          shadow-padsa
        ">

          {children}

        </div>

      </div>

    </div>

  );

};
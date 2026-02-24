import React from "react";

interface WelcomeMessageProps {
  user: string;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ user }) => {
  return (
    <div className="text-xl font-bold mb-4 text-white">
  Bienvenido: <span className="text-blue-300">{user}</span>
</div>

  );
};

export default WelcomeMessage;

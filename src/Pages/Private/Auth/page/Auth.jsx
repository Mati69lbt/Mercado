import React, { useState } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../../Firebase/config";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Construimos el email igual que al crear: usuario@mercadoargentino.com
      const emailFinal = email.includes("@")
        ? email
        : `${email.trim().toLowerCase()}@mercadoargentino.com`;

      await signInWithEmailAndPassword(auth, emailFinal, password);

      // Chequeamos si es empresa o admin
      if (email.includes("@")) {
        // Es el admin (usa email real)
        navigate("/admin");
      } else {
        // Es una empresa (usó nombre de usuario)
        navigate("/empresa/dashboard");
      }
    } catch (error) {
      alert("Usuario o contraseña incorrectos");
    }
  };
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-2 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-2 text-center text-xl font-bold tracking-tight text-gray-900">
          "Los Hombres como nosotros no se rinden; la verdadera fortaleza está
          en mantenerse en pie cuando todo empuja hacia abajo."
        </h2>
      </div>

      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          action="#"
          method="POST"
          className="space-y-6"
          onSubmit={handleLogin}
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Usuario o Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="text"
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            {/* 1. Agregamos 'relative' a este contenedor */}
            <div className="mt-2 relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                // 2. Agregamos 'pr-10' para que el texto no se superponga con el ojito
                className="block w-full rounded-md bg-white px-3 py-1.5 pr-10 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* 3. Movimos el botón AQUÍ, dentro del div relative y después del input */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                // 'absolute inset-y-0 right-0' lo posiciona a la derecha y centrado verticalmente
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-indigo-600 transition-colors z-10"
              >
                {showPassword ? (
                  // Icono Ojo Cerrado
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9.88 9.88L14.12 14.12" />
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                    <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                    <line x1="2" y1="2" x2="22" y2="22" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  // Icono Ojo Abierto
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;

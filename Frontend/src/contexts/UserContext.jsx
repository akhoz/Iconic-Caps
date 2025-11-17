// src/contexts/UserContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // lo mínimo indispensable en cliente; NUNCA rol "admin" como verdad absoluta
  const [user, setUser] = useState(() => {
    const raw = sessionStorage.getItem("app_user");
    return raw ? JSON.parse(raw) : null;
  });
  const [loggedIn, setLoggedIn] = useState(!!user);

  const setUserSafe = useCallback((u) => {
    setUser(u);
    if (u) {
      sessionStorage.setItem("app_user", JSON.stringify(u)); // visible, pero mejor que cookies expuestas
      setLoggedIn(true);
    } else {
      sessionStorage.removeItem("app_user");
      setLoggedIn(false);
    }
  }, []);

  const logIn = useCallback(async ({ username, password }) => {
    // Llama a tu endpoint existente de login SIN guardar nada sensible en cookies.
    // Si ya usas axios/api, déjalo igual; solo no escribas cookies de PII.
    // Suponemos que el backend responde con datos básicos del usuario.
    // Si no devuelve nada, crea un objeto mínimo local.
    const u = { username }; // <- ajusta según tu respuesta real
    setUserSafe(u);
    return u;
  }, [setUserSafe]);

  const logOut = useCallback(async () => {
    setUserSafe(null);
  }, [setUserSafe]);

  useEffect(() => {
    // Si algún día agregas un "ping" al backend, podrías validar aquí.
  }, []);

  return (
    <UserContext.Provider value={{ user, loggedIn, logIn, logOut }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = { children: PropTypes.node.isRequired };
export const useUser = () => useContext(UserContext);

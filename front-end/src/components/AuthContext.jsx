// Authentication
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { createContext, useState, useEffect } from "react";
import api from "../api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const location = useLocation();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      if(location.pathname === "/login" || location.pathname === "register") {
        return;
      }

      api.get('/api/me')
        .then( function (res) {
          if(res.status) {
            setUser(res.data.user)
          } else {
            setUser(null);
            navigate("/login", { replace: true });
          }
        })
        .catch(() => {
          setUser(null);
          navigate("/login", { replace: true });
        });
    }, [location]);
    
    return (
      <AuthContext.Provider value={{ user, setUser }}>
        {children}
      </AuthContext.Provider>
    )
}
// Authentication
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { createContext, useState, useEffect } from "react";
import api from "../api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
      api.get('/api/me')
        .then( function (res) {
          if(res.data.user) {
            setUser(res.data.user)
          }
        })
        .catch(() => {
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    }, [location]);

    useEffect(() => {
      if(loading) {
        return
      }
      else if(user && (location.pathname === "/" || location.pathname === "/register")) {
        navigate("/dashboard", { replace: true });
      } else if(!user && (location.pathname === "/" || location.pathname === "/register")) {
        return
      } else if(!user) {
        navigate("/", { replace: true });
      }
    }, [user, loading])

    if(loading) {
      return null
    }
    
    return (
      <AuthContext.Provider value={{ user, setUser }}>
        {children}
      </AuthContext.Provider>
    )
}
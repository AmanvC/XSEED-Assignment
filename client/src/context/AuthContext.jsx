import { createContext, useEffect, useState } from "react";
import jwt from "jwt-decode";
import { makeRequest } from "../utils/axios";
import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
  setItemInLocalStorage,
} from "../utils";
import { LOCALSTORAGE_TOKEN_KEY } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    if (userToken) {
      let user = jwt(userToken);
      setCurrentUser(user);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await makeRequest().post("/users/create-session", {
        email,
        password,
      });
      setItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY, res.data.token);
      setCurrentUser(jwt(res.data.token));
      navigate("/");
      toast.success("Logged in successfully.");
      return true;
    } catch (err) {
      toast.error(err.response.data.message || "Internal server error!");
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    toast.success("You have been logged out.");
    removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

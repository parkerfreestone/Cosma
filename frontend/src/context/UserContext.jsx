import { useEffect, useState, createContext } from "react";
import { useContext } from "react";

const AuthContext = createContext({
  signedIn: false,
  setSignedIn: () => null,
  sessionOver: new Date(),
  setSessionOver: () => null,
  userId: null,
  setUserId: () => null,
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [signedIn, setSignedIn] = useState(false);
  const [sessionOver, setSessionOver] = useState(new Date());
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (userId) {
      localStorage.setItem("userId", userId.toString());
    }
  }, [userId]);

  useEffect(() => {
    let expiry = localStorage.getItem("expiry");

    if (expiry) {
      expiry = new Date(expiry);
      if (Date.now() < expiry.getTime()) {
        setSignedIn(true);
        setSessionOver(expiry);

        ((id) => {
          if (id) {
            setUserId(id);
          }
        })(localStorage.getItem("userId"));
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("expiry", sessionOver.toISOString());
    setTimeout(() => {
      setSessionOver((sessionOver) => {
        if (Date.now() >= sessionOver.getTime()) {
          setSignedIn((signedIn) => {
            if (signedIn) {
              alert(
                "Session expired. Any further privileged requests will fail until signed in again."
              );
            }
            return signedIn;
          });
        }
        return sessionOver;
      });
    }, sessionOver.getTime() - Date.now());
  }, [sessionOver]);

  return (
    <AuthContext.Provider
      value={{
        signedIn,
        setSignedIn,
        sessionOver,
        setSessionOver,
        userId,
        setUserId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

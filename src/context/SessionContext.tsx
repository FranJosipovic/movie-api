import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { createNewSession } from "../apis/user";

type Session = {
  sessionId: string;
  sesionExpiresAt: Date;
};

type SessionContext = {
  session?: Session;
  handleCreateNewSession: () => void;
};

type SessionProviderProps = {
  children: ReactNode;
};

const SessionContext = createContext({} as SessionContext);

export function useSession() {
  return useContext(SessionContext);
}

export function SessionProvider({ children }: SessionProviderProps) {
  const [session, setSession] = useState(
    JSON.parse(localStorage.getItem("session") || "null")
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (session === null) {
      return navigate("/create-new-session");
    } else if (
      new Date(session.sesionExpiresAt).getTime() < new Date().getTime()
    ) {
      localStorage.removeItem("session");
      setSession(null);
      return navigate("/create-new-session");
    } else {
      navigate("");
      setSessionTimeout();
    }

    return () => clearTimeout(setSessionTimeout());
  }, [session]);

  function handleCreateNewSession() {
    createNewSession().then((data) => {
      if (data.success) {
        localStorage.setItem(
          "session",
          JSON.stringify({
            sessionId: data.guest_session_id,
            sessionExpiresAt: data.expires_at,
          })
        );
        setSession({
          sessionId: data.guest_session_id,
          sessionExpiresAt: data.expires_at,
        });
      }
    });
  }

  function setSessionTimeout() {
    let date = new Date().getTime();
    let expireTime = new Date(session.sessionExpiresAt).getTime() - date;
    return setTimeout(() => {
      localStorage.removeItem("session");
      setSession(null);
    }, expireTime);
  }

  return (
    <SessionContext.Provider
      value={{
        session,
        handleCreateNewSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

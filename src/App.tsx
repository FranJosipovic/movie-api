import { useEffect } from "react";
import { createNewSession } from "./apis/user";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";

function App() {
  useEffect(() => {
    const session = localStorage.getItem("session");
    if (!session) {
      createNewSession().then((data) => {
        if (data.success) {
          console.log(data);
          localStorage.setItem(
            "session",
            JSON.stringify({
              sessionId: data.guest_session_id,
              sesionExpiresAt: data.expires_at,
            })
          );
        }
      });
    }
  }, []);

  return (
    <Routes>
      <Route path="" element={<HomePage />} />
    </Routes>
  );
}

export default App;

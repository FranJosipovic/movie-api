import { useEffect } from "react";
import { createNewSession } from "./apis/user";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Movie from "./pages/Movie";
import { MovieProvider } from "./context/MovieContext";

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
    <MovieProvider>
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="/movie/:id" element={<Movie />} />
      </Routes>
    </MovieProvider>
  );
}

export default App;

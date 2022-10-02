import { useEffect } from "react";
import { createNewSession } from "./apis/user";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Movie from "./pages/Movie";
import { MovieProvider } from "./context/MovieContext";
import { useSession } from "./context/SessionContext";
import NewSessionPage from "./pages/NewSessionPage";

function App() {
  return (
    <MovieProvider>
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="/create-new-session" element={<NewSessionPage />} />
        <Route path="/movie/:id" element={<Movie />} />
      </Routes>
    </MovieProvider>
  );
}

export default App;

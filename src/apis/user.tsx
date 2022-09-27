const apiKey = process.env.REACT_APP_API_KEY;

export const createNewSession = () => {
  return fetch(
    `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${apiKey}`,
    {
      method: "GET",
    }
  ).then((res) => res.json());
};

export const getRatedMovies = (sessionId: string) => {
  return fetch(
    `https://api.themoviedb.org/3/guest_session/${sessionId}/rated/movies?api_key=${apiKey}&language=en-US&sort_by=created_at.asc`,
    {
      method: "GET",
    }
  ).then((res) => res.json());
};

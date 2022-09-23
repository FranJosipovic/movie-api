const apiKey = process.env.REACT_APP_API_KEY;

export const createNewSession = () => {
  return fetch(
    `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${apiKey}`,
    {
      method: "GET",
    }
  ).then((res) => res.json());
};

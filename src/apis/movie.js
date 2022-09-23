const apiKey = process.env.REACT_APP_API_KEY;

export const getData = () => {
  return fetch(
    `https://api.themoviedb.org/3/configuration?api_key=f7622ff39a4206d941a6a4e87268320d`,
    {
      method: "GET",
    }
  ).then((res) => res.json());
};

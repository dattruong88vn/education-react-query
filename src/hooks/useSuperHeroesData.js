import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

export const useSuperHeroesData = ({ onSuccess, onError, options = {} }) => {
  return useQuery("super-heroes", fetchSuperHeroes, {
    ...options,
    onSuccess,
    onError,
    // select: (data) => {
    //   return data.data.map((hero) => hero.name);
    // },
  });
};

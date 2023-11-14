import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

// #1
const fetchSuperHero = (id) => {
  return axios.get(`http://localhost:4000/superheroes/${id}`);
};
// #2
const fetchSuperHero2 = ({ queryKey }) => {
  const id = queryKey[1];
  return axios.get(`http://localhost:4000/superheroes/${id}`);
};

export const useSuperHeroData = (heroId) => {
  const queryClient = useQueryClient();

  // #1: use arrow function to pass agrument
  // return useQuery(["super-hero", heroId], () => fetchSuperHero(heroId));

  // #2: use function and destructure params
  return useQuery(["super-hero", heroId], fetchSuperHero2, {
    initialData: () => {
      const hero = queryClient
        .getQueryData("super-heroes")
        ?.data?.find((hero) => hero.id === Number(heroId));

      if (hero) {
        return {
          data: hero,
        };
      } else {
        return undefined;
      }
    },
  });
};

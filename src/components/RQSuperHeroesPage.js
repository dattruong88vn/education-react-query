import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

export const RQSuperHeroesPage = () => {
  const { isLoading, data, ...rest } = useQuery("super-hero", fetchSuperHeroes);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(rest);

  return (
    <div>
      <h2>RQSuperHeroesPage</h2>
      <div>
        {data?.data.map((item) => {
          return <div key={item.id}>{item.name}</div>;
        })}
      </div>
    </div>
  );
};

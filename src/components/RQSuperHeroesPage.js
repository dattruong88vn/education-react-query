import { useQuery } from "react-query";
import axios from "axios";
import { useState } from "react";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

export const RQSuperHeroesPage = () => {
  const { isLoading, data, isError, error, refetch } = useQuery(
    "super-hero",
    fetchSuperHeroes,
    {
      select: (data) => {
        return data.data.map((hero) => hero.name);
      },
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div>
      <h2>RQSuperHeroesPage</h2>
      <button onClick={refetch}>Fetch</button>
      <div>
        {data.map((item) => {
          return <div key={item}>{item}</div>;
        })}
      </div>
    </div>
  );
};

import axios from "axios";
import React from "react";
import { useQueries } from "react-query";

const fetchSuperHeroes = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const DynamicParallelQuery = ({ heroIds }) => {
  const queryResult = useQueries(
    heroIds.map((id) => {
      return {
        queryKey: ["super-hero", id],
        queryFn: () => fetchSuperHeroes(id),
      };
    })
  );
  // console.log({ queryResult });
  return <div>DynamicParallelQuery</div>;
};

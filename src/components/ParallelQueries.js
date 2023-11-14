import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};
const fetchFriends = () => {
  return axios.get("http://localhost:4000/friends");
};

export const ParallelQueries = () => {
  const { data: superHeroes } = useQuery("super-heroes", fetchSuperHeroes);
  const { data: friends } = useQuery("friend", fetchFriends);
  return <div>ParallelQueries</div>;
};

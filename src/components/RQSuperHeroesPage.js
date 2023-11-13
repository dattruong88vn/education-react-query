import { useQuery } from "react-query";
import axios from "axios";
import { useState } from "react";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

export const RQSuperHeroesPage = () => {
  const [refetchInterval, setRefetchInterval] = useState(3000);

  const onSuccess = (data) => {
    if (data.data.length === 4) {
      setRefetchInterval(false);
    }
  };

  const onError = (error) => {
    setRefetchInterval(false);
  };

  const { isLoading, data, isError, error, refetch } = useQuery(
    "super-hero",
    fetchSuperHeroes,
    {
      refetchInterval,
      onSuccess,
      onError,
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
        {data?.data.map((item) => {
          return <div key={item.id}>{item.name}</div>;
        })}
      </div>
    </div>
  );
};

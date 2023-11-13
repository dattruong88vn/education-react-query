import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

export const RQSuperHeroesPage = () => {
  const onSuccess = (data) => {
    console.log(data);
    console.log("Success");
  };

  const onError = (error) => {
    console.log(error);
    console.log("Error");
  };

  const { isLoading, data, isError, error, refetch } = useQuery(
    "super-hero",
    fetchSuperHeroes,
    {
      enabled: false,
      staleTime: 30000,
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

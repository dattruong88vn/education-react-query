import { Link } from "react-router-dom";
import { useSuperHeroesData } from "../hooks/useSuperHeroesData";

export const RQSuperHeroesPage = () => {
  const onSuccess = () => {
    console.log("Success");
  };
  const onError = () => {
    console.log("Error");
  };

  const { isLoading, data, isError, error, refetch } = useSuperHeroesData(
    onSuccess,
    onError,
    { enables: false }
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
        {data?.data?.map((item) => {
          return (
            <div key={item.id}>
              <Link to={`/rq-super-hero/${item.id}`}>{item.name}</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

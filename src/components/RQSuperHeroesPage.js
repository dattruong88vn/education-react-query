/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  useAddSuperHeroData,
  useSuperHeroesData,
} from "../hooks/useSuperHeroesData";

export const RQSuperHeroesPage = () => {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");

  const onSuccess = () => {
    // console.log("Success");
  };
  const onError = () => {
    // console.log("Error");
  };

  const { isLoading, data, isError, error, refetch } = useSuperHeroesData(
    onSuccess,
    onError
  );

  const { mutate: addHero, isSuccess } = useAddSuperHeroData();

  useEffect(() => {
    setName("");
    setAlterEgo("");
    refetch();
  }, [isSuccess]);

  const handleSubmit = () => {
    addHero({ name, alterEgo });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div>
      <h2>RQSuperHeroesPage</h2>
      <div>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <input value={alterEgo} onChange={(e) => setAlterEgo(e.target.value)} />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <br />
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

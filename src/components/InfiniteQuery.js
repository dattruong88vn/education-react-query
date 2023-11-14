import React from "react";
import axios from "axios";
import { useInfiniteQuery } from "react-query";

const fetchColors = ({ pageParam = 1 }) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
};

export const InfiniteQuery = () => {
  const { data, isLoading, isError, error, hasNextPage, fetchNextPage } =
    useInfiniteQuery(["colors", "infinite"], fetchColors, {
      getNextPageParam: (_lastPage, pages) => {
        console.log(_lastPage);
        if (pages.length < 5) {
          return pages.length + 1;
        } else {
          return undefined;
        }
      },
    });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  console.log(data);

  return (
    <div>
      InfiniteQuery
      <div>
        {data?.pages?.map((group, index) => {
          return (
            <div key={index}>
              {group.data.map((color) => {
                return <h2>{color.label}</h2>;
              })}
            </div>
          );
        })}
      </div>
      <div>
        <button onClick={fetchNextPage} disabled={!hasNextPage}>
          Loadmore...
        </button>
      </div>
    </div>
  );
};

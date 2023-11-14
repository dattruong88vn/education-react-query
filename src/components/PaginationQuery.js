import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";

const fetchColors = (page) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${page}`);
};

export const PaginationQuery = () => {
  const [pageNum, setPageNum] = useState(1);

  const { data, isLoading, isError, error } = useQuery(
    ["colors", pageNum],
    () => fetchColors(pageNum),
    { keepPreviousData: true }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div>
      PaginationQuery
      <div>
        {data?.data?.map((item) => {
          return (
            <div key={item.id}>
              <h2>{item.label}</h2>
            </div>
          );
        })}
      </div>
      <div>
        <button
          onClick={() => setPageNum((prev) => prev - 1)}
          disabled={pageNum === 1}
        >
          Prev
        </button>
        <button
          onClick={() => setPageNum((prev) => prev + 1)}
          disabled={pageNum === 5}
        >
          Next
        </button>
      </div>
    </div>
  );
};

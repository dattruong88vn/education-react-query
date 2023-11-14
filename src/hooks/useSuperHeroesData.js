import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const addSuperHero = (hero) => {
  return axios.post("http://localhost:4000/superheroes", hero);
};

export const useSuperHeroesData = ({ onSuccess, onError, options = {} }) => {
  return useQuery("super-heroes", fetchSuperHeroes, {
    ...options,
    onSuccess,
    onError,
    // select: (data) => {
    //   return data.data.map((hero) => hero.name);
    // },
  });
};

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    // onSuccess: (data) => {
    //   // cách 1: refetch api get list super-hero after create new one
    //   // queryClient.invalidateQueries("super-heroes");
    //   // cách 2: sử dụng response sau khi mutate thành công và thêm vào cache data của list super hero
    //   queryClient.setQueriesData("super-heroes", (oldQueryData) => {
    //     return {
    //       ...oldQueryData,
    //       data: [...oldQueryData.data, data.data],
    //     };
    //   });
    // },
    // cách 3: update data ở client trước khi mutate
    /**
     * onMutate --> call trước khi mutate api
     * Tham số là data được gửi lên mutate
     * Trả về previousData
     */
    onMutate: (newHero) => {
      const previousData = queryClient.getQueriesData("super-heroes");
      queryClient.setQueriesData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.length + 1, ...newHero },
          ],
        };
      });

      return {
        ...previousData,
      };
    },
    /**
     * onError --> call sau mutate api lỗi
     */
    onError: (_error, _hero, context) => {
      queryClient.setQueriesData("super-heroes", context.previousData);
    },
    /**
     * onSettled --> call sau mutate api hoàn thành (thành công hoặc lỗi)
     */
    onSettled: () => {
      queryClient.invalidateQueries("super-heroes");
    },
  });
};

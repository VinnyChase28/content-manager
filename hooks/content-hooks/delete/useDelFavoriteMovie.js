import { useMutation, useQueryClient } from "react-query";
import { supabase } from "../../../client";

const delFavMovie = async (movie, user_id) => {
  const { data, error } = await supabase
    .from("favorite_movies")
    .delete()
    .match({ movie_id: movie.movie_id, user_id: user_id });

  if (error) {
    throw error;
  }
  return data;
};

export default function delFavoriteMovie(movie) {
  const queryClient = useQueryClient();
  const user = supabase?.auth.user();
  return useMutation(() => delFavMovie(movie, user?.id), {
    onSuccess: () => {
      queryClient.refetchQueries("favorite_movies");
    },
  });
}

import { useMutation, useQueryClient } from "react-query";
import { supabase } from "../../client";

const delWatchMovie = async (movie, user_id) => {
  const { data, error } = await supabase
    .from("watchlist_movies")
    .delete()
    .match({ movie_id: movie.movie_id, user_id: user_id });

  if (error) {
    throw error;
  }
  return data;
};

export default function delWatchlistMovie(movie) {
  const queryClient = useQueryClient();
  const user = supabase?.auth.user();
  return useMutation(() => delWatchMovie(movie, user?.id), {
    onSuccess: () => {
      queryClient.refetchQueries("watchlist_movies");
    },
  });
}

import { useMutation, useQueryClient } from "react-query";
import { supabase } from "../../../client";

const delWatchMovie = async (movie, user_id) => {
  const { data, error } = await supabase
    .from("watchlist_shows")
    .delete()
    .match({ show_id: movie.show_id, user_id: user_id });

  if (error) {
    throw error;
  }
  return data;
};

export default function delWatchlistMovie(show) {
  const queryClient = useQueryClient();
  const user = supabase?.auth.user();
  return useMutation(() => delWatchMovie(show, user?.id), {
    onSuccess: () => {
      queryClient.refetchQueries("watchlist_shows");
    },
  });
}

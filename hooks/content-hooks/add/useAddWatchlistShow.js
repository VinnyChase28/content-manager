import { useMutation, useQueryClient } from "react-query";
import { supabase } from "../../../client";

const addWatchShow = async (show, user_id) => {
  const { data, error } = await supabase.from("watchlist_shows").upsert({
    show_id: show.show_id,
    original_name: show.original_name,
    overview: show.overview,
    poster_path: show.poster_path,
    popularity: show.popularity,
    first_air_date: show.first_air_date,
    vote_average: show.vote_average,
    vote_count: show.vote_count,
    genre_ids: show.genre_ids,
    user_id,
  });

  if (error) {
    throw error;
  }
  return data;
};

export default function addWatchlistShow(show) {
  const queryClient = useQueryClient();
  const user = supabase?.auth.user();
  return useMutation(() => addWatchShow(show, user?.id), {
    onSuccess: () => {
      queryClient.refetchQueries("watchlist_shows");
    },
  });
}

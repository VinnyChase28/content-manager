import { useMutation, useQueryClient } from "react-query";
import { supabase } from "../../client";

const addWatchMovie = async (movie, user_id) => {
  const { data, error } = await supabase.from("watchlist_movies").upsert({
    movie_id: movie.movie_id,
    original_title: movie.original_title,
    overview: movie.overview,
    poster_path: movie.poster_path,
    popularity: movie.popularity,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
    vote_count: movie.vote_count,
    genre_ids: movie.genre_ids,
    user_id,
  });

  if (error) {
    throw error;
  }
  return data;
};

export default function addWatchlistMovie(movie) {
  const queryClient = useQueryClient();
  const user = supabase?.auth.user();
  return useMutation(() => addWatchMovie(movie, user?.id), {
    onSuccess: () => {
      queryClient.refetchQueries("watchlist_movies");
    },
  });
}

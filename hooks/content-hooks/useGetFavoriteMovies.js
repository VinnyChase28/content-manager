import { useQuery } from "react-query";
import { supabase } from "../../client";

const fetchFavoriteMovies = async (user_id) => {
  const { data: favMovieData, error } = await supabase
    .from("favorite_movies")
    .select()
    .eq("user_id", user_id);

  if (error) {
    throw new Error(error.message);
  }

  return favMovieData;
};

export default function useGetFavoriteMovies() {
  const user = supabase.auth.user();
  return useQuery("favorite_movies", () => fetchFavoriteMovies(user?.id));
}

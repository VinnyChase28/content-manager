import { useQuery } from "react-query";
import { supabase } from "../../client";

const fetchFavoriteMovies = async (user_id) => {
  const { data, error } = await supabase
    .from("favorite_movies")
    .select()
    .eq("user_id", user_id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export default function getFavoriteMovies() {
  const user = supabase.auth.user();
  return useQuery("favorite_movies", () => fetchFavoriteMovies(user?.id));
}

import { useQuery } from "react-query";
import { supabase } from "../../client";

const fetchFavoriteShows = async (user_id) => {
  const { data, error } = await supabase
    .from("favorite_shows")
    .select()
    .eq("user_id", user_id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export default function getFavoriteShows() {
  const user = supabase.auth.user();
  return useQuery("favorite_shows", () => fetchFavoriteShows(user?.id));
}

import { useMutation, useQueryClient } from "react-query";
import { supabase } from "../../client";

const delFavShow = async (show, user_id) => {
  const { data, error } = await supabase
    .from("favorite_shows")
    .delete()
    .match({ show_id: show.show_id, user_id: user_id });

  if (error) {
    throw error;
  }
  return data;
};

export default function delFavoriteShow(show) {
  const queryClient = useQueryClient();
  const user = supabase?.auth.user();
  return useMutation(() => delFavShow(show, user?.id), {
    onSuccess: () => {
      queryClient.refetchQueries("favorite_shows");
    },
  });
}

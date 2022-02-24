import { useMutation, useQueryClient } from "react-query";
import { supabase } from "../../../client";

const delWatchGame = async (game, user_id) => {
  const { data, error } = await supabase
    .from("watchlist_games")
    .delete()
    .match({ game_id: game.game_id, user_id: user_id });

  if (error) {
    throw error;
  }
  return data;
};

export default function delWatchlistGame(game) {
  const queryClient = useQueryClient();
  const user = supabase?.auth.user();
  return useMutation(() => delWatchGame(game, user?.id), {
    onSuccess: () => {
      queryClient.refetchQueries("watchlist_games");
    },
  });
}

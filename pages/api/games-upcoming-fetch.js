export default async function handler(req, res) {
  var myHeaders = new Headers();
  myHeaders.append("Client-ID", "yhug9qamfl9kkha9zakglsbrgbb5dk");
  myHeaders.append("Authorization", "Bearer 7anr9v4n8nqac41mqgisd7r4trrjgx");
  myHeaders.append("Content-Type", "text/plain");

  let unixNow = Math.round(Date.now() / 1000);

  var raw =
    "fields name, first_release_date, cover.image_id, summary, storyline, total_rating, hypes; where first_release_date > " +
    unixNow +
    " & hypes > 10 & id != 13166 & id != 121128 & id != 22439 & id != 119402 & id != 12503;sort total_rating desc; limit 20;";

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const data = await fetch("https://api.igdb.com/v4/games", requestOptions)
    .then((response) => response.text())
    // .then((result) => console.log(result))
    .catch((error) => console.log("error", error));

  res.status(200).json(data);
}

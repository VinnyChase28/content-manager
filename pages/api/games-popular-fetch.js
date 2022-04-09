export default async function handler(req, res) {
  var myHeaders = new Headers();
  myHeaders.append("Client-ID", "yhug9qamfl9kkha9zakglsbrgbb5dk");
  myHeaders.append("Authorization", "Bearer x485l0ag4rcg4a135wg4znpz0m72l4");
  myHeaders.append("Content-Type", "text/plain");

  var raw =
    "fields name, first_release_date, cover.image_id, summary, storyline, total_rating; \nwhere total_rating >= 90 & total_rating_count >= 50 & first_release_date > 1265588643 & id != 13166 & id != 121128 & id != 22439 & id != 119402 & id != 12503;\nsort total_rating desc;\nlimit 20;\n";

  var requestOptions = {
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

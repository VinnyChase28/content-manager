// src/components/SearchList.js

import React from "react";
import Card from "../Card/Card";

function SearchList({ filteredMovies }) {
  const filtered = filteredMovies.map((item) => (
    <Card key={item.id} item={item} />
  ));
  return <div>{filtered}</div>;
}

export default SearchList;

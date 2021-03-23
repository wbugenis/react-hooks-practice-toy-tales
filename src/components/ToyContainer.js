import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({toys, likeToy, donateToy}) {
  const toyCards = toys.map(toy => <ToyCard toy={toy} key={toy.id} likeToy={likeToy} donateToy={donateToy}/>)
  return (
    <div id="toy-collection">{toyCards}</div>
  );
}

export default ToyContainer;

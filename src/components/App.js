import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const API = "http://localhost:3001/toys"
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([])

  useEffect( () => {
    fetch(API)
      .then(r => r.json())
      .then(toys => setToys(toys))
  }, [])

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  const addToy = (newToySubmission) => {
    fetch(API, {
      method:'POST', 
      headers: {
        'Content-Type':'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(newToySubmission)
    })
      .then(r => r.json())
      .then(newToy => setToys((toys => [...toys, newToy])))
  }

  const likeToy = (likedToy) =>{
    fetch(`${API}/${likedToy.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type':'application/json',
        Accept:'application/json'
      },
      body: JSON.stringify({likes:(likedToy.likes+1)})
    })
      .then(r => r.json())
      .then(likedToy =>{
        const updatedToys = toys.map( toy => {
          if(toy.id === likedToy.id){
            toy.likes += 1
          }
          return toy
        })
        setToys(updatedToys)
      })
  }

  const donateToy = (donatedToy) =>{
    fetch(`${API}/${donatedToy.id}`, {
      method: 'DELETE'
    })
      .then(() => {
        const updatedToys = toys.filter(toy => toy.id !== donatedToy.id)
        setToys(updatedToys)
      })
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm addToy={addToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} likeToy={likeToy} donateToy={donateToy}/>
    </>
  );
}

export default App;

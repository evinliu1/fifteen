import logo from './logo.svg';
import './App.css';
// import useState Hook -- lets us keep local state function component
import React, { useState, useEffect } from 'react'

// function Reviews() {
//   const [ratings, setRatings] = useState(Array(9).fill(null));
// }

// newSquares[i] = newSquares[i] === null ? currPlayer : newSquares[i];
// const newWinner = computeWinner(newSquares);
// setWinner(newWinner);
// setSquares(newSquares);
function App() {
  const [ratings, setRatings] = useState([]);
  //function used to retrieve data from python file

  function getJSON() {
    fetch('/rate')
      .then(response => response.json())
      .then(data => setRatings(ratings));
    // this.setline("Button clicked");
    console.log(data);
  }
  function handleClick() {
    if (ratings !== null) {
      return ratings;
    }
  }
  useEffect(() => { getJSON() }, [])
}


// userEffect tells react to do 'something' after every render
useEffect(() => {
  // displays after every render
  document.title = `Here is your new input ${ratings}`
})
  ;
// comment_list = Map(comment, input);
// declare new state variable
// calling it input because it holds userInput (comments/ratings)
// setInput allows us to update the input

setInput(ratings);
Map(ratings => {
  return (
    // when user clicks call setinput with a new value
    // react re-renders comment component pasing new input to it
    <div>
      <p>Here is your new input {ratings}</p>
      {/* <button onClick={handleClick => setRatings(ratings)}>
        Update
      </button> */}

      <button onClick={handleClick}>Delete Review</button>
      <p>{ratings}</p>
    </div>

  )
}


);
export default App;


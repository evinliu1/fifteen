/*eslint no-undef: 0, no-unused-expressions: 0*/
import logo from './logo.svg';
import './App.css';
// import useState Hook -- lets us keep local state function component
import React, { useState, useEffect } from 'react'
import Review from './reviews.js'
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
      .then(data => {
        console.log(data)
        setRatings(data)
      });
    // this.setline("Button clicked");

  }
  function saveChanges() {
    fetch('/save'),
      {
        method: 'POST',
        body: JSON.stringify(ratings),
      }
        .then(response => response.json())
        .then(data => { console.log('Success', data) })
        .catch((error) => console.log('Error:', error))
  }
  // userEffect tells react to do 'something' after every render
  useEffect(() => { getJSON() }, [])
  return (
    // using map func to loop through each 'rating' and assigns delete button from delete function in reviews.js
    <div>
      {
        ratings.map(
          // anonymous function
          function (rating) {
            return <Review review={rating} />
          }
        )
      }
    </div>
  );
}
export default App;


/* eslint no-undef: 0, no-unused-expressions: 0*/

function Review({ review, setRatings, ratings }) {
    // generated when user presses button--tells server to do something and request is handles in routes.py
    function handleClick(comment_id) {
        fetch('/rate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // creates object comment id
            body: JSON.stringify({ comment_id })

        }).then(response => response.text()).then(data => {
            alert()
            setRatings(ratings.filter(rating => rating.id !== comment_id))
        })
    }


    return (
        <div>
            <p>Reiview: {review.comment}</p>  <p>Rating: {review.rating}</p>

            {/* <button onClick={handleClick => setRatings(ratings)}>
      Update
    </button> */}

            {/* // when user clicks call setinput with a new value
// react re-renders comment component pasing new input to it
    */}
            <button onClick={() => { handleClick(review.id) }}>Delete Review</button>
            {/* <p>{review.comment}</p> */}
        </div>
    )
}


export default Review;
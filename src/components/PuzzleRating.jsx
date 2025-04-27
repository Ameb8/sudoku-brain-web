import PropTypes from "prop-types";
import ReactStars from 'react-rating-stars-component';

const PuzzleRating = ({ rating, numRates }) => {
    if(rating < 0)
        rating = 0;

    return (
        <div style={{ display: 'inline-block', textAlign: 'center' }}>
            <ReactStars
                count={5} // Total number of stars
                value={rating} // The rating value passed as prop
                size={30} // Size of the stars (in pixels)
                isHalf={true} // Allows half stars
                edit={false} // Makes the stars read-only
                activeColor="gold" // Color for filled stars
                color="lightgray" // Color for unfilled stars
            />
            <div style={{ fontSize: '14px', color: 'gray', marginTop: '5px' }}>
                {numRates} {numRates === 1 ? 'rate' : 'rates'}
            </div>
        </div>
    );
};

PuzzleRating.propTypes = {
    rating: PropTypes.number.isRequired,
    numRates: PropTypes.number.isRequired,
};

export default PuzzleRating;
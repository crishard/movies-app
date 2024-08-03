import StarRatings from 'react-star-ratings';

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  return (
    <StarRatings
      rating={rating / 2}
      starRatedColor="red"
      numberOfStars={5}
      name='rating'
      starDimension="20px"
      starSpacing="4px"
    />
  );
};

export default StarRating;

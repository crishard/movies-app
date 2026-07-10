import StarRatings from 'react-star-ratings';

interface StarRatingProps {
  rating: number;
  showValue?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, showValue = false }) => {
  const safeRating = Math.min(Math.max(rating ?? 0, 0), 10);

  return (
    <span className="inline-flex items-center gap-2">
      <StarRatings
        rating={safeRating / 2}
        starRatedColor="#fbbf24"
        starEmptyColor="#334155"
        numberOfStars={5}
        name="rating"
        starDimension="16px"
        starSpacing="2px"
      />
      {showValue && (
        <span className="text-sm font-semibold text-amber-400">{safeRating.toFixed(1)}</span>
      )}
    </span>
  );
};

export default StarRating;

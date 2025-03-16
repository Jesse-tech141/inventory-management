import { Star } from "lucide-react";
import React from "react";

type RatingProps = {
  rating: number | undefined; // Allow `undefined` as a type
};

const Rating = ({ rating = 0 }: RatingProps) => {
  return [1, 2, 3, 4, 5].map((index) => (
    <Star
      key={index}
      color={index <= rating ? "#FFC107" : "#E4E5E9"}
      className="w-4 h-4"
    />
  ));
};

export default Rating;
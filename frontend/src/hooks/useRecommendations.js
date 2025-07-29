// useRecommendations.js

import { useContext } from 'react';
import { RecommendationsState } from '../contexts/Recommendation';

function useRecommendations() {
  const recommendations = useContext(RecommendationsState);
  return recommendations;
}

export default useRecommendations;

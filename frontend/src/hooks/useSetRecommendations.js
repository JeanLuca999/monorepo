import { useContext } from 'react';
import { SetRecommendations } from '../contexts/Recommendation';

function useSetRecommendations() {
  const setRecommendations = useContext(SetRecommendations);
  return setRecommendations;
}

export default useSetRecommendations;

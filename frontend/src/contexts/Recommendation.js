import { createContext, useCallback, useReducer } from 'react';
import recommendationService from '../services/recommendation.service';

export const RecommendationsState = createContext([]);
export const SetRecommendations = createContext(() => null);

function reducer(state, action) {
  switch (action.type) {
    case 'set_recommendations': {
      return [...action.payload];
    }
    default: {
      return [...state];
    }
  }
}

export function RecommendationsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, []);

  const setRecommendations = useCallback((formData, products) => {
    const newRecommendations = recommendationService.getRecommendations(
      formData,
      products
    );
    dispatch({ type: 'set_recommendations', payload: newRecommendations });
  }, []);

  return (
    <RecommendationsState.Provider value={state}>
      <SetRecommendations.Provider value={setRecommendations}>
        {children}
      </SetRecommendations.Provider>
    </RecommendationsState.Provider>
  );
}

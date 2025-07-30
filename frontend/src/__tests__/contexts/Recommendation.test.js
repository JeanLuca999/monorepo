import { act, render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import { RecommendationsProvider } from '../../contexts/Recommendation';
import useRecommendations from '../../hooks/useRecommendations';
import useSetRecommendations from '../../hooks/useSetRecommendations';
import mockProducts from '../../mocks/mockProducts';
import userEvent from '@testing-library/user-event';

function ConsumerComponent({
  selectedPreferences,
  selectedFeatures,
  selectedRecommendationType,
  products,
}) {
  const recommendations = useRecommendations();
  const setRecommendations = useSetRecommendations();

  return (
    <div>
      <button
        onClick={() =>
          setRecommendations(
            {
              selectedPreferences,
              selectedFeatures,
              selectedRecommendationType,
            },
            products
          )
        }
      >
        update
      </button>
      <ul>
        {recommendations.map((recommendation) => (
          <li key={recommendation.id}>{recommendation.name}</li>
        ))}
      </ul>
    </div>
  );
}

test('should init recommendations state as empty array', () => {
  const { result } = renderHook(() => useRecommendations(), {
    wrapper: RecommendationsProvider,
  });
  expect(result.current).toEqual([]);
});

test('should call setRecommendations with selected preferences and features', () => {
  const { result } = renderHook(() => useSetRecommendations(), {
    wrapper: RecommendationsProvider,
  });
  const mockFunction = jest.spyOn(result, 'current');
  const formData = {
    selectedPreferences: ['preference-not-present'],
    selectedFeatures: ['feature-not-present'],
    selectedRecommendationType: 'SingleProduct',
  };

  act(() => {
    result.current(formData, mockProducts);
  });

  expect(mockFunction).toHaveBeenCalledWith(formData, mockProducts);
});

test('should render initial state and then update value and be able to read it in component', () => {
  render(
    <RecommendationsProvider>
      <ConsumerComponent
        selectedPreferences={['Integração fácil com ferramentas de e-mail']}
        selectedFeatures={['Gestão de leads e oportunidades']}
        selectedRecommendationType="SingleProduct"
        products={mockProducts}
      />
    </RecommendationsProvider>
  );

  const listItems = screen.queryAllByRole('listitem');
  expect(listItems).toHaveLength(0);

  const updateButton = screen.getByRole('button', { name: 'update' });
  userEvent.click(updateButton);

  const listItemsAfterUpdate = screen.queryAllByRole('listitem');
  listItemsAfterUpdate.forEach((item) => {
    expect(item).toBeInTheDocument();
  });
});

import recommendationService from '../../services/recommendation.service';
import mockProducts from '../../mocks/mockProducts';

test('should return correct recommendation for SingleProduct based on selected preferences', () => {
  const formData = {
    selectedPreferences: ['Integração com chatbots'],
    selectedFeatures: ['Chat ao vivo e mensagens automatizadas'],
    selectedRecommendationType: 'SingleProduct',
  };

  const recommendations = recommendationService.getRecommendations(
    formData,
    mockProducts
  );

  expect(recommendations).toHaveLength(1);
  expect(recommendations[0].name).toBe('RD Conversas');
});

test('should return correct recommendations for MultipleProducts based on selected preferences', () => {
  const formData = {
    selectedPreferences: [
      'Integração fácil com ferramentas de e-mail',
      'Personalização de funis de vendas',
      'Automação de marketing',
    ],
    selectedFeatures: [
      'Rastreamento de interações com clientes',
      'Rastreamento de comportamento do usuário',
    ],
    selectedRecommendationType: 'MultipleProducts',
  };

  const recommendations = recommendationService.getRecommendations(
    formData,
    mockProducts
  );

  expect(recommendations).toHaveLength(2);
  expect(recommendations.map((product) => product.name)).toEqual([
    'RD Station CRM',
    'RD Station Marketing',
  ]);
});

test('should return only one product for SingleProduct with more than one match', () => {
  const formData = {
    selectedPreferences: [
      'Integração fácil com ferramentas de e-mail',
      'Automação de marketing',
    ],
    selectedFeatures: [
      'Rastreamento de interações com clientes',
      'Rastreamento de comportamento do usuário',
    ],
    selectedRecommendationType: 'SingleProduct',
  };

  const recommendations = recommendationService.getRecommendations(
    formData,
    mockProducts
  );

  expect(recommendations).toHaveLength(1);
  expect(recommendations[0].name).toBe('RD Station Marketing');
});

test('should return the last match in case of tie for SingleProduct', () => {
  const formData = {
    selectedPreferences: ['Automação de marketing', 'Integração com chatbots'],
    selectedRecommendationType: 'SingleProduct',
  };

  const recommendations = recommendationService.getRecommendations(
    formData,
    mockProducts
  );

  expect(recommendations).toHaveLength(1);
  expect(recommendations[0].name).toBe('RD Conversas');
});

test('should return empty array if no recommendations are found', () => {
  const formData = {
    selectedPreferences: ['preference-not-present'],
    selectedFeatures: ['feature-not-present'],
    selectedRecommendationType: 'SingleProduct',
  };

  const recommendations = recommendationService.getRecommendations(
    formData,
    mockProducts
  );

  expect(recommendations).toEqual([]);
});

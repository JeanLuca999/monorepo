import { renderHook, waitFor } from '@testing-library/react';
import useProducts from '../../hooks/useProducts';
import getProducts from '../../services/product.service';
import mockProducts from '../../mocks/mockProducts';

jest.mock('../../services/product.service', () => ({
  __esModule: true,
  default: jest.fn(),
}));

test('should fetch products and extract preferences and features', async () => {
  getProducts.mockResolvedValue(mockProducts);

  const { result } = renderHook(() => useProducts());

  expect(result.current.preferences).toEqual([]);
  expect(result.current.features).toEqual([]);
  expect(result.current.products).toEqual([]);

  await waitFor(() => {
    expect(result.current.products).toHaveLength(mockProducts.length);
  });

  expect(result.current.preferences).toHaveLength(mockProducts.length * 2); // n products * 2 preferences each
  expect(result.current.features).toHaveLength(mockProducts.length * 2); // n products * 2 features each

  expect(getProducts).toHaveBeenCalledTimes(1);
});

test('should handle API errors gracefully', async () => {
  const consoleErrorSpy = jest
    .spyOn(console, 'error')
    .mockImplementation(() => {});

  getProducts.mockRejectedValue(new Error('API Error'));

  const { result } = renderHook(() => useProducts());

  expect(result.current.preferences).toEqual([]);
  expect(result.current.features).toEqual([]);
  expect(result.current.products).toEqual([]);

  await waitFor(() => {
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Erro ao obter os produtos:',
      expect.any(Error)
    );
  });

  expect(result.current.preferences).toEqual([]);
  expect(result.current.features).toEqual([]);
  expect(result.current.products).toEqual([]);

  consoleErrorSpy.mockRestore();
});

test('should limit preferences and features to 2 per product', async () => {
  const limitFeatures = 2;
  const limitPreferences = 2;

  const productsWithManyOptions = [
    {
      id: 1,
      name: 'Product 1',
      preferences: ['Pref1', 'Pref2', 'Pref3', 'Pref4', 'Pref5'],
      features: ['Feat1', 'Feat2', 'Feat3', 'Feat4', 'Feat5'],
    },
  ];

  getProducts.mockResolvedValue(productsWithManyOptions);

  const { result } = renderHook(() => useProducts());

  await waitFor(() => {
    expect(result.current.products).toHaveLength(
      productsWithManyOptions.length
    );
  });

  expect(result.current.preferences).toHaveLength(limitPreferences);
  expect(result.current.features).toHaveLength(limitFeatures);
});

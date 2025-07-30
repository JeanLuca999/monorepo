import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from '../../components/Form/Form';
import useProducts from '../../hooks/useProducts';
import useForm from '../../hooks/useForm';
import useSetRecommendations from '../../hooks/useSetRecommendations';
import mockPreferences from '../../mocks/mockPreferences';
import mockFeatures from '../../mocks/mockFeatures';
import mockProducts from '../../mocks/mockProducts';

jest.mock('axios', () => ({
  get: jest.fn(),
}));

jest.mock('../../hooks/useProducts');
jest.mock('../../hooks/useForm');
jest.mock('../../hooks/useSetRecommendations');

const mockFormData = {
  selectedPreferences: [],
  selectedFeatures: [],
  selectedRecommendationType: '',
};

const mockHandleChange = jest.fn();
const mockSetRecommendations = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();

  useProducts.mockReturnValue({
    preferences: mockPreferences,
    features: mockFeatures,
    products: mockProducts,
  });

  useForm.mockReturnValue({
    formData: mockFormData,
    handleChange: mockHandleChange,
  });

  useSetRecommendations.mockReturnValue(mockSetRecommendations);
});

test('should render form with all sections', () => {
  render(<Form />);

  expect(screen.getByText('Preferências:')).toBeInTheDocument();
  expect(screen.getByText('Funcionalidades:')).toBeInTheDocument();
  expect(screen.getByText('Tipo de Recomendação:')).toBeInTheDocument();
  expect(screen.getByText('Obter recomendação')).toBeInTheDocument();
});

test('should call handleChange when preference is selected', () => {
  render(<Form />);

  const firstCheckbox = screen.getByRole('checkbox', {
    name: mockPreferences[0],
  });
  userEvent.click(firstCheckbox);

  expect(mockHandleChange).toHaveBeenCalledWith('selectedPreferences', [
    mockPreferences[0],
  ]);
});

test('should call handleChange when feature is selected', () => {
  render(<Form />);

  const firstCheckbox = screen.getByRole('checkbox', {
    name: mockFeatures[0],
  });
  userEvent.click(firstCheckbox);

  expect(mockHandleChange).toHaveBeenCalledWith('selectedFeatures', [
    mockFeatures[0],
  ]);
});

test('should call handleChange when recommendation type is selected', () => {
  render(<Form />);

  const singleProductRadio = screen.getByRole('radio', {
    name: 'Produto Único',
  });

  userEvent.click(singleProductRadio);

  expect(mockHandleChange).toHaveBeenCalledWith(
    'selectedRecommendationType',
    'SingleProduct'
  );
});

test('should show error message when no preference or feature is selected', () => {
  render(<Form />);

  const submitButton = screen.getByRole('button', {
    name: 'Obter recomendação',
  });
  userEvent.click(submitButton);

  expect(
    screen.getByText('Selecione pelo menos uma preferência ou funcionalidade')
  ).toBeInTheDocument();
});

test('should show error message when no recommendation type is selected', () => {
  render(<Form />);

  const submitButton = screen.getByRole('button', {
    name: 'Obter recomendação',
  });
  userEvent.click(submitButton);
  expect(
    screen.getByText('Selecione um tipo de recomendação')
  ).toBeInTheDocument();
});

test('should call setRecommendations on form submission', () => {
  useForm.mockReturnValue({
    formData: {
      selectedPreferences: mockPreferences[0],
      selectedFeatures: mockFeatures[0],
      selectedRecommendationType: 'SingleProduct',
    },
    handleChange: mockHandleChange,
  });

  render(<Form />);

  const submitButton = screen.getByRole('button', {
    name: 'Obter recomendação',
  });

  userEvent.click(submitButton);

  expect(mockSetRecommendations).toHaveBeenCalled();
});

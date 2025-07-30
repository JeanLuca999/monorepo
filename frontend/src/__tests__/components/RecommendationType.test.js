import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RecommendationType from '../../components/Form/Fields/RecommendationType';

test('should render recommendation type title', () => {
  render(<RecommendationType onRecommendationTypeChange={() => null} />);

  expect(screen.getByText('Tipo de Recomendação:')).toBeInTheDocument();
});

test('should render both radio button options', () => {
  render(<RecommendationType onRecommendationTypeChange={() => null} />);

  expect(screen.getByText('Produto Único')).toBeInTheDocument();
  expect(screen.getByText('Múltiplos Produtos')).toBeInTheDocument();
});

test('should render radio buttons with correct attributes', () => {
  render(<RecommendationType onRecommendationTypeChange={() => null} />);

  const singleProductRadio = screen.getByRole('radio', {
    name: 'Produto Único',
  });
  const multipleProductsRadio = screen.getByRole('radio', {
    name: 'Múltiplos Produtos',
  });

  expect(singleProductRadio).toHaveAttribute('type', 'radio');
  expect(singleProductRadio).toHaveAttribute('name', 'recommendationType');
  expect(singleProductRadio).toHaveAttribute('value', 'SingleProduct');
  expect(singleProductRadio).toHaveAttribute('id', 'SingleProduct');

  expect(multipleProductsRadio).toHaveAttribute('type', 'radio');
  expect(multipleProductsRadio).toHaveAttribute('name', 'recommendationType');
  expect(multipleProductsRadio).toHaveAttribute('value', 'MultipleProducts');
  expect(multipleProductsRadio).toHaveAttribute('id', 'MultipleProducts');
});

test('should render radio buttons as unchecked by default', () => {
  render(<RecommendationType onRecommendationTypeChange={() => null} />);

  const singleProductRadio = screen.getByRole('radio', {
    name: 'Produto Único',
  });
  const multipleProductsRadio = screen.getByRole('radio', {
    name: 'Múltiplos Produtos',
  });

  expect(singleProductRadio).not.toBeChecked();
  expect(multipleProductsRadio).not.toBeChecked();
});

test('should call onRecommendationTypeChange when SingleProduct is selected', () => {
  const mockOnRecommendationTypeChange = jest.fn();
  render(
    <RecommendationType
      onRecommendationTypeChange={mockOnRecommendationTypeChange}
    />
  );

  const singleProductRadio = screen.getByRole('radio', {
    name: 'Produto Único',
  });
  userEvent.click(singleProductRadio);

  expect(mockOnRecommendationTypeChange).toHaveBeenCalledWith('SingleProduct');
});

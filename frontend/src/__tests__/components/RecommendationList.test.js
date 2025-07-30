import React from 'react';
import { render, screen } from '@testing-library/react';
import RecommendationList from '../../components/RecommendationList/RecommendationList';
import useRecommendations from '../../hooks/useRecommendations';

jest.mock('../../hooks/useRecommendations');

test('should render recommendation list title', () => {
  useRecommendations.mockReturnValue([]);

  render(<RecommendationList />);

  expect(screen.getByText('Lista de Recomendações:')).toBeInTheDocument();
});

test('should render empty state when no recommendations', () => {
  useRecommendations.mockReturnValue([]);

  render(<RecommendationList />);

  expect(
    screen.getByText('Nenhuma recomendação encontrada.')
  ).toBeInTheDocument();
});

test('should render recommendations when available', () => {
  const mockRecommendations = [
    { id: 1, name: 'RD Station CRM' },
    { id: 2, name: 'RD Station Marketing' },
    { id: 3, name: 'RD Conversas' },
  ];

  useRecommendations.mockReturnValue(mockRecommendations);

  render(<RecommendationList />);

  expect(screen.getByText('RD Station CRM')).toBeInTheDocument();
  expect(screen.getByText('RD Station Marketing')).toBeInTheDocument();
  expect(screen.getByText('RD Conversas')).toBeInTheDocument();
});

test('should not render empty state when recommendations exist', () => {
  const mockRecommendations = [{ id: 1, name: 'RD Station CRM' }];

  useRecommendations.mockReturnValue(mockRecommendations);

  render(<RecommendationList />);

  expect(
    screen.queryByText('Nenhuma recomendação encontrada.')
  ).not.toBeInTheDocument();
});

test('should render recommendations as list items', () => {
  const mockRecommendations = [
    { id: 1, name: 'RD Station CRM' },
    { id: 2, name: 'RD Station Marketing' },
  ];

  useRecommendations.mockReturnValue(mockRecommendations);

  render(<RecommendationList />);

  const listItems = screen.getAllByRole('listitem');
  expect(listItems).toHaveLength(2);
  expect(listItems[0]).toHaveTextContent('RD Station CRM');
  expect(listItems[1]).toHaveTextContent('RD Station Marketing');
});

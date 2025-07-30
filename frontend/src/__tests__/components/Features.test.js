import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Features from '../../components/Form/Fields/Features';
import mockFeatures from '../../mocks/mockFeatures';

test('should render features title', () => {
  render(<Features features={mockFeatures} onFeatureChange={() => null} />);

  expect(screen.getByText('Funcionalidades:')).toBeInTheDocument();
});

test('should render all features as checkboxes', () => {
  render(<Features features={mockFeatures} onFeatureChange={() => null} />);

  mockFeatures.forEach((feature) => {
    expect(screen.getByText(feature)).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: feature })).toBeInTheDocument();
  });
});

test('should render checkboxes as unchecked by default', () => {
  render(<Features features={mockFeatures} onFeatureChange={() => null} />);

  mockFeatures.forEach((feature) => {
    const checkbox = screen.getByRole('checkbox', { name: feature });
    expect(checkbox).not.toBeChecked();
  });
});

test('should render checkboxes as checked when selectedFeatures is provided', () => {
  const selectedFeatures = [mockFeatures[0], mockFeatures[2]];

  render(
    <Features
      features={mockFeatures}
      selectedFeatures={selectedFeatures}
      onFeatureChange={() => null}
    />
  );

  const firstCheckbox = screen.getByRole('checkbox', {
    name: mockFeatures[0],
  });
  const secondCheckbox = screen.getByRole('checkbox', {
    name: mockFeatures[1],
  });
  const thirdCheckbox = screen.getByRole('checkbox', {
    name: mockFeatures[2],
  });

  expect(firstCheckbox).toBeChecked();
  expect(secondCheckbox).not.toBeChecked();
  expect(thirdCheckbox).toBeChecked();
});

test('should call onFeatureChange when checkbox is clicked', () => {
  const mockOnFeatureChange = jest.fn();
  render(
    <Features features={mockFeatures} onFeatureChange={mockOnFeatureChange} />
  );

  const firstCheckbox = screen.getByRole('checkbox', { name: mockFeatures[0] });
  userEvent.click(firstCheckbox);

  expect(mockOnFeatureChange).toHaveBeenCalledWith([mockFeatures[0]]);
});

test('should add feature to selection when checkbox is clicked', () => {
  const mockOnFeatureChange = jest.fn();
  render(
    <Features
      features={mockFeatures}
      selectedFeatures={[mockFeatures[0]]}
      onFeatureChange={mockOnFeatureChange}
    />
  );

  const secondCheckbox = screen.getByRole('checkbox', {
    name: mockFeatures[1],
  });
  userEvent.click(secondCheckbox);

  expect(mockOnFeatureChange).toHaveBeenCalledWith([
    mockFeatures[0],
    mockFeatures[1],
  ]);
});

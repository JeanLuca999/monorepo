import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Checkbox from '../../components/shared/Checkbox';

test('should render checkbox with children', () => {
  render(<Checkbox>Test Checkbox Label</Checkbox>);

  expect(screen.getByText('Test Checkbox Label')).toBeInTheDocument();
  expect(screen.getByRole('checkbox')).toBeInTheDocument();
});

test('should render checkbox as unchecked by default', () => {
  render(<Checkbox>Test Checkbox</Checkbox>);

  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();
});

test('should render checkbox as checked when checked prop is true', () => {
  render(
    <Checkbox checked onChange={() => {}}>
      Test Checkbox
    </Checkbox>
  );

  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).toBeChecked();
});

test('should call onChange when checkbox is clicked', () => {
  const mockOnChange = jest.fn();

  render(<Checkbox onChange={mockOnChange}>Test Checkbox</Checkbox>);

  const checkbox = screen.getByRole('checkbox');
  userEvent.click(checkbox);

  expect(mockOnChange).toHaveBeenCalled();
});

test('should handle disabled state', () => {
  render(<Checkbox disabled>Test Checkbox</Checkbox>);

  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).toBeDisabled();
});

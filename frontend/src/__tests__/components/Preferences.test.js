import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Preferences from '../../components/Form/Fields/Preferences';
import mockPreferences from '../../mocks/mockPreferences';

test('should render preferences title', () => {
  render(
    <Preferences
      preferences={mockPreferences}
      onPreferenceChange={() => null}
    />
  );

  expect(screen.getByText('Preferências:')).toBeInTheDocument();
});

test('should render all preferences as checkboxes', () => {
  render(
    <Preferences
      preferences={mockPreferences}
      onPreferenceChange={() => null}
    />
  );

  mockPreferences.forEach((preference) => {
    expect(screen.getByText(preference)).toBeInTheDocument();
    expect(
      screen.getByRole('checkbox', { name: preference })
    ).toBeInTheDocument();
  });
});

test('should render checkboxes as unchecked by default', () => {
  render(
    <Preferences
      preferences={mockPreferences}
      onPreferenceChange={() => null}
    />
  );

  mockPreferences.forEach((preference) => {
    const checkbox = screen.getByRole('checkbox', { name: preference });
    expect(checkbox).not.toBeChecked();
  });
});

test('should render checkboxes as checked when selectedPreferences is provided', () => {
  const selectedPreferences = [mockPreferences[0], mockPreferences[2]];

  render(
    <Preferences
      preferences={mockPreferences}
      selectedPreferences={selectedPreferences}
      onPreferenceChange={() => null}
    />
  );

  const firstCheckbox = screen.getByRole('checkbox', {
    name: mockPreferences[0],
  });
  const secondCheckbox = screen.getByRole('checkbox', {
    name: mockPreferences[1],
  });
  const thirdCheckbox = screen.getByRole('checkbox', {
    name: mockPreferences[2],
  });

  expect(firstCheckbox).toBeChecked();
  expect(secondCheckbox).not.toBeChecked();
  expect(thirdCheckbox).toBeChecked();
});

test('should call onPreferenceChange when checkbox is clicked', () => {
  const mockOnPreferenceChange = jest.fn();
  render(
    <Preferences
      preferences={mockPreferences}
      onPreferenceChange={mockOnPreferenceChange}
    />
  );

  const firstCheckbox = screen.getByRole('checkbox', {
    name: mockPreferences[0],
  });
  userEvent.click(firstCheckbox);

  expect(mockOnPreferenceChange).toHaveBeenCalledWith([mockPreferences[0]]);
});

test('should add preference to selection when checkbox is clicked', () => {
  const mockOnPreferenceChange = jest.fn();
  render(
    <Preferences
      preferences={mockPreferences}
      selectedPreferences={[mockPreferences[0]]}
      onPreferenceChange={mockOnPreferenceChange}
    />
  );

  const secondCheckbox = screen.getByRole('checkbox', {
    name: mockPreferences[1],
  });
  userEvent.click(secondCheckbox);

  expect(mockOnPreferenceChange).toHaveBeenCalledWith([
    mockPreferences[0],
    mockPreferences[1],
  ]);
});

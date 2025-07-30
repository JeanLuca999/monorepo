import { renderHook, act } from '@testing-library/react';
import useForm from '../../hooks/useForm';

test('should initialize with provided initial state', () => {
  const initialState = {
    selectedPreferences: ['pref1'],
    selectedFeatures: ['feature1'],
    selectedRecommendationType: 'SingleProduct',
  };

  const { result } = renderHook(() => useForm(initialState));

  expect(result.current.formData).toEqual(initialState);
});

test('should update form data when handleChange is called', () => {
  const { result } = renderHook(() => useForm({}));

  act(() => {
    result.current.handleChange('selectedPreferences', ['pref1', 'pref2']);
  });

  expect(result.current.formData.selectedPreferences).toEqual([
    'pref1',
    'pref2',
  ]);
});

test('should preserve other fields when updating one field', () => {
  const initialState = {
    selectedPreferences: ['existing-pref'],
    selectedFeatures: ['existing-feature'],
    selectedRecommendationType: 'SingleProduct',
  };

  const { result } = renderHook(() => useForm(initialState));

  act(() => {
    result.current.handleChange('selectedFeatures', ['new-feature']);
  });

  expect(result.current.formData.selectedPreferences).toEqual([
    'existing-pref',
  ]);
  expect(result.current.formData.selectedFeatures).toEqual(['new-feature']);
  expect(result.current.formData.selectedRecommendationType).toEqual(
    'SingleProduct'
  );
});

// Form.js

import React, { useState } from 'react';
import { Preferences, Features, RecommendationType } from './Fields';
import { SubmitButton } from './SubmitButton';
import useProducts from '../../hooks/useProducts';
import useForm from '../../hooks/useForm';
import useSetRecommendations from '../../hooks/useSetRecommendations';

function Form() {
  const { preferences, features, products } = useProducts();
  const { formData, handleChange } = useForm({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: '',
  });
  const [errors, setErrors] = useState({
    noSelection: '',
    noRecommendationType: '',
  });

  const setRecommendations = useSetRecommendations();

  const handleSubmit = (e) => {
    e.preventDefault();
    const isSelectedPreferencesInvalid =
      formData.selectedPreferences.length === 0;
    const isSelectedFeaturesInvalid = formData.selectedFeatures.length === 0;
    const isRecommendationTypeEmpty =
      formData.selectedRecommendationType === '';

    if (isSelectedPreferencesInvalid && isSelectedFeaturesInvalid) {
      setErrors((prev) => ({
        ...prev,
        noSelection: 'Selecione pelo menos uma preferência ou funcionalidade',
      }));
    }

    if (isRecommendationTypeEmpty) {
      setErrors((prev) => ({
        ...prev,
        noRecommendationType: 'Selecione um tipo de recomendação',
      }));
    }

    if (
      (isSelectedPreferencesInvalid && isSelectedFeaturesInvalid) ||
      isRecommendationTypeEmpty
    ) {
      return;
    }

    setRecommendations(formData, products);
  };

  function hadleChangePreference(selected) {
    handleChange('selectedPreferences', selected);
    setErrors((prev) => ({
      ...prev,
      noSelection: '',
    }));
  }

  function hadleChangeFeature(selected) {
    handleChange('selectedFeatures', selected);
    setErrors((prev) => ({
      ...prev,
      noSelection: '',
    }));
  }

  function hadleChangeRecommendationType(selected) {
    handleChange('selectedRecommendationType', selected);
    setErrors((prev) => ({
      ...prev,
      noRecommendationType: '',
    }));
  }

  return (
    <form
      className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      {errors.noSelection && (
        <p className="text-red-500" aria-live="polite">
          {errors.noSelection}
        </p>
      )}

      <Preferences
        preferences={preferences}
        onPreferenceChange={hadleChangePreference}
      />
      <Features features={features} onFeatureChange={hadleChangeFeature} />
      {errors.noRecommendationType && (
        <p className="text-red-500" aria-live="polite">
          {errors.noRecommendationType}
        </p>
      )}
      <RecommendationType
        onRecommendationTypeChange={hadleChangeRecommendationType}
      />
      <SubmitButton text="Obter recomendação" />
    </form>
  );
}

export default Form;

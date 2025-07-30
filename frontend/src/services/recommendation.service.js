// getRecommendations.js

const getRecommendations = (
  formData = {
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: '',
  },
  products
) => {
  const { selectedPreferences, selectedFeatures, selectedRecommendationType } =
    formData;
  const hasPreferencesAndFeaturesSelected =
    selectedPreferences?.length && selectedFeatures?.length;

  const hasOnlyPreferencesSelected =
    selectedPreferences?.length && !selectedFeatures?.length;

  const hasOnlyFeaturesSelected =
    !selectedPreferences?.length && selectedFeatures?.length;

  if (hasPreferencesAndFeaturesSelected) {
    const filteredProducts = filterForPreferencesAndFeatures(
      products,
      selectedPreferences,
      selectedFeatures
    );

    return selectedItemsBasedOnRecommendationType(
      filteredProducts,
      selectedRecommendationType
    );
  }

  if (hasOnlyPreferencesSelected) {
    const filteredProducts = filterForPreferencesOnly(
      products,
      selectedPreferences
    );
    return selectedItemsBasedOnRecommendationType(
      filteredProducts,
      selectedRecommendationType
    );
  }

  if (hasOnlyFeaturesSelected) {
    const filteredProducts = filterForFeaturesOnly(products, selectedFeatures);
    return selectedItemsBasedOnRecommendationType(
      filteredProducts,
      selectedRecommendationType
    );
  }

  return [];
};

export default { getRecommendations };

function filterForPreferencesAndFeatures(
  products,
  selectedPreferences,
  selectedFeatures
) {
  const filteredProducts = products.filter((product) => {
    const { preferences, features } = product;
    return (
      preferences.some((preference) =>
        selectedPreferences.includes(preference)
      ) && features.some((feature) => selectedFeatures.includes(feature))
    );
  });

  return filteredProducts;
}

function filterForPreferencesOnly(products, selectedPreferences) {
  const filteredProducts = products.filter((product) => {
    const { preferences } = product;
    return preferences.some((preference) =>
      selectedPreferences.includes(preference)
    );
  });
  return filteredProducts;
}

function filterForFeaturesOnly(products, selectedFeatures) {
  const filteredProducts = products.filter((product) => {
    const { features } = product;
    return features.some((feature) => selectedFeatures.includes(feature));
  });
  return filteredProducts;
}

function selectedItemsBasedOnRecommendationType(products, recommendation) {
  if (recommendation === 'SingleProduct' && products.length > 1) {
    const lastProduct = products[products.length - 1];
    return [lastProduct];
  }
  if (recommendation === 'SingleProduct' && products.length) {
    return [products[0]];
  }
  if (recommendation === 'MultipleProducts' && products.length) {
    return products;
  }
  return [];
}

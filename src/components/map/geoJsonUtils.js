// geoJsonUtils.js
const fetchGeoJsonData = (url) =>
  fetch(url)
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error fetching GeoJSON data:', error);
      throw error; // Rethrow the error for handling by the caller
    });

export default fetchGeoJsonData;

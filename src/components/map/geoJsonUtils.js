const fetchGeoJsonData = async (url) => {
  try {
    const response = await fetch(url);
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    throw new Error('Error fetching GeoJSON data:', error);
  }
};

export default fetchGeoJsonData;

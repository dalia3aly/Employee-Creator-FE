import axios from "axios";

const API_URL = "http://localhost:8080/api/address";

const getAuthHeaders = () => {
  const token =
    localStorage.getItem("token") || localStorage.getItem("userToken");
  console.log("Retrieved token for headers:", token);
  return { Authorization: `Bearer ${token}` };
};

export const fetchAddressSuggestions = async (query: string) => {
  try {
    const response = await axios.get(`${API_URL}/autocomplete`, {
      params: { input: query },
      headers: getAuthHeaders(),
    });
    return response.data.predictions;
  } catch (error) {
    console.error("Error fetching address suggestions: ", error);
    throw error;
  }
};

export const fetchPlaceDetails = async (placeId: string) => {
  try {
    const response = await axios.get(`${API_URL}/details`, {
      params: { placeId },
      headers: getAuthHeaders(),
    });
    return response.data.result.address_components;
  } catch (error) {
    console.error("Error fetching place details: ", error);
    throw error;
  }
};

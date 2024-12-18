// src/services/customerService.js
import apiClient from "./apiClient";

// Fetch customers from the API
export const fetchCustomers = async (skip = 0, limit = 10) => {
  try {
    const response = await apiClient.get(
      `user/customers?skip=${skip}&limit=${limit}`
    );

    return response.data;
  } catch (error) {
    console.log(error);

    throw new Error("Error fetching customer data.");
  }
};

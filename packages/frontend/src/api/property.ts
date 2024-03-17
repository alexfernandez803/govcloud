import axios from "axios";
import { PUBLIC_REST_API } from "./config";

async function getPropertyById(id: string): Promise<any> {
  try {
    const response = await axios.get(`${PUBLIC_REST_API}/api/properties/${id}`);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error fetching property:", error);
    throw error;
  }
}

async function createProperty(customerId: string, property: any): Promise<any> {
  try {
    const response = await axios.post(
      `${PUBLIC_REST_API}/api/customers/${customerId}/properties`,
      property
    );
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error creating property:", error);
    throw error;
  }
}

export type Status = "active" | "archived" | "pending" | "sold" | "inactive";

async function updateStatus(id: string, status: Status) {
  try {
    const response = await axios.patch(
      `${PUBLIC_REST_API}/api/properties/${id}/status/${status}`
    );
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error updating property status:", error);
    throw error;
  }
}

async function getProperties(customerId: string): Promise<any> {
  try {
    const response = await axios.get(
      `${PUBLIC_REST_API}/api/customers/${customerId}/properties`
    );
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error fetching properties:", error);
    throw error;
  }
}

export { getPropertyById, createProperty, getProperties, updateStatus };

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

export { getPropertyById };

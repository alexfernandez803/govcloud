import axios from "axios";
import { PUBLIC_REST_API } from "./config";

async function getCustomers(params: URLSearchParams) {
  const searchParameters = new URLSearchParams();
  if (params) {
    for (const [key, value] of params.entries()) {
      if (key && value && key === "customer_status") {
        {
          searchParameters.append(key, value);
        }
      }
    }
  }

  try {
    const response = await axios.get(
      `${PUBLIC_REST_API}/api/customers?${searchParameters}`
    );

    const customers = response.data;
    // Process the customers data here
    return customers;
  } catch (error) {
    // Handle the error here
    console.error(error);
  }
}
async function getCustomerById(id: string) {
  const response = await axios.get(`${PUBLIC_REST_API}/api/customers/${id}`);
  const customers = response.data;
  return customers;
}

async function createCustomer(customerData: any) {
  const response = await axios.post(
    `${PUBLIC_REST_API}/api/customers`,
    customerData
  );
  const newCustomer = response.data;
  return newCustomer;
}

async function getCustomerProperties(id: string, status?: string | null) {
  const searchParameters = new URLSearchParams();
  if (status) {
    searchParameters.append("status", status);
  }
  // Add more search parameters if needed
  const response = await axios.get(
    `${PUBLIC_REST_API}/api/customers/${id}/properties?${searchParameters}`
  );
  const properties = response.data;
  return properties;
}

async function updateStatus(id: string, status: Status) {
  try {
    const response = await axios.patch(
      `${PUBLIC_REST_API}/api/customers/${id}/status/${status}`
    );
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error updating property status:", error);
    throw error;
  }
}

export {
  getCustomers,
  createCustomer,
  getCustomerById,
  getCustomerProperties,
  updateStatus,
};

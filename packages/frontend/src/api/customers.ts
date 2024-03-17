import axios from "axios";
import { PUBLIC_REST_API } from "./config";

async function getCustomers() {
  try {
    const response = await axios.get(`${PUBLIC_REST_API}/api/customers`);
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

async function getCustomerProperties(id: string) {
  const response = await axios.get(
    `${PUBLIC_REST_API}/api/customers/${id}/properties`
  );
  const properties = response.data;
  return properties;
}

export { getCustomers, createCustomer, getCustomerById, getCustomerProperties };

import React from "react";
import ReactDOM from "react-dom/client";
import "./globals.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import PropertyDetails from "./routes/property";
import CustomerDetails from "./routes/customer-details";
import Root, { loader as rootLoader } from "./routes/root";

import { loader as propertyLoader } from "./routes/property";
import { loader as customerLoader } from "./routes/customer-details";
import { CustomerForm } from "./routes/customer-add";
import PropertyAdd, { PropertyForm } from "./routes/property-add";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        path: "/customers",
        element: <CustomerForm />,
      },
      {
        path: "/customers/:customerId",
        element: <CustomerDetails />,
        loader: customerLoader,
        children: [
          {
            path: "/customers/:customerId/properties/:propertyId",
            element: <PropertyDetails />,
            loader: propertyLoader,
          },
          {
            path: "/customers/:customerId/properties/new",
            element: <PropertyForm />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

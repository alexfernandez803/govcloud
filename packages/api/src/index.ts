import express from "express";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Create a PostgreSQL connection pool
const user = process.env.DB_USER;
const host = process.env.DB_HOST;
const database = process.env.DB_NAME;
const password = process.env.DB_PASSWORD;
const port = process.env.DB_PORT;

const pool = new Pool({
  user,
  host,
  database,
  password,
  port: Number(port),
});

// Define a route to fetch data from the database
app.get("/api/customers", async (req, res) => {
  const { page = 1, pageSize = 10, ...filters } = req.query;
  const offset =
    (parseInt(page.toString()) - 1) * parseInt(pageSize.toString());

  // Define the allowed filterable fields and fields for which to provide facets
  const allowedFilters = [
    "first_name",
    "last_name",
    "email",
    "phone",
    "address",
    "city",
    "state",
    "postal_code",
    "country",
  ];
  const facetFields = ["city", "state", "country"];

  // Construct the SQL query dynamically based on the allowed filterable fields
  let query = "SELECT * FROM customers";
  const conditions: string[] = [];
  const values: any[] = [];

  for (const key in filters) {
    if (allowedFilters.includes(key)) {
      conditions.push(`${key} ILIKE $${conditions.length + 1}`);
      values.push(`%${filters[key]}%`);
    }
  }

  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(" AND ")}`;
  }

  // Include facets in the query to get counts for each unique value of facetFields
  const facetQueries = facetFields.map(
    (field) =>
      `SELECT ${field}, COUNT(*) AS count FROM customers GROUP BY ${field};`
  );
  const facetResults = await Promise.all(
    facetQueries.map((q) => pool.query(q))
  );

  try {
    // Query total count of records without limit and offset
    const countQuery = `SELECT COUNT(*) FROM customers ${
      conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : ""
    };`;
    const countResult = await pool.query(countQuery, values);
    const totalCount = parseInt(countResult.rows[0].count);

    // Add LIMIT and OFFSET to the query for pagination
    query += ` ORDER BY id OFFSET $${values.length + 1} LIMIT $${
      values.length + 2
    };`;
    values.push(offset, pageSize);

    const result = await pool.query(query, values);
    const customers = result.rows;

    // Set pagination metadata and total count in response headers
    res.setHeader("X-Page", page.toString());
    res.setHeader("X-PageSize", pageSize.toString());
    res.setHeader("X-Total-Count", totalCount.toString());

    // Combine customer data with facet data
    const facets: { [key: string]: any[] } = facetResults.reduce(
      (acc: { [key: string]: any[] }, facetResult, index) => {
        acc[facetFields[index]] = facetResult.rows;
        return acc;
      },
      {}
    );

    res.json({ customers, facets });
  } catch (err) {
    console.error("Error getting customers:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
const serverPort = 3000;
app.listen(serverPort, () => {
  console.log(`Server is running on port ${serverPort}`);
});

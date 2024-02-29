import { ColumnDef } from "@tanstack/react-table";
import { CustomerType, User } from "./types";

export const columns: ColumnDef<CustomerType>[] = [
  {
    header: "Id",
    accessorKey: "id",
  },
  {
    header: "First Name",
    accessorKey: "firstName",
  },
  {
    header: "Last Name",
    accessorKey: "lastName",
  },
  {
    header: "Created At",
    accessorKey: "createdAt",
  },
  {
    header: "Updated At",
    accessorKey: "updatedAt",
  },
];

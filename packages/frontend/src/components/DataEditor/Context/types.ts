export type CustomerType = {
  id: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
  properties: Properties[];
};
export type DataViewType = "table" | "card";

export type Properties = {
  id: string;
  createdAt: string;
  updatedAt: string;
  addressLine1: string;
  addressLine2: string;
  barangay: string;
  city: string;
  assessedValue: string;
  lotSize: string;
  status: null | string;
  description: string;
  remarks: string;
};

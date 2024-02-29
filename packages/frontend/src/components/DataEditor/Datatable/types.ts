export type User = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  username: string;
  email: string;
  age: number;
  password: string;
  gender: "f" | "m" | "other";
};

export type CustomerType = {
  firstName: string;
  lastName: string;
  id: string;
  createdAt: string;
  updatedAt: string;
};

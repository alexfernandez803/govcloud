import { CustomerType, DataViewType } from "./types";

export const initialData: any[] = [];

export const initialInterfaceState = {
  filter: "",
  setFilter: () => {},
  isAddOpen: false,
  dataView: "card" as DataViewType,
  selectedRecord: undefined,
};

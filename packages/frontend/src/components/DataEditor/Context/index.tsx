import React, { createContext, useContext, useEffect, useState } from "react";
import { initialData, initialInterfaceState } from "./consts";
import {
  ColumnFiltersState,
  RowSelectionState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";

export type InterfaceStateType = {
  filter: string;
  columnVisibility?: VisibilityState;
  columnFilters?: ColumnFiltersState;
  sorting?: SortingState;
  rowSelection?: RowSelectionState;
};

export type DataEditorType = {
  interfaceState: InterfaceStateType;
  apiData: any[];
  isFetchingNewData: boolean;
};
export type DataEditorContextProps = {
  dataEditor: DataEditorType;
  setDataEditor: React.Dispatch<React.SetStateAction<DataEditorType>>;
};

export const DataEditorContext = createContext<DataEditorContextProps | null>(
  null
);

export const useDataEditor = () => {
  const context = useContext(DataEditorContext);
  if (!context) {
    throw new Error(
      "DataEditorContext must be used within a DataEditorProvider"
    );
  }
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const { dataEditor, setDataEditor } = context;

  function fetchData() {
    setDataEditor((prev) => ({ ...prev, isFetchingNewData: true }));
    fetch("https://jsonplaceholder.typicode.com/users").then((response) => {
      response.json().then((data) => {
        setDataEditor((prev) => ({
          ...prev,
          apiData: data,
          isFetchingNewData: false,
        }));
      });
    });
  }

  return {
    dataEditor,
    setDataEditor,
    fetchData,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    columnVisibility,
    setColumnVisibility,
    columnFilters,
    setColumnFilters,
  };
};

const DataEditorProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const initialState = {
    interfaceState: initialInterfaceState,
    apiData: initialData,
    isFetchingNewData: false,
  };
  const [dataEditor, setDataEditor] = useState<DataEditorType>(initialState);
  return (
    <DataEditorContext.Provider value={{ dataEditor, setDataEditor }}>
      {children}
    </DataEditorContext.Provider>
  );
};

export default DataEditorProvider;

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
  isAddOpen: boolean;
};

export type DataEditorType = {
  interfaceState: InterfaceStateType;
  apiData: any[];
  isLoading: boolean;
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
    setDataEditor((prev) => ({
      ...prev,
      isFetchingNewData: true,
      isLoading: true,
    }));

    const PUBLIC_REST_API = import.meta.env.VITE_PUBLIC_REST_API;

    fetch(`${PUBLIC_REST_API}/user`).then((response) => {
      response.json().then((data) => {
        setDataEditor((prev) => ({
          ...prev,
          apiData: data.items,
          isFetchingNewData: false,
          isLoading: false,
        }));
      });
    });
  }

  const toggleAdd = () => {
    setDataEditor((prev) => ({
      ...prev,
      interfaceState: {
        ...prev.interfaceState,
        isAddOpen: !prev.interfaceState.isAddOpen,
      },
    }));
  };
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

    toggleAdd,
  };
};

const DataEditorProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const initialState = {
    interfaceState: initialInterfaceState,
    apiData: initialData,
    isLoading: false,
  };
  const [dataEditor, setDataEditor] = useState<DataEditorType>(initialState);
  return (
    <DataEditorContext.Provider value={{ dataEditor, setDataEditor }}>
      {children}
    </DataEditorContext.Provider>
  );
};

export default DataEditorProvider;

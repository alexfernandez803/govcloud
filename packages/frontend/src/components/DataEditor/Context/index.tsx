import React, { createContext, useContext, useEffect, useState } from "react";
import { initialData, initialInterfaceState } from "./consts";
import { CustomerType, DataViewType } from "./types";
const PUBLIC_REST_API = import.meta.env.VITE_PUBLIC_REST_API;

export type InterfaceStateType = {
  filter: string;
  isAddOpen: boolean;
  dataView: DataViewType;
  selectedRecord?: CustomerType;
};

export type DataEditorType = {
  interfaceState: InterfaceStateType;
  apiData: CustomerType[];
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

  const { dataEditor, setDataEditor } = context;

  function fetchData(filter: string = "") {
    setDataEditor((prev) => ({
      ...prev,
      isFetchingNewData: true,
      isLoading: true,
    }));

    let filterQuery = "";

    if (filter !== "") {
      filterQuery = `?filter=firstName:like:${filter}`;
    }

    fetch(`${PUBLIC_REST_API}/customers${filterQuery}`).then((response) => {
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

  function createRecord(data: any) {
    const PUBLIC_REST_API = import.meta.env.VITE_PUBLIC_REST_API;
    fetch(`${PUBLIC_REST_API}/customers`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      response.json().then((data) => {
        fetchData();
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

  const setFilter = (text: string) => {
    fetchData(text);
    setDataEditor((prev) => ({
      ...prev,
      interfaceState: {
        ...prev.interfaceState,
        filter: text,
      },
    }));
  };

  function setSelectedRecord(customer: CustomerType) {
    setDataEditor((prev) => ({
      ...prev,
      interfaceState: {
        ...prev.interfaceState,
        selectedRecord: customer,
      },
    }));
  }
  return {
    dataEditor,
    setDataEditor,
    fetchData,
    createRecord,
    toggleAdd,
    setFilter,
    setSelectedRecord,
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

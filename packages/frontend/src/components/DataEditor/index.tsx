import DataEditorProvider, { useDataEditor } from "./Context";
import React from "react";
import CreateRecord from "./Form/create-record";
import Toolbar from "./Toolbar";
import { DataPage } from "./Datatable";
import DataGrid from "../DataGrid";

export const App = () => {
  const { fetchData, dataEditor } = useDataEditor();

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className=" h-full max-h-[800px] flex space-y-4 flex-col">
      <Toolbar />
      <div className="flex flex-row space-x-4">
        {dataEditor.interfaceState.dataView === "table" && <DataPage />}
        {dataEditor.interfaceState.dataView === "card" && <DataGrid />}
        {dataEditor.interfaceState.isAddOpen && <CreateRecord />}
      </div>
    </div>
  );
};

export default function DataEditor() {
  return (
    <DataEditorProvider>
      <App />
    </DataEditorProvider>
  );
}

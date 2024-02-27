import DataEditorProvider, { useDataEditor } from "./Context";
import React from "react";
import DataTable from "./Datatable/datatable";
import CreateRecord from "./Form/create-record";

export const App = () => {
  const { fetchData, dataEditor } = useDataEditor();

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className=" h-full max-h-[800px] flex space-x-2">
      <DataTable />
      <CreateRecord />
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

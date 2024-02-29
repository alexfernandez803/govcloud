import { useDataEditor } from "../Context";
import { columns } from "./columns";
import { DataTable } from "./datatable";

export function DataPage() {
  const { dataEditor } = useDataEditor();
  return (
    <div className="w-2/3 border flex-1  h-full  rounded-2xl ">
      <DataTable columns={columns} data={dataEditor.apiData} />
    </div>
  );
}

import DataView from "./DataView";

export default function DataGrid() {
  return (
    <div className="flex w-full">
      <div className="w-1/4 flex-1  h-full ">
        <DataView />
      </div>

      <div className="w-3/4 border flex-1  h-full p-2"></div>
    </div>
  );
}

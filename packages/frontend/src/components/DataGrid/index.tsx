import CustomerDetails from "./DataViewCustomerDetails";
import DataView from "./DataView";
import { Outlet, Link } from "react-router-dom";
export default function DataGrid() {
  return (
    <div className="flex w-full h-screen">
      <div className="w-1/4 flex-1  h-full ">
        <DataView />
      </div>

      <div className="w-3/4 border rounded-lg flex-1  h-full p-2">
        <Outlet />
      </div>
    </div>
  );
}

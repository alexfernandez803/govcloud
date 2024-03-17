import {
  Outlet,
  useLoaderData,
  useSubmit,
  useNavigation,
  NavLink,
} from "react-router-dom";
import { getCustomers } from "@/api/customers";
import { cn } from "@/lib/utils";
import { Toaster } from "@/registry/new-york/ui/toaster";
import { Toolbar } from "@/components/customers/RootToolbar";
import { CustomerFilters } from "@/components/customers/CustomerFilters";

export async function loader() {
  const searchParams = new URLSearchParams(location.search);
  const customers = await getCustomers(searchParams);
  return { customers };
}

export default function Root() {
  const { customers } = useLoaderData();
  const submit = useSubmit();

  return (
    <div className="flex min-h-screen">
      <div className="sidebar w-1/4 bg-slate-50 border-r border-gray-200 min-h-screen">
        <Toolbar />
        <nav className=" min-h-screen">
          <ul className="py-2  ">
            {customers &&
              customers.items.map((customer: any) => (
                <li
                  key={customer.id}
                  className="flex flex-col px-4 text-left text-sm w-full "
                >
                  <NavLink
                    to={`/customers/${customer.id}`}
                    className={({ isActive }) =>
                      cn(
                        " w-full hover:bg-gray-100 py-2 px-4 rounded-lg",
                        isActive &&
                          "bg-gray-600 w-full py-2 px-4 text-white hover:bg-gray-800 "
                      )
                    }
                  >
                    {customer.firstName} {customer.lastName}
                  </NavLink>
                </li>
              ))}
          </ul>
        </nav>
        <CustomerFilters />
      </div>
      <div className="flex  w-3/4 min-h-screen">
        <Outlet />
      </div>
      <Toaster />
    </div>
  );
}

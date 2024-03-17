import {
  Outlet,
  Link,
  useLoaderData,
  useSubmit,
  useNavigation,
  Form,
  NavLink,
} from "react-router-dom";
import { getCustomers } from "@/api/customers";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Toaster } from "@/registry/new-york/ui/toaster";

export async function loader() {
  const customers = await getCustomers();
  return { customers };
}

function Toolbar() {
  const submit = useSubmit();
  const { q } = useLoaderData();
  return (
    <div id="search-form" role="search" className="p-2">
      <div className="flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
        <Form>
          <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="q"
                placeholder="Search"
                className="pl-8 w-full "
                type="search"
                name="q"
                defaultValue={q}
                onChange={(event) => {
                  submit(event.currentTarget.form);
                }}
              />
            </div>
          </div>
        </Form>

        <Button asChild>
          <Link to={`/customers`} className="">
            New Customer
          </Link>
        </Button>
      </div>
    </div>
  );
}
export default function Root() {
  const navigation = useNavigation();
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
      </div>
      <div className="flex  w-3/4 min-h-screen">
        <Outlet />
      </div>
      <Toaster />
    </div>
  );
}

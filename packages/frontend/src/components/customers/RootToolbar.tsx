import { useSubmit, Link, Form, useLoaderData } from "react-router-dom";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { CustomerFilters } from "./CustomerFilters";
import { Input } from "@/registry/new-york/ui/input";

export function Toolbar() {
  const submit = useSubmit();
  const { q } = useLoaderData();
  return (
    <div id="search-form" role="search" className="p-2">
      <div className="flex flex-1 flex-col space-y-2 py-2 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
        <Form>
          <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="q"
                placeholder="Search"
                className="pl-8 w-64  "
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

        <Button asChild variant={"default"} className="text-xs">
          <Link to={`/customers`} className="">
            New Customer
          </Link>
        </Button>
      </div>
      <CustomerFilters />
    </div>
  );
}

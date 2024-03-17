import { ScrollArea } from "@radix-ui/react-scroll-area";
import { PlusIcon } from "lucide-react";
import { Properties } from "../DataEditor/Context/types";
import { Button } from "../ui/button";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Badge } from "@/registry/new-york/ui/badge";
import { cn, formatDte } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/registry/new-york/ui/radio-group";
import { Label } from "@/registry/new-york/ui/label";
import { useSearchParams } from "react-router-dom";
export function PropertyList({
  customerId,
  properties,
}: {
  customerId: string;
  properties: Properties[];
}) {
  const navigate = useNavigate();
  return (
    <div className="w-1/3 border rounded-sm py-2">
      <p className="text-sm text-muted-foreground px-6">Owned Properties</p>
      <ScrollArea className="p-4 w-full">
        <div className="w-full flex items-center justify-center py-6">
          <Button
            variant={"outline"}
            onClick={() => {
              navigate(`/customers/${customerId}/properties/new`);
            }}
          >
            <PlusIcon className="h-4 w-4" />
            Add Property
          </Button>
        </div>
        <div className="space-y-2">
          <div className="flex space-y-2 p-2">
            <div className=" w-1/4"></div>
            <div className=" w-3/4 ">
              <PropertyFilter />
            </div>
          </div>
        </div>
        {!properties ||
          (properties.length === 0 && (
            <div className="w-full flex items-center justify-center p-4 text-gray-800">
              <p>No properties available.</p>
            </div>
          ))}
        {properties && properties.length > 0 && (
          <div className="w-full flex flex-col gap-y-2">
            {properties.map((property: Properties) => (
              <PropertyDetails key={property.id} property={property} />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}

const PropertyDetails = ({ property }: { property: Properties }) => {
  const { customerId } = useParams();
  return (
    <NavLink
      to={`/customers/${customerId}/properties/${property.id}`}
      className={({ isActive }) =>
        cn(
          " w-full  bg-gray-200 border-black hover:bg-gray-100  py-4 px-4  space-y-4 rounded-lg border transition-all gap-4",
          isActive && "hover:bg-gray-50 bg-white border-green-700"
        )
      }
    >
      <div className="flex w-full flex-col ">
        <div className="flex items-center ">
          <div className="flex items-center  space-x-2">
            <div className="py-2 text-xs">
              {property.addressLine1} {property.addressLine2}{" "}
              {property.barangay} {property.city}
            </div>
            <span
              className={cn("flex h-2 w-2 rounded-full bg-blue-600", {
                "bg-green-500": property.status === "active",
                "bg-gray-500": property.status !== "active",
              })}
            ></span>
          </div>
          <div className="ml-auto text-xs text-foreground">
            {formatDte(property.updatedAt)}
          </div>
        </div>
      </div>

      <div className=" space-x-2 text-xs ">
        <Badge variant={"secondary"}>Lot Size: {property.lotSize}</Badge>
        <Badge variant={"secondary"}>Status: {property.status}</Badge>
      </div>
    </NavLink>
  );
};

function FilterGroup({ value, name }: { value: string; name: string }) {
  return (
    <div>
      <RadioGroupItem value={value} id={value} className="peer sr-only " />
      <Label
        htmlFor={value}
        className="flex flex-col p-1 cursor-pointer items-center justify-between  text-xs rounded-md border-2 border-muted bg-popover  hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
      >
        {name}
      </Label>
    </div>
  );
}

function PropertyFilter() {
  const [_, setSearchParams] = useSearchParams();

  const handleChange = (value: string) => {
    setSearchParams({ property_status: value });
  };

  return (
    <RadioGroup
      defaultValue="active"
      className="grid grid-cols-3 gap-1"
      onValueChange={handleChange}
    >
      <FilterGroup value="all" name="All" />
      <FilterGroup value="active" name="Active" />
      <FilterGroup value="inactive" name="Inactive" />
    </RadioGroup>
  );
}

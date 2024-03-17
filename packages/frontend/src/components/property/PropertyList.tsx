import { ScrollArea } from "@radix-ui/react-scroll-area";
import { PlusIcon } from "lucide-react";
import { Properties } from "../DataEditor/Context/types";
import { Button } from "../ui/button";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Badge } from "@/registry/new-york/ui/badge";
import { cn, formatDte } from "@/lib/utils";

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
        <div className="">
          {!properties || (properties.length === 0 && <></>)}
          {properties && properties.length > 0 && (
            <div className="w-full flex flex-col gap-y-2">
              {properties.map((property: Properties) => (
                <PropertyDetails key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
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
          " w-full  bg-gray-200 border-black hover:bg-gray-100  py-4 px-4 rounded-lg border transition-all gap-4",
          isActive && "hover:bg-gray-50 bg-white border-green-700"
        )
      }
    >
      <div className="flex w-full flex-col gap-2">
        <div className="flex items-center align-top p-2">
          <div className="flex items-center  gap-2 ">
            <div className="py-2 text-xs">
              {property.addressLine1} {property.addressLine2}{" "}
              {property.barangay} {property.city}
            </div>
            <span className="flex h-2 w-2 rounded-full bg-blue-600"></span>
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

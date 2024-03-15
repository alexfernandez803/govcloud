import { getCustomerById } from "@/api/customers";
import { Properties } from "@/components/DataEditor/Context/types";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/registry/new-york/ui/scroll-area";
import { Badge } from "@/registry/new-york/ui/badge";
import { Button } from "@/registry/new-york/ui/button";
import { formatDistanceToNow } from "date-fns";
import { PlusIcon } from "lucide-react";
import {
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  useNavigate,
  useNavigation,
  useParams,
} from "react-router-dom";

export async function loader({ params }: { params: any }) {
  const customer = await getCustomerById(params.customerId);
  return { customer };
}

const PropertyDetails = ({ property }: { property: Properties }) => {
  const { customerId } = useParams();
  return (
    <NavLink
      to={`/customers/${customerId}/properties/${property.id}`}
      className={({ isActive }) =>
        cn(
          " w-full hover:bg-gray-100 py-4 px-4 rounded-lg border transition-all gap-4",
          isActive && "w-full bg-gray-50 border-black hover:bg-gray-100 "
        )
      }
    >
      <div className="flex w-full flex-col gap-2">
        <div className="flex items-center ">
          <div className="flex items-center  gap-2 ">
            <div className="py-2 text-xs">
              {property.addressLine1} {property.addressLine2}{" "}
              {property.barangay} {property.city}
            </div>
            <span className="flex h-2 w-2 rounded-full bg-blue-600"></span>
          </div>
          <div className="ml-auto text-xs text-foreground">
            {formatDistanceToNow(new Date(property.createdAt), {
              addSuffix: true,
            })}
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Badge variant={"outline"}>Lot Size: {property.lotSize}</Badge>
        <Badge variant={"outline"}>
          Assessed Value: {property.assessedValue}
        </Badge>
        <Badge variant={"outline"}>Status: {property.status}</Badge>
      </div>
    </NavLink>
  );
};

export default function CustomerDetails() {
  const { customer } = useLoaderData();
  const navigation = useNavigation();
  const navigate = useNavigate();

  return (
    <div className="w-full space-y-8">
      <div className=" border-b-2">
        <div className="px-4 py-5 sm:px-6 gap-y-7">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Customer Details
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            This is some information about the user.
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <UserDetailsFields
              fieldName="First Name"
              fieldValue={customer.firstName}
            />
            <UserDetailsFields
              fieldName="Last Name"
              fieldValue={customer.lastName}
            />
            <UserDetailsFields
              fieldName="Created At"
              fieldValue={customer.createdAt}
            />
            <UserDetailsFields
              fieldName="Updated At"
              fieldValue={customer.updatedAt}
            />
          </dl>
        </div>
      </div>
      <div className="flex">
        <div className="w-1/3 border rounded-sm py-2">
          <p className="text-sm text-muted-foreground px-6">Owned Properties</p>
          <ScrollArea className="p-4 w-full">
            <div className="w-full flex items-center justify-center py-6">
              <Button
                variant={"outline"}
                onClick={() => {
                  navigate(`/customers/${customer.id}/properties/new`);
                }}
              >
                <PlusIcon className="h-4 w-4" />
                Add Property
              </Button>
            </div>
            <div>
              {customer.properties && customer?.properties.length > 0 && (
                <div className="w-full flex flex-col gap-y-2">
                  {customer?.properties.map((property: Properties) => (
                    <PropertyDetails property={property} />
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
        <div className="w-2/3 p-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

const UserDetailsFields = ({
  fieldName,
  fieldValue,
}: {
  fieldName: string;
  fieldValue: string;
}) => {
  return (
    <div className="py-2 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
      <dt className="text-sm font-medium text-gray-500">{fieldName}</dt>
      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        {fieldValue}
      </dd>
    </div>
  );
};

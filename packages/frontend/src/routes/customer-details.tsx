import { getCustomerById, getCustomerProperties } from "@/api/customers";
import { Properties } from "@/components/DataEditor/Context/types";
import { cn, formatDte } from "@/lib/utils";
import { ScrollArea } from "@/registry/new-york/ui/scroll-area";
import { Badge } from "@/registry/new-york/ui/badge";
import { Button } from "@/registry/new-york/ui/button";
import { formatDistanceToNow } from "date-fns";
import { PlusIcon } from "lucide-react";
import {
  NavLink,
  Outlet,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom";
import { PropertyList } from "@/components/property/PropertyList";

export async function loader({ params }: { params: any }) {
  const customer = await getCustomerById(params.customerId);
  const customerProperties = await getCustomerProperties(params.customerId);
  return { customer, customerProperties };
}

export default function CustomerDetails() {
  const { customer, customerProperties } = useLoaderData();
  const navigate = useNavigate();

  return (
    <div className="w-full space-y-2 min-h-screen">
      <div className=" border-b-2 border-gray-400">
        <div className="px-4 py-5 sm:px-6 gap-y-7">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Customer Details
          </h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200  flex-col grid grid-cols-3">
            <UserDetailsFields
              fieldName="First Name"
              fieldValue={customer.firstName}
            />
            <UserDetailsFields
              fieldName="Last Name"
              fieldValue={customer.lastName}
            />
            <UserDetailsFields
              fieldName="Status"
              fieldValue={customer.status}
            />
            <UserDetailsFields
              fieldName="Created At"
              fieldValue={formatDte(customer.createdAt)}
            />
            <UserDetailsFields
              fieldName="Updated At"
              fieldValue={formatDte(customer.updatedAt)}
            />
          </dl>
        </div>
      </div>
      <div className="flex p-2">
        <PropertyList
          customerId={customer.id}
          properties={customerProperties}
        />
        <div className="w-2/3  min-h-screen ">
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
    <div className="py-1 sm:py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
      <dt className="text-sm font-medium text-gray-500">{fieldName}</dt>
      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        {fieldValue}
      </dd>
    </div>
  );
};

import { getCustomerById, getCustomerProperties } from "@/api/customers";
import { formatDte } from "@/lib/utils";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { PropertyList } from "@/components/property/PropertyList";
import { ActionToolbar } from "@/components/customers/ActionToolbar";
import { TooltipProvider } from "@/registry/new-york/ui/tooltip";

export async function loader({ params, request }: { params: any }) {
  const customer = await getCustomerById(params.customerId);
  const status = new URL(request.url).searchParams.get("property_status");
  const customerProperties = await getCustomerProperties(
    params.customerId,
    status
  );
  return { customer, customerProperties };
}

export default function CustomerDetails() {
  const { customer, customerProperties } = useLoaderData();
  const navigate = useNavigate();

  return (
    <div className="w-full space-y-2 min-h-screen">
      <TooltipProvider>
        <div className=" border-b-2 border-gray-400">
          <ActionToolbar />
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
      </TooltipProvider>
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

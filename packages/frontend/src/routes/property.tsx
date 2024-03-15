import { getPropertyById } from "@/api/property";
import { useLoaderData } from "react-router-dom";
import * as dateFns from "date-fns";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/registry/new-york/ui/tabs";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Search } from "lucide-react";
export async function loader({ params }: { params: any }) {
  const property = await getPropertyById(params.propertyId);
  return { property };
}

type LoaderData = {
  property: any; // Replace 'any' with the actual type of 'property'
};

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

export default function PropertyDetails() {
  const { property } = useLoaderData(); // Add type annotation for useLoaderData
  return (
    <div className="flex flex-col space-y-2">
      <div>
        <Tabs defaultValue="all">
          <div className="flex items-center px-4 py-2">
            <p className="text-sm text-muted-foreground">Property Details</p>
            <TabsList className="ml-auto">
              <TabsTrigger
                value="all"
                className="text-zinc-600 dark:text-zinc-200"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="unread"
                className="text-zinc-600 dark:text-zinc-200"
              >
                Payment History
              </TabsTrigger>
            </TabsList>
          </div>
          <Separator />

          <TabsContent value="all" className="m-0">
            <div className="border-t border-gray-200 px-4 py-10 sm:p-0 border-b ">
              <dl className="sm:divide-y sm:divide-gray-200 grid grid-cols-2 ">
                <UserDetailsFields
                  fieldName="Address Line 1"
                  fieldValue={property.addressLine1}
                />
                <UserDetailsFields
                  fieldName="Address Line 2"
                  fieldValue={property.addressLine2}
                />
                <UserDetailsFields
                  fieldName="Barangay"
                  fieldValue={property.barangay}
                />
                <UserDetailsFields
                  fieldName="City"
                  fieldValue={property.city}
                />
                <UserDetailsFields
                  fieldName="Created At"
                  fieldValue={dateFns.format(
                    property.createdAt,
                    "dd MMMM yyyy h:mm a"
                  )}
                />
                <UserDetailsFields
                  fieldName="Updated At"
                  fieldValue={dateFns.format(
                    property.updatedAt,
                    "dd MMMM yyyy h:mm a"
                  )}
                />
              </dl>
            </div>
          </TabsContent>
          <TabsContent value="unread" className="m-0"></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

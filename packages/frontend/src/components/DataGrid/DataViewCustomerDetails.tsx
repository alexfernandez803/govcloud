import { ScrollArea } from "@/registry/new-york/ui/scroll-area";
import { useDataEditor } from "../DataEditor/Context";
import { Link } from "react-router-dom";
const FieldDetails = ({
  label,
  value,
}: {
  label: string;
  value: string | number | undefined | null;
}) => {
  return (
    <div className="flex flex-col ">
      <div className="text-sm font-semibold">{label}</div>
      <div className="text-sm text-muted-foreground">{value}</div>
    </div>
  );
};

const FieldDetailsKey = ({
  label,
  value,
}: {
  label: string;
  value: string | number | undefined | null;
}) => {
  return (
    <div className=" flex flex-row items-center">
      <div className="text-sm font-semibold w-1/3">{label}</div>
      <div className="text-sm text-muted-foreground">{value}</div>
    </div>
  );
};

const formatFieldName = (key: string) => {
  // Convert camelCase to space-separated words
  const words = key.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ");
  // Capitalize the first letter of each word
  const formattedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  // Join the words with spaces
  return formattedWords.join(" ");
};

interface Properties {
  [key: string]: string | number | undefined | null;
}

const PropertyDetails = ({ property }: { property: Properties }) => {
  return (
    <Link
      className=" p-4 rounded-lg space-y-2 border border-gray-800 bg-gray-100 hover:bg-gray-200 transition-all"
      to={`/properties/${property.id}`}
    >
      {[
        "addressLine1",
        "addressLine2",
        "barangay",
        "city",
        "assessedValue",
        "lotSize",
        "status",
        "description",
      ].map((key) => {
        if (key === "id") return null;
        return (
          <FieldDetailsKey label={formatFieldName(key)} value={property[key]} />
        );
      })}
    </Link>
  );
};

export default function DataViewCustomerDetails() {
  const { dataEditor } = useDataEditor();
  const { selectedRecord } = dataEditor.interfaceState;

  if (!dataEditor.interfaceState.selectedRecord) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">No records found</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-screen ">
      <div className="flex flex-row space-x-4 ">
        <div className="w-1/4 flex-1 h-full">
          <div className="w-full h-full space-y-6">
            <div>
              <h3 className="text-lg font-medium">Customer Details</h3>
            </div>
            <div
              role="none"
              className="shrink-0 bg-border h-[1px] w-full"
            ></div>
            <div className="flex flex-col space-y-2">
              <div className="grid grid-cols-2 gap-2 p-2 pt-0">
                <FieldDetails
                  label="First Name"
                  value={selectedRecord?.firstName}
                />
                <FieldDetails
                  label="Last Name"
                  value={selectedRecord?.lastName}
                />
              </div>
              <div className="grid grid-cols-2 gap-2 p-2 pt-0">
                <FieldDetails
                  label="Created At"
                  value={selectedRecord?.createdAt}
                />
                <FieldDetails
                  label="Updated At"
                  value={selectedRecord?.updatedAt}
                />
              </div>
              <div className="p-2">
                <h4 className="text font-medium">Owned Properties</h4>
              </div>

              {selectedRecord?.properties &&
                selectedRecord?.properties.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 p-2 pt-0 ">
                    {selectedRecord?.properties.map((property: Properties) => (
                      <PropertyDetails property={property} />
                    ))}
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}

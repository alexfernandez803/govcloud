import { FacetedFilter } from "./FacetedFilter";

export function CustomerFilters() {
  return (
    <div className="flex px-4 py-2 flex-col bg-slate-100 border rounded-sm">
      <div className="p-1">
        <p className="text-xs font-bold">Filters</p>
      </div>
      <div className="space-x-2">
        <FacetedFilter
          title="Fields"
          options={[
            { label: "All", value: "*" },
            { label: "First Name", value: "firstName" },
            { label: "Last Name", value: "lastName" },
          ]}
        />
        <FacetedFilter
          title="Status"
          options={[
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
          ]}
        />
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { useDataEditor } from "../Context";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Toolbar() {
  const { fetchData, toggleAdd, setFilter, dataEditor } = useDataEditor();

  return (
    <div className="flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
      <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-1/2">
        <form>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              className="pl-8 w-full"
              onChange={(event) => setFilter(event.target.value)}
              value={dataEditor.interfaceState.filter}
            />
          </div>
        </form>
      </div>
      <div className="ml-auto flex w-full space-x-2 sm:justify-end">
        <div className="hidden space-x-2 md:flex">
          <Button
            onClick={() => toggleAdd()}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2"
            type="button"
          >
            Add
          </Button>
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2"
            onClick={() => fetchData()} // Update the onClick event handler to match the expected type
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
}

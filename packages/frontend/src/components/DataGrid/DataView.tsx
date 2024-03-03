import React from "react";
import { useDataEditor } from "../DataEditor/Context";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { LandPlot } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "../ui/button";

export default function DataView() {
  const { fetchData, dataEditor, setSelectedRecord } = useDataEditor();

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-2 p-2 pt-0">
      {dataEditor.apiData.map((item) => (
        <button
          key={item.id}
          className={cn(
            "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
            dataEditor.interfaceState.selectedRecord?.id === item.id &&
              "bg-muted"
          )}
          onClick={() => setSelectedRecord(item)}
        >
          <div className="flex w-full flex-col ">
            <div className="flex items-center">
              <div className="flex items-center gap-4 text-sm">
                <Avatar>
                  <AvatarImage alt={`${item.firstName} ${item.lastName}`} />
                  <AvatarFallback>
                    {item.firstName.substring(0, 1) +
                      item.lastName.substring(0, 1)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="font-semibold">
                    {item.firstName} {item.lastName}
                  </div>
                </div>
              </div>

              <div
                className={cn(
                  "ml-auto text-xs",
                  dataEditor.interfaceState.selectedRecord?.id === item.id
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {formatDistanceToNow(new Date(item.updatedAt), {
                  addSuffix: true,
                })}
              </div>
            </div>
            <div className="flex items-start space-x-4 rounded-md  p-2 text-accent-foreground transition-all">
              <div className="space-y-1 flex space-x-4">
                <LandPlot />
                <p className="text-sm  leading-none flex items-center space-x-2">
                  <Badge>{item.properties && item.properties.length}</Badge>
                  <span> Owned Properties</span>
                </p>
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

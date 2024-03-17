import { Archive, Trash2 } from "lucide-react";

import { Button } from "@/registry/new-york/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/new-york/ui/tooltip";
import { useParams, useRevalidator } from "react-router-dom";
import { Status } from "@/lib/types";
import { updateStatus } from "@/api/customers";
export function ActionToolbar() {
  const revalidator = useRevalidator();

  const { customerId } = useParams();

  async function handleChangeStatus(status: Status) {
    if (!customerId) return;
    try {
      await updateStatus(customerId, status);
      revalidator.revalidate();
    } catch (error) {}
  }

  return (
    <div className="flex items-center space-x-2 w-full">
      <div className="w-1/2">
        <p className="text-sm text-muted-foreground pl-6">Customer Details</p>
      </div>
      <div className="flex items-center gap-2 justify-end w-1/2">
        <div className="flex items-center p-2 ">
          <div className="flex items-center gap-2  bg-gray-100 rounded-md">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleChangeStatus("archived")}
                >
                  <Archive className="h-4 w-4" />
                  <span className="sr-only">Archive</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Archive</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleChangeStatus("inactive")}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Move to trash</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Move to trash</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}

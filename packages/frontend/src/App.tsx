import { z } from "zod";
import { Outlet, Link } from "react-router-dom";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { UserNav } from "./components/user-nav";
import { taskSchema } from "./data/schema";
import data from "./data/tasks.json";
import DataEditor from "./components/DataEditor";
// Simulate a database read for tasks.
function getTasks() {
  const tasks = data;

  return z.array(taskSchema).parse(tasks);
}

export default function TaskPage() {
  const tasks = getTasks();

  return (
    <>
      <div className="md:hidden"></div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground"></p>
          </div>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>
        <DataEditor />
      </div>
    </>
  );
}

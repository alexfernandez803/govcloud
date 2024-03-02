import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/registry/default/ui/use-toast";
import { useDataEditor } from "../Context";
import { CustomerType } from "../Context/types";

const FormSchema = z.object({
  firstName: z.string().min(2, {
    message: "firstName must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "lastName must be at least 2 characters.",
  }),
});

export default function CreateRecord() {
  const { toggleAdd, createRecord } = useDataEditor();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    createRecord(data);
    form.reset();
  }

  const reset = () => {
    form.reset();
    toggleAdd();
  };
  return (
    <div className="w-1/3  border h-full ounded-2xl">
      <div className=" p-4 space-y-6">
        <div>
          <h3 className="text-lg font-medium">Create Customer Record</h3>
          <p className="text-sm text-muted-foreground">
            Create initial customer records.
          </p>
        </div>
        <div role="none" className="shrink-0 bg-border h-[1px] w-full"></div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 h-full"
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormDescription>
                    The firstName of the customer.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormDescription>
                    The lastName of the customer.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-4">
              <Button type="submit">Submit</Button>
              <Button type="button" onClick={reset}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

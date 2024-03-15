"use client";

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
import { Input } from "@/registry/new-york/ui/input";
import { Textarea } from "@/registry/new-york/ui/textarea";
import { ScrollArea } from "@/registry/new-york/ui/scroll-area";
import { toast } from "@/registry/new-york/ui/use-toast";
import React from "react";

const formSchema = z.object({
  addressLine1: z.string().min(2, {
    message: "addressLine1 must be at least 2 characters.",
  }),
  addressLine2: z.string().min(0, {
    message: "addressLine2 must be at least 2 characters.",
  }),
  barangay: z.string().min(2, {
    message: "barangay must be at least 2 characters.",
  }),
  city: z.string().min(2, {
    message: "city must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "description must be at least 2 characters.",
  }),
  lotSize: z.coerce.number().int().positive().min(1, {
    message: "description must be at least 2 characters.",
  }),
  assessedValue: z.coerce.number().int().positive().min(1, {
    message: "assessedValue must be at least 2 characters.",
  }),
});

export function PropertyForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      addressLine1: "",
      addressLine2: "",
      barangay: "",
      city: "",
      description: "",
      lotSize: 0,
      assessedValue: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
  }

  function onClear() {
    form.reset();
  }
  React.useEffect(() => {
    form.setFocus("addressLine1");
  }, [form.setFocus]);

  return (
    <div className="w-full px-8">
      <ScrollArea className=" ">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="w-4/6 flex-col items-center justify-center  ">
            <div className="flex flex-col space-y-1.5 p-4 pb-3">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">
                Create a new Property
              </h3>
            </div>
            <Form {...form}>
              <form
                {...form}
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2 p-4 bg-white  w-full"
              >
                <FormField
                  control={form.control}
                  name="addressLine1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Line 1</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="addressLine2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Line 2</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="barangay"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Barangay</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} className="w-1/2" />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lotSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lot Size</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="assessedValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assessed Value</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="py-4 flex space-x-4 justify-end">
                  <Button className="w-32" type="submit">
                    Submit
                  </Button>
                  <Button
                    variant={"outline"}
                    type="button"
                    className="w-32"
                    onClick={onClear}
                  >
                    Clear
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

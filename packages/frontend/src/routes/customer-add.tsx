"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/registry/new-york/ui/input";
import { ScrollArea } from "@/registry/new-york/ui/scroll-area";
import { toast } from "@/registry/new-york/ui/use-toast";
import React from "react";
import { createProperty } from "@/api/property";
import { useRevalidator, useNavigate } from "react-router-dom";
import { createCustomer } from "@/api/customers";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "firstName must be at least 2 characters.",
  }),
  lastName: z.string().min(0, {
    message: "lastName must be at least 2 characters.",
  }),
});

export function CustomerForm() {
  const navigate = useNavigate();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  let revalidator = useRevalidator();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // 2. Submit the form
      await createCustomer(values);
      toast({
        title: "You submitted the following values:",
      });

      form.reset();
      revalidator.revalidate();
    } catch (error) {
      // 3. Handle any errors
      toast({
        title: "Something went wrong",
        description: error.message,
      });
    }
  }

  function onClear() {
    form.reset();
  }

  function onCancel() {
    navigate(`/customers`);
  }
  React.useEffect(() => {
    form.setFocus("firstName");
  }, [form.setFocus]);

  return (
    <div className="w-full px-8">
      <ScrollArea className=" ">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="w-4/6 flex-col items-center justify-center  ">
            <div className="flex flex-col space-y-1.5 p-4 pb-3">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">
                Create a new Customer
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
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>

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
                        <Input placeholder="" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="py-4 flex space-x-2 justify-end">
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
                  <Button
                    variant={"outline"}
                    type="button"
                    className="w-32"
                    onClick={onCancel}
                  >
                    Cancel
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

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
import { Textarea } from "@/registry/new-york/ui/textarea";
import { ScrollArea } from "@/registry/new-york/ui/scroll-area";
import { toast } from "@/registry/new-york/ui/use-toast";
import React from "react";
import { createProperty } from "@/api/property";
import { useParams, useRevalidator, useNavigate } from "react-router-dom";
import { Save } from "lucide-react";

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
  remarks: z.string().min(2, {
    message: "description must be at least 2 characters.",
  }),
  lotSize: z.coerce.number().int().positive().min(1, {
    message: "lotSize must be more  than 1.",
  }),
  assessedValue: z.coerce.number().int().positive().min(1, {
    message: "assessedValue must be at least 2 characters.",
  }),
});

export function PropertyForm() {
  const { customerId } = useParams();
  const navigate = useNavigate();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      addressLine1: "",
      addressLine2: "",
      barangay: "",
      city: "",
      remarks: "",
      description: "",
      lotSize: 0,
      assessedValue: 0,
    },
  });

  let revalidator = useRevalidator();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!customerId) return;
    try {
      // 2. Submit the form
      const property = await createProperty(customerId, values);
      toast({
        title: "Record successfully created",
      });

      navigate(`/customers/${customerId}/properties/${property.id}`, {
        replace: true,
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
    navigate(`/customers/${customerId}`);
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
                        <Input placeholder="" {...field} className=" w-full" />
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
                        <Input placeholder="" {...field} className=" w-full" />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex w-full space-x-4 ">
                  <FormField
                    control={form.control}
                    name="barangay"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Barangay</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} className="w-64" />
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
                          <Input placeholder="" {...field} className="w-64" />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder=""
                          {...field}
                          className=" w-full"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="remarks"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Remarks</FormLabel>
                      <FormControl>
                        <Textarea placeholder="" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-between">
                  <FormField
                    control={form.control}
                    name="lotSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lot Size(sqm.)</FormLabel>
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
                </div>
                <div className="py-4 flex space-x-2 justify-end">
                  <Button className="w-32 space-x-2" type="submit">
                    <Save></Save> <span>Save</span>
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

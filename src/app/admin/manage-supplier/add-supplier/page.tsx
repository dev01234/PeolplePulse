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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import api from "@/lib/axiosInstance";

// Schema validation
const formSchema = z.object({
  supplierName: z.string().min(1, "Supplier name is required."),
  contactInfo: z
    .string()
    .regex(/^[\d-+\s]+$/, "Contact info must be valid.")
    .min(1, "Contact info is required."),
  pan: z.string().min(10, "PAN must be 10 characters.").max(10, "PAN must be 10 characters."),
  gst: z.string().min(15, "GST must be 15 characters.").max(15, "GST must be 15 characters."),
  paymentTerm: z
  .string()
  .refine(
    (value) => ["Monthly", "Quarterly", "HalfYearly", "Yearly"].includes(value),
    { message: "Invalid payment term" }
  ),
status: z
  .string()
  .refine((value) => ["Active", "Inactive"].includes(value), {
    message: "Invalid status",
  }),
});

const AddSupplier = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      supplierName: "",
      contactInfo: "",
      pan: "",
      gst: "",
      paymentTerm: "Monthly",
      status: "Active",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Form Submitted", values);
    try {
      const res = await api.post("/supplier", values);
      console.log(res.data);
      form.reset();
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <div className="m-16 p-4 bg-white dark:bg-[#17171A]">
      <h1 className="text-2xl mb-6">Add Supplier</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-3/5">
          {/* Supplier Name Field */}
          <FormField
            control={form.control}
            name="supplierName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Supplier Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter supplier name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Contact Info Field */}
          <FormField
            control={form.control}
            name="contactInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Info</FormLabel>
                <FormControl>
                  <Input placeholder="Enter contact info (e.g., phone or email)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* PAN Field */}
          <FormField
            control={form.control}
            name="pan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PAN</FormLabel>
                <FormControl>
                  <Input placeholder="Enter PAN (10 characters)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* GST Field */}
          <FormField
            control={form.control}
            name="gst"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GST</FormLabel>
                <FormControl>
                  <Input placeholder="Enter GST (15 characters)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Payment Term Field */}
          <FormField
            control={form.control}
            name="paymentTerm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Term</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment term" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                    <SelectItem value="Quarterly">Quarterly</SelectItem>
                    <SelectItem value="HalfYearly">Half-Yearly</SelectItem>
                    <SelectItem value="Yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status Field */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Add Supplier</Button>
        </form>
      </Form>
    </div>
  );
};

export default AddSupplier;

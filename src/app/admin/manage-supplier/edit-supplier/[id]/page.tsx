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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import api from "@/lib/axiosInstance";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Define the schema
const formSchema = z.object({
  supplierName: z.string().min(1, "Supplier name is required."),
  contactInfo: z.string().min(1, "Contact information is required."),
  pan: z.string().min(1, "PAN is required."),
  gst: z.string().min(1, "GST is required."),
  paymentTerm: z.string().min(1, "Payment term is required."),
  status: z.string().min(1, "Status is required."),
});

const EditSupplier = () => {
  const params = useParams<{ id: string }>();
  const [supplier, setSupplier] = useState();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      supplierName: "",
      contactInfo: "",
      pan: "",
      gst: "",
      paymentTerm: "",
      status: "",
    },
  });

  const { reset } = form;

  // Fetch supplier data and reset form values
  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await api.get(`/Supplier/${params.id}`);
        const supplierData = response.data;
        setSupplier(supplierData);

        // Reset form values
        reset({
          supplierName: supplierData.supplierName,
          contactInfo: supplierData.contactInfo,
          pan: supplierData.pan,
          gst: supplierData.gst,
          paymentTerm: supplierData.paymentTerm,
          status: supplierData.status,
        });
      } catch (error) {
        console.error("Error fetching supplier:", error);
      }
    };

    if (params?.id) fetchSupplier();
  }, [params?.id, reset]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const updatedSupplier = {
        ...(supplier || {}),
        ...values,
      };

      const response = await api.put(`/Supplier/${params.id}`, updatedSupplier);
      console.log("Supplier updated:", response.data);
      router.push("/admin/manage-supplier");
    } catch (error) {
      console.error("Error updating supplier:", error);
    }
  };

  return (
    <div className="m-16 p-4 bg-white dark:bg-[#17171A]">
      <h1 className="text-2xl mb-6">Edit Supplier</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-3/5">
          {/* Supplier Name */}
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

          {/* Contact Info */}
          <FormField
            control={form.control}
            name="contactInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Info</FormLabel>
                <FormControl>
                  <Input placeholder="Enter contact info" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* PAN */}
          <FormField
            control={form.control}
            name="pan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PAN</FormLabel>
                <FormControl>
                  <Input placeholder="Enter PAN" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* GST */}
          <FormField
            control={form.control}
            name="gst"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GST</FormLabel>
                <FormControl>
                  <Input placeholder="Enter GST" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Payment Term */}
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
                    <SelectItem value="HalfYearly">Half Yearly</SelectItem>
                    <SelectItem value="Yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status */}
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

          <Button type="submit">Save Changes</Button>
        </form>
      </Form>
    </div>
  );
};

export default EditSupplier;

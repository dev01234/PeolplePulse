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
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import api from "@/lib/axiosInstance";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
 
const formSchema = z.object({
  firstName: z.string().min(1, "First name is required."),
  lastName: z.string().min(1, "Last name is required."),
  email: z.string().email("Invalid email address."),
  phone: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be 10 digits."),
  jobTitle: z.string().min(1, "Job title is required."),
  hireDate: z.date({ required_error: "Hire date is required." }),
  status: z.string({
    required_error: "Please select an email to display.",
  }),
  departmentID: z.number(),
  managerID: z.number()
});
 
const AddResource = () => {
  const params = useParams<{ id: string }>();
  const [user, setUser] = useState();
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      jobTitle: "",
      hireDate: new Date(),
      status: "",
      departmentID: 1,
      managerID: 1
    },
  });
  
  const { reset } = form;

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await api.get(`/Resource/${params.id}`);
        const userData = response.data;
        setUser(userData);
        console.log(userData)
        // Update the form values once the user data is fetched
        reset({
            firstName: userData.firstName ,
            lastName: userData.lastName ,
            email: userData.email ,
            phone: userData.phone ,
            jobTitle: userData.jobTitle ,
            hireDate: userData?.hireDate ? new Date(userData.hireDate) : new Date() ,
            status: userData?.status ,
            departmentID: userData.departmentID,
            managerID: userData.managerID 
        });
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };
    if (params?.id) fetchCurrentUser();
}, [params?.id, reset]);
 
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Form Submitted", values);
    const updatedUser = {
      ...(user || {}), // Use existing user data or fallback to an empty object
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      jobTitle: values.jobTitle,
      hireDate: values.hireDate,
      status: values.status,
      departmentID: values.departmentID,
      managerID: values.managerID,
    };
    try {
      const res = await api.put(`/Resource/${params.id}`,updatedUser) 
      console.log(res.data)
      form.reset();
      router.push('/admin/manage-resource')
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };
 
  return (
    <div className="m-16 p-4 bg-white dark:bg-[#17171A]">
      <h1 className="text-2xl mb-6">Register Resource</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-3/5">
          {/* First Name Field */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
 
          {/* Last Name Field */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
 
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
 
          {/* Phone Field */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Enter phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
 
          {/* Job Title Field */}
          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter job title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
 
          {/* Hire Date Field */}
          <FormField
            control={form.control}
            name="hireDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Hire Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>Select the hire date.</FormDescription>
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
                    <SelectItem value="Not Started">Not Started</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
 
          {/* managerID */}
          <FormField
            control={form.control}
            name="managerID"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Manager</FormLabel>
                <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={field.value?.toString()} >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Manish</SelectItem>
                    <SelectItem value="2">RK</SelectItem>
                    <SelectItem value="3">Poorna</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
 
          {/*CLientID*/}
          <FormField
            control={form.control}
            name="departmentID"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select CLient</FormLabel>
                <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={field.value?.toString()} >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">CBRE</SelectItem>
                    <SelectItem value="2">HP</SelectItem>
                    <SelectItem value="3">VIalto</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Register</Button>
        </form>
      </Form>
    </div>
  );
};
 
export default AddResource;
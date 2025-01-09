'use client'
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
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/axiosInstance";
import { useEffect, useState } from "react";

const formSchema = z.object({
  projectName: z.string().min(6, {
    message: "Username must be at least 6 characters.",
  }),
  startDate: z.date({
    required_error: "A date of birth is required.",
  }),
  endDate: z.date({
    required_error: "A date of birth is required.",
  }),
  status: z.string({
    required_error: "Please select an email to display.",
  }),
});
const page = () => {
  const params = useParams<{ id: string }>();
  const [user, setUser] = useState();
  const router = useRouter()
  console.log(params.id);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      startDate: new Date(),
      endDate: new Date(),
      status: "Active",
    },
  });

  const { reset } = form;

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await api.get(`/Project/${params.id}`);
        const userData = response.data;
        setUser(userData);
        console.log(userData.startDate)
        // Update the form values once the user data is fetched
        reset({
          projectName: userData?.projectName || "",
          startDate: userData?.startDate ? new Date(userData.startDate) : new Date(),
          endDate: userData?.endDate ? new Date(userData.endDate) : new Date(),
          status: userData?.status,
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
      ...(user || {}), // Fallback to an empty object if user is undefined
      projectName: values.projectName,
      startDate: values.startDate,
      endDate: values.endDate,
      status: values.status,
    };

    try {
      const res = await api.put(`/Project/${params.id}`, updatedUser)
      console.log(res.data)
      form.reset();
      router.push('/admin/manage-project')
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <div className="m-16 p-4 bg-white dark:bg-[#17171A]">
      <h1 className="text-2xl mb-6">Edit Project</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-3/5"
        >
          {/* Username Field */}
          <FormField
            control={form.control}
            name="projectName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Password Field */}

          <p>Project Name start date end date</p>
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Starting Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
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
                <FormDescription>
                  Select a starting date for the project.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Ending Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
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
                <FormDescription>
                  Select a starting date for the project.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Not Started">Not Started</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select the status of the project{" "}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Register</Button>
        </form>
      </Form>
    </div>
  )
}

export default page
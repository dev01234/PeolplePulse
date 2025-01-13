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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

// Schema validation
const formSchema = z.object({
  resource: z.string().min(1, "Please select a resource."),
});

const Timesheet = () => {
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resource: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Selected Resource:", values.resource);
    router.push(`/admin/timesheet/${values.resource}`)
  };

  return (
    <div className='p-16'>
       <div className="p-4 bg-white dark:bg-[#17171A]">
      <h1 className="text-2xl mb-6">Select Resource</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-3/5">
          {/* Resource Selection */}
          <FormField
            control={form.control}
            name="resource"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resource</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a resource" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Poornachandra">Poornachandra</SelectItem>
                    <SelectItem value="DEVANJAN">Devanjan</SelectItem>
                    <SelectItem value="Durgaprasad">Durgaprasad</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>

    </div>
  )
}

export default Timesheet
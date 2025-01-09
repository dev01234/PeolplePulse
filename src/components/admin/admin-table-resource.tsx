"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import AdminSearchUserInput from "./admin-search-user-input";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axiosInstance";
import DeleteProject from "./delete-project";
import { CloudCog } from "lucide-react";
import { Console } from "console";

interface RowType {
  resourceID: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobTitle: string;
  hireDate: string;
  status: string;
}

const AdminTableResource = () => {
  const router = useRouter();
  const [data, setData] = useState<RowType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchResources = async () => {
      try {
        // Example API call to fetch data
        const response = await api.get("/Resource");
        console.log(response)
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchResources();
  }, []);

  const handleEdit = (id: string) => {
    router.push(`/admin/manage-resource/edit-resource/${id}`);
  };

  const handleDeleteUser = (id: string) => {
    setData((prevData) =>
      prevData.map((user) =>
        user.resourceID === id ? { ...user, status: "Inactive" } : user
      )
    );
    console.log(`User with ID ${id} has been set to not active.`);
  };

  const filteredData = data.filter(
    (row) =>
      row.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (data.length === 0) {
    return <p>Fetching data...</p>;
  }

  return (
    <>
      <div className="bg-white dark:bg-[#17171A] py-8 px-16 flex justify-between items-center rounded-sm">
        <p className="text-2xl font-normal">Resource List</p>
        <AdminSearchUserInput onSearch={setSearchTerm} />
      </div>
      <Table className="px-16">
        <TableCaption>A list of Resources</TableCaption>
        <TableHeader className="text-gray-600 bg-gray-300 dark:bg-gray-700">
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-10">No</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Job Title</TableHead>
            <TableHead>Hire Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="dark:bg-inherit dark:text-black">
          {filteredData.map((row: RowType, index) => (
            <TableRow key={row.resourceID}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{row.firstName}</TableCell>
              <TableCell>{row.lastName}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell>{row.jobTitle}</TableCell>
              <TableCell>{row.hireDate}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell className="text-right flex gap-x-2 justify-end">
                <DeleteProject id={row.resourceID} onDelete={handleDeleteUser} type="resource"  disabled={row.status === "Inactive"}/>
                <Button
                  className="bg-blue-500"
                  variant="default"
                  onClick={() => handleEdit(row.resourceID)}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default AdminTableResource;

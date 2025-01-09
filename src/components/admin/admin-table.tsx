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
// import api from "@/lib/axiosInstance";
// import DeleteUser from "./delete-user";
import { useRouter } from "next/navigation";
import api from "@/lib/axiosInstance";
import DeleteProject from "./delete-project";

interface RowType {
  projectID: string;
  projectName: string;
  status: string;
  startDate: string;
  endDate: string;
}

const AdminTable = () => {
  const router = useRouter();
  const [data, setData] = useState<RowType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await api.get("/Project");
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };
    fetchProject();
  },[])

  const handleEdit = (id: any) => {
    router.push(`/admin/manage-project/edit-project/${id}`);
  };

  const handleDeleteUser = async (id: string) => {
  
      // Update the local state to reflect the change
      setData((prevData) =>
        prevData.map((user) =>
          user.projectID === id ? { ...user, status: "Inactive" } : user
        )
      );
      console.log(`User with ID ${id} has been set to not active.`);
  
  };

  const filteredData = data.filter((row) =>
    row.projectName.toLowerCase().includes(searchTerm.toLowerCase())
  );


  if(data.length === 0) {
    return <p>Fetching data</p>
  }

  return (
    <>
      <div className="bg-white dark:bg-[#17171A] py-8 px-16 flex justify-between items-center rounded-sm">
        <p className="text-2xl font-normal">Project List</p>
        <AdminSearchUserInput onSearch={setSearchTerm} />
      </div>
      <Table className="px-16">
        <TableCaption>A list of Users</TableCaption>
        <TableHeader className="text-gray-600 bg-gray-300 dark:bg-gray-700">
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-10">No</TableHead>
            <TableHead>Project Name</TableHead>
            <TableHead>Starting Date</TableHead>
            <TableHead>Ending Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="dark:bg-inherit dark:text-black">
          {filteredData.map((row: RowType, index) => (
            <TableRow key={row.projectID}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="">{row.projectName}</TableCell>
              <TableCell>{row.startDate}</TableCell>
              <TableCell>{row.endDate}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell className="text-right flex gap-x-2 justify-end">
                <DeleteProject id={row.projectID}  onDelete={handleDeleteUser} type='project'  disabled={row.status === "Inactive"}/>
                <Button
                  className=" bg-blue-500"
                  variant="default"
                  onClick={() => handleEdit(row.projectID)}
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

export default AdminTable;

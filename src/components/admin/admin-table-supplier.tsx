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

interface SupplierRow {
  supplierID: string;
  supplierName: string;
  contactInfo: string;
  pan: string;
  gst: string;
  paymentTerm: string;
  status: string;
}

const AdminTableSupplier = () => {
  const router = useRouter();
  const [data, setData] = useState<SupplierRow[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await api.get("/Supplier");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };
    fetchSuppliers();
  }, []);

  const handleEdit = (id: string) => {
    router.push(`/admin/manage-supplier/edit-supplier/${id}`);
  };

  const handleDeleteSupplier = (id: string) => {
    setData((prevData) =>
      prevData.map((supplier) =>
        supplier.supplierID === id ? { ...supplier, status: "Inactive" } : supplier
      )
    );
    console.log(`Supplier with ID ${id} has been set to inactive.`);
  };

  const filteredData = data.filter(
    (row) =>
      row.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.contactInfo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.pan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.gst.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (data.length === 0) {
    return <p>Fetching data...</p>;
  }

  return (
    <>
      <div className="bg-white dark:bg-[#17171A] py-8 px-16 flex justify-between items-center rounded-sm">
        <p className="text-2xl font-normal">Supplier List</p>
        <AdminSearchUserInput onSearch={setSearchTerm} />
      </div>
      <Table className="px-16">
        <TableCaption>A list of Suppliers</TableCaption>
        <TableHeader className="text-gray-600 bg-gray-300 dark:bg-gray-700">
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-10">No</TableHead>
            <TableHead>Supplier Name</TableHead>
            <TableHead>Contact Info</TableHead>
            <TableHead>PAN</TableHead>
            <TableHead>GST</TableHead>
            <TableHead>Payment Term</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="dark:bg-inherit dark:text-black">
          {filteredData.map((row: SupplierRow, index) => (
            <TableRow key={row.supplierID}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{row.supplierName}</TableCell>
              <TableCell>{row.contactInfo}</TableCell>
              <TableCell>{row.pan}</TableCell>
              <TableCell>{row.gst}</TableCell>
              <TableCell>{row.paymentTerm}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell className="text-right flex gap-x-2 justify-end">
                <DeleteProject
                  id={row.supplierID}
                  onDelete={handleDeleteSupplier}
                  type="supplier"
                  disabled={row.status === "Inactive"}
                />
                <Button
                  className="bg-blue-500"
                  variant="default"
                  onClick={() => handleEdit(row.supplierID)}
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

export default AdminTableSupplier;

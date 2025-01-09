import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../ui/dialog";
  import { Button } from "../ui/button";
  import api from "@/lib/axiosInstance";
  import { useState } from "react";
  
  interface DeleteProjectProps {
    id: string;
    type: string;
    onDelete: (id: string) => void;
    disabled: boolean // Function to handle delete in AdminTable
  }
  
  const DeleteProject = ({ id, onDelete, type, disabled }: DeleteProjectProps) => {
    const handleDelete = async() => {
      console.log(id);
      try {
        const endpoint = type === "resource" ? `/Resource` : `/Project`;
        const res = await api.patch(endpoint,{
          resourceID:id,
          status:'Inactive'
        });
          console.log("User deleted successfully", res);
          onDelete(id); 
      } catch (error) {
          console.log("Error deleting user", error)
      }
    };
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className=" bg-blue-500" variant="default" disabled = {disabled}>
            Inactive
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This will permanently delete the user
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="submit" onClick={handleDelete}>
              Delete user
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default DeleteProject;
  
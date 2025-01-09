"use client";
import { Search  } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface Props {
  onSearch: (value: string) => void;
}

const AdminSearchUserInput: React.FC<Props> = ({onSearch}) => {


  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value); // Pass search term to parent
  };

  return (
    <div className="w-96 flex flex-col justify-center items-center mb-2 gap-y-2 ">

      <form className="relative w-11/12" onSubmit={sendMessage}>
      <Input
          placeholder="Search user..."
          className="rounded-full"
          onChange={handleInputChange}
        />
        <Button
          className="absolute right-1 top-1 rounded-full h-6 w-6"
          size="icon"
          variant="ghost"
        >
          <Search size={16}/>
        </Button>
      </form>
    </div>
  );
};

export default AdminSearchUserInput;

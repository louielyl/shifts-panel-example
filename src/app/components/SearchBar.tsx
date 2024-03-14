import { Input } from "@nextui-org/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import React from "react";

export default function SearchBar() {
  return (
    <div className="flex items-center gap-3">
      <p className="font-medium">Caregiver Name</p>
      <Input
        classNames={{ inputWrapper: ["bg-white","border-2"] }}
        className="flex-1 md:w-96 md:flex-initial"
        placeholder="Search"
        endContent={<MagnifyingGlassIcon className="h-7 w-7 text-gray-400" />}
      />
    </div>
  );
}

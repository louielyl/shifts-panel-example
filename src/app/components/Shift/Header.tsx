import React from "react";
import { Button, Checkbox } from "@nextui-org/react";
import dayjs from "dayjs";

export default function Header({
  date,
  count,
  isDisabled,
}: {
  date: Date;
  count: Number;
  isDisabled: boolean;
}) {
  return (
    <div className="flex items-center gap-3 bg-gray-100 px-2 py-4">
      <Checkbox></Checkbox>
      <div className="flex flex-1 flex-wrap gap-x-unit-2 md:mr-12">
        <p className="font-semibold">{dayjs(date).format("MMMM YYYY")}</p>
        {/* TODO: add i18n plural */}
        <p>({count.toString()} held shifts)</p>
      </div>
      <Button className={isDisabled ? "bg-gray-300 text-white" : ""}>
        Confirm
      </Button>
    </div>
  );
}

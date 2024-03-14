import { Checkbox } from "@nextui-org/react";
import dayjs from "dayjs";
import React from "react";

export default function SubHeader({ date }: { date: Date }) {
  return (
    <div className="custom-subheader bg-gray-50 p-2 md:sticky md:top-0 md:z-50 flex flex-row">
      <Checkbox/>
      <p>
        {dayjs(date).format("DD MMMM")}
      </p>
    </div>
  );
}

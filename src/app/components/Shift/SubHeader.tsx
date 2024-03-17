import { Checkbox } from "@nextui-org/react";
import dayjs from "dayjs";
import React from "react";

export default function SubHeader({
  date,
  children,
  isSelectable,
  checked,
  onCheck,
}: {
  date: Date;
  children?: React.ReactNode;
  isSelectable?: boolean;
  checked?: boolean;
  onCheck?: () => void;
}) {
  return (
    <>
      <div className="custom-subheader flex flex-row bg-gray-50 p-2 md:sticky md:top-0 md:z-50">
        <Checkbox
          isSelected={checked}
          onClick={isSelectable ? onCheck : undefined}
          classNames={{
            wrapper: isSelectable ? undefined : "invisible",
            base: isSelectable ? undefined : "cursor-default",
          }}
        >
          <label>{dayjs(date).format("DD MMMM")}</label>
        </Checkbox>
      </div>
      {children}
    </>
  );
}

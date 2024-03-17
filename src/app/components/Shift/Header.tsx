import React from "react";
import { Button, Checkbox } from "@nextui-org/react";
import dayjs from "dayjs";

export default function Header({
  date,
  count,
  isSelectable,
  checked,
  canSubmit,
  onCheck,
}: {
  date: Date;
  count: Number;
  isSelectable?: boolean;
  checked?: boolean;
  canSubmit?: boolean;
  onCheck?: () => void;
}) {
  return (
    <div className="flex items-center bg-gray-100 px-2 py-4">
      <Checkbox
        isSelected={checked}
        classNames={{
          base: isSelectable ? undefined : "cursor-default",
          wrapper: isSelectable ? undefined : "invisible",
        }}
        onClick={onCheck}
      >
        <label className="flex flex-1 flex-wrap gap-x-unit-2 md:mr-12">
          <p className="font-semibold">{dayjs(date).format("MMMM YYYY")}</p>
          <p>({count.toString()} held shifts)</p>
        </label>
      </Checkbox>
      <Button
        type="submit"
        className="ml-auto text-white md:ml-0"
        color={canSubmit ? "success" : "default"}
        disabled={!canSubmit}
      >
        Confirm
      </Button>
    </div>
  );
}

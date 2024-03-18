import { Button } from "@nextui-org/button";
import React from "react";

export default function StatusSelect({
  onClick,
}: {
  onClick: (confirm: boolean) => void;
}) {
  return (
    <div className="flex gap-3">
      <Button
        onClick={() => onClick(false)}
        className="w-fit"
        color="danger"
        variant="bordered"
      >
        Decline
      </Button>
      <Button
        onClick={() => onClick(true)}
        className="w-fit text-white"
        color="success"
        variant="solid"
      >
        Confirm
      </Button>
    </div>
  );
}

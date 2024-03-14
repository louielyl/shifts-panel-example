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
        children="Decline"
        className="w-fit"
        color="danger"
        variant="bordered"
      />
      <Button
        onClick={() => onClick(true)}
        children="Confirm"
        className="w-fit text-white"
        color="success"
        variant="solid"
      />
    </div>
  );
}

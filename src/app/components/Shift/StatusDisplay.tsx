import { Status } from "@/types";
import { Button } from "@nextui-org/button";
import React from "react";

export default function StatusDisplay({ status }: { status: Status | null }) {
  if (status === "DECLINED")
    return (
      <Button
        children="Declined"
        className="text-danger-700 w-fit cursor-default"
        color="danger"
        disableAnimation
        variant="flat"
      />
    );
  if (status === "CONFIRMED")
    return (
      <Button
        children="Confirmed"
        className="text-success-700 w-fit cursor-default"
        color="success"
        disableAnimation
        variant="flat"
      />
    );
  return <></>;
}

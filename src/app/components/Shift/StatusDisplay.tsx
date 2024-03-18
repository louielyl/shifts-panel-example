import { Status } from "@/types";
import { Button } from "@nextui-org/button";
import React from "react";

export default function StatusDisplay({ status }: { status: Status | null }) {
  if (status === "DECLINED")
    return (
      <Button
        className="w-fit cursor-default text-danger-700"
        color="danger"
        disableAnimation
        variant="flat"
      >
        Declined
      </Button>
    );
  if (status === "CONFIRMED")
    return (
      <Button
        className="w-fit cursor-default text-success-700"
        color="success"
        disableAnimation
        variant="flat"
      >
        Confirmed
      </Button>
    );
  return <></>;
}

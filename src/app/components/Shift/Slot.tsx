import { Checkbox } from "@nextui-org/react";
import dayjs from "dayjs";
import React from "react";
import { RoleTag } from "./RoleTag";
import { Role, Status } from "@/types";
import StatusSelect from "./StatusSelect";
import StatusDisplay from "./StatusDisplay";

export default function Slot({
  appointment,
  user,
}: {
  appointment: {
    status: Status | null;
    startedAt: Date | null;
    endedAt: Date | null;
  };
  user: {
    id: number;
    chiName: string | null;
    firstName: string | null;
    lastName: string | null;
    role: Role | null;
  };
}) {
  return (
    <div className="custom-slot flex gap-2">
      <Checkbox className="ml-2 self-center" />
      <div className="my-2 flex flex-col gap-1">
        <p>
          {dayjs(appointment.startedAt).format("H:mma")}-
          {dayjs(appointment.endedAt).format("H:mma")}
        </p>
        <p>
          {user.id} - {user.firstName} {user.lastName} {user.chiName}
        </p>
        <RoleTag role={user.role} />
        {appointment.status === "PENDING" ? (
          <StatusSelect onClick={()=>{}} />
        ) : (
          <StatusDisplay status={appointment.status} />
        )}
      </div>
    </div>
  );
}

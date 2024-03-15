import { Checkbox } from "@nextui-org/react";
import dayjs from "dayjs";
import React, { useState } from "react";
import { RoleTag } from "./RoleTag";
import StatusSelect from "./StatusSelect";
import StatusDisplay from "./StatusDisplay";
import { appointmentSerialiser, userSerialiser } from "./utils";
import { Controller, useFormContext } from "react-hook-form";

export default function Slot({
  appointment,
  user,
  onUpdate,
}: {
  appointment: ReturnType<typeof appointmentSerialiser>;
  user: ReturnType<typeof userSerialiser>;
  onUpdate: (confirm: boolean) => void;
}) {
  const { register } = useFormContext();

  return (
    <div className="custom-slot flex gap-2">
      <input type="checkbox" {...register(appointment.id)} />
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
          <StatusSelect onClick={onUpdate} />
        ) : (
          <StatusDisplay status={appointment.status} />
        )}
      </div>
    </div>
  );
}

import React, { HTMLAttributes } from "react";
import Header from "./Header";
import dayjs from "dayjs";
import SubHeader from "./SubHeader";
import Slot from "./Slot";
import { Appointment, User } from "@prisma/client";
import { Role, Status } from "@/types";

function userSerialiser(data: Appointment & { User: User }): {
  id: number;
  chiName: string | null;
  firstName: string | null;
  lastName: string | null;
  role: Role | null;
} {
  return {
    id: data.User.id,
    chiName: data.User.chiName,
    firstName: data.User.firstName,
    lastName: data.User.lastName,
    role: data.User.role as Role,
  };
}

function appointmentSerialiser(data: Appointment & { User: User }): {
  status: Status | null;
  startedAt: Date | null;
  endedAt: Date | null;
} {
  return {
    status: data.status as Status,
    startedAt: data.startedAt,
    endedAt: data.endedAt,
  };
}

export default function Shift({
  yearMonth,
  appointments,
}: {
  yearMonth: string;
  appointments: (Appointment & { User: User })[];
}) {
  return (
    <div className="custom-shift flex flex-col rounded-lg border-2 border-gray-200 md:relative md:max-h-full md:overflow-y-scroll">
      <Header
        date={dayjs(yearMonth).toDate()}
        isDisabled
        count={appointments.length}
      />
      {appointments.map((appointment, index, array) => {
        if (
          index === 0 ||
          dayjs(appointment.startedAt).format("YYYY-MM-DD") !==
          dayjs(array[index - 1].startedAt).format("YYYY-MM-DD")
        ) {
          return (
            <div key={appointment.id}>
              <SubHeader date={dayjs(appointment.startedAt).toDate()} />
              <Slot
                appointment={appointmentSerialiser(appointment)}
                user={userSerialiser(appointment)}
              />
            </div>
          );
        } else {
          return (
            <div key={appointment.id}>
              <Slot
                appointment={appointmentSerialiser(appointment)}
                user={userSerialiser(appointment)}
              />
            </div>
          );
        }
      })}
    </div>
  );
}

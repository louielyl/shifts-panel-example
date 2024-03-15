import React from "react";
import Header from "./Header";
import dayjs from "dayjs";
import SubHeader from "./SubHeader";
import Slot from "./Slot";
import { Appointment, User } from "@prisma/client";
import { Role, Status } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import useUpdateAppointments from "@/app/hooks/useUpdateAppointments";

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
  const queryClient = useQueryClient();
  const { mutate } = useUpdateAppointments({
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["shift-data"] });
    },
    onSuccess: () => { },
    onError: () => { },
  });
  const updateAppointment = (appointmentId: string, isConfirmed: boolean) =>
    mutate([
      {
        id: appointmentId,
        status: isConfirmed ? "CONFIRMED" : "DECLINED",
      },
    ]);

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
            <React.Fragment key={appointment.id}>
              <SubHeader
                key={dayjs(appointment.startedAt).format("YYYY-MM-DD")}
                date={dayjs(appointment.startedAt).toDate()}
              />
              <Slot
                onUpdate={(isConfirmed) =>
                  updateAppointment(appointment.id, isConfirmed)
                }
                appointment={appointmentSerialiser(appointment)}
                user={userSerialiser(appointment)}
              />
            </React.Fragment >
          );
        } else {
          return (
            <React.Fragment  key={appointment.id}>
              <Slot
                onUpdate={(isConfirmed) =>
                  updateAppointment(appointment.id, isConfirmed)
                }
                appointment={appointmentSerialiser(appointment)}
                user={userSerialiser(appointment)}
              />
            </React.Fragment >
          );
        }
      })}
    </div>
  );
}

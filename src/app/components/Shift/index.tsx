import React from "react";
import Header from "./Header";
import dayjs from "dayjs";
import SubHeader from "./SubHeader";
import Slot from "./Slot";
import { Appointment, User } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import useUpdateAppointments from "@/app/hooks/useUpdateAppointments";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { appointmentSerialiser, userSerialiser } from "./utils";

type Inputs = {
  id: string;
  isConfirmed: boolean;
};

const getDayFormat = (date: Date | null) => dayjs(date).format("YYYY-MM-DD");

export default function Shift({
  yearMonth,
  appointments,
}: {
  yearMonth: string;
  appointments: (Appointment & { User: User })[];
}) {
  const queryClient = useQueryClient();

  const methods = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

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
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="custom-shift flex flex-col rounded-lg border-2 border-gray-200 md:relative md:max-h-full md:overflow-y-scroll"
      >
        <Header date={dayjs(yearMonth).toDate()} count={appointments.length} />
        {Object.entries(
          appointments.reduce(
            (
              acc: Record<string, (Appointment & { User: User })[]>,
              appointment,
            ) => {
              acc[getDayFormat(appointment.startedAt)] =
                acc[getDayFormat(appointment.startedAt)] || [];
              acc[getDayFormat(appointment.startedAt)].push(appointment);
              return acc;
            },
            {},
          ),
        ).map(([_, appointments]) => (
          <SubHeader
            key={getDayFormat(appointments[0].startedAt)}
            date={dayjs(appointments[0].startedAt).toDate()}
          >
            {appointments.map((appointment) => (
              <Slot
                key={appointment.id}
                onUpdate={(isConfirmed) =>
                  updateAppointment(appointment.id, isConfirmed)
                }
                appointment={appointmentSerialiser(appointment)}
                user={userSerialiser(appointment)}
              />
            ))}
          </SubHeader>
        ))}
      </form>
    </FormProvider>
  );
}

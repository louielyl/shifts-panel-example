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
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";

type Input = {
  [id: string]: boolean;
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
  const methods = useForm<Input>();
  const { mutateAsync } = useUpdateAppointments({
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["shifts"] }),
  });

  methods.watch();

  const pendingApppointments = appointments.filter(
    (appointment) => appointment.status === "PENDING",
  );

  const groupOnClick = (appointments: Appointment[]) => {
    const allAreSelected = appointments.every(
      (appointment) => methods.getValues(appointment.id) === true,
    );
    const someAreSelected = appointments.some(
      (appointment) => methods.getValues(appointment.id) === true,
    );
    if (someAreSelected && !allAreSelected) {
      appointments.forEach((appointment) =>
        methods.setValue(appointment.id, true),
      );
    } else {
      appointments.forEach((appointment) =>
        methods.setValue(appointment.id, !someAreSelected),
      );
    }
  };

  const onSubmit: SubmitHandler<Input> = (data) => {
    const submittingData = Object.entries(data).filter(
      (datum) => datum[1] === true,
    );
    mutateAsync(
      submittingData.map((datum) => ({
        id: datum[0],
        status: datum[1] ? "CONFIRMED" : "DECLINED",
      })),
    )
      .then(() => toast.success(`Confirmed ${submittingData.length} shifts`))
      .catch(() => toast.error("Update failed"));
  };

  const updateAppointment = (appointmentId: string, isConfirmed: boolean) =>
    mutateAsync([
      {
        id: appointmentId,
        status: isConfirmed ? "CONFIRMED" : "DECLINED",
      },
    ])
      .then(() =>
        toast.success(
          `${isConfirmed ? "Confirmed" : "Declined"} appointment on ${dayjs(appointments.find((appointment) => appointment.id === appointmentId)?.startedAt).format("YYYY-MM-DD")}`,
        ),
      )
      .catch(() => toast.error("Update failed"));

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="custom-shift flex flex-col rounded-lg border-2 border-gray-200 md:relative md:max-h-full md:overflow-y-scroll transition-all"
      >
        <Header
          checked={
            pendingApppointments.length > 0 &&
            pendingApppointments.every(
              (appointment) => methods.getValues(appointment.id) === true,
            )
          }
          canSubmit={
            pendingApppointments.length > 0 &&
            pendingApppointments.some(
              (appointment) => methods.getValues(appointment.id) === true,
            )
          }
          isSelectable={pendingApppointments.length !== 0}
          onCheck={() => groupOnClick(pendingApppointments)}
          date={dayjs(yearMonth).toDate()}
          count={appointments.length}
        />
        <AnimatePresence>
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
          ).map(([yearMonth, appointments]) => {
            const pendingApppointments = appointments.filter(
              (appointment) => appointment.status === "PENDING",
            );
            return (
              <motion.div
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                key={yearMonth}
                layout
                transition={{ duration: 0.2 }}
              >
                <SubHeader
                  checked={pendingApppointments.every(
                    (appointment) => methods.getValues(appointment.id) === true,
                  )}
                  onCheck={() => groupOnClick(pendingApppointments)}
                  isSelectable={pendingApppointments.length !== 0}
                  date={dayjs(yearMonth).toDate()}
                >
                  <AnimatePresence>
                    {appointments.map((appointment) => (
                      <motion.div
                        key={appointment.id}
                        transition={{ duration: 0.2 }}
                      >
                        <Slot
                          checked={methods.getValues(appointment.id) || false}
                          shouldRegister={appointment.status === "PENDING"}
                          onUpdate={(isConfirmed) =>
                            updateAppointment(appointment.id, isConfirmed)
                          }
                          appointment={appointmentSerialiser(appointment)}
                          user={userSerialiser(appointment)}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </SubHeader>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </form>
    </FormProvider>
  );
}

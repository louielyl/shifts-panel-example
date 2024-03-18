"use client";

import { Button, Spacer, Spinner, Switch } from "@nextui-org/react";
import Notice from "./components/Notice";
import SearchBar from "./components/SearchBar";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Appointment, User } from "@prisma/client";
import Shift from "./components/Shift";
import { useCallback, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import useResetAppointments from "./hooks/useDeleteAppointments";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [searchPendingOnly, setSearchPendingOnly] = useState(false);

  const searchInputContains = useCallback(
    (input: string | null) => {
      return Boolean(
        searchInput
          .split(" ")
          .some(
            (word) => input && input.toLowerCase().includes(word.toLowerCase()),
          ),
      );
    },
    [searchInput],
  );

  const {
    data: dataByMonth,
    refetch,
    isSuccess,
    isLoading,
  } = useQuery<
    (Appointment & { User: User })[],
    unknown,
    { [key: string]: (Appointment & { User: User })[] }
  >({
    queryKey: ["shifts"],
    queryFn: async () => {
      try {
        const respond = await fetch("/appointment");
        return await respond.json();
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    select: (data) =>
      data
        .filter((datum) =>
          searchPendingOnly ? datum.status === "PENDING" : true,
        )
        .reduce(
          (acc: Record<string, (Appointment & { User: User })[]>, cur) => {
            const month = dayjs(cur.startedAt).format("YYYY-MM");
            acc[month] = acc[month] || [];
            if (
              !searchInput ||
              searchInputContains(cur.User.chiName) ||
              searchInputContains(cur.User.firstName) ||
              searchInputContains(cur.User.lastName)
            )
              acc[month].push(cur);
            return acc;
          },
          {},
        ),
  });

  const { mutate: resetAppointments } = useResetAppointments({
    onSettled: () => {
      refetch();
    },
    onSuccess: () => {
      toast.success("Reset shifts data successfully");
    },
  });

  return (
    <main className="m-6 flex min-h-[calc(100vh_-_4rem)] flex-1 flex-col bg-white p-6 md:h-[calc(100vh_-_4rem)]">
      <Notice />
      <Spacer y={4} />
      <div className="grid gap-3 md:flex">
        <SearchBar
          extraClassNames="col-span-2"
          value={searchInput}
          onChange={(value) => setSearchInput(value)}
        />
        <Switch
          isSelected={searchPendingOnly}
          onValueChange={() => setSearchPendingOnly((cur) => !cur)}
        >
          Show pending shifts only
        </Switch>
        <Button
          onClick={() => resetAppointments()}
          color="danger"
          className="ml-auto text-white"
          isIconOnly
        >
          <TrashIcon className="h-7 w-7" />
        </Button>
      </div>
      <Spacer y={4} />
      {isLoading ? (
        <div className="grid h-full place-items-center">
          <Spinner size="lg" />
        </div>
      ) : (
        <div
          className={`flex flex-col gap-4 md:flex-row ${isSuccess && Object.entries(dataByMonth).length > 0 ? "md:overflow-x-scroll" : "grid flex-1 place-items-center"}`}
        >
          <AnimatePresence>
            {isSuccess && Object.entries(dataByMonth).length > 0 ? (
              Object.entries(dataByMonth).map(([yearMonth, appointments]) => (
                <motion.div
                  className="min-w-fit"
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                  key={yearMonth}
                  layout
                  transition={{ duration: 0.2 }}
                >
                  <Shift yearMonth={yearMonth} appointments={appointments} />
                </motion.div>
              ))
            ) : (
              <motion.p>No Shift to display</motion.p>
            )}
          </AnimatePresence>
        </div>
      )}
    </main>
  );
}

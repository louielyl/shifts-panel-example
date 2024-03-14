"use client";

import { Spacer, Spinner } from "@nextui-org/react";
import Notice from "./components/Notice";
import SearchBar from "./components/SearchBar";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Appointment, User } from "@prisma/client";
import Shift from "./components/Shift";

export default function Home() {
  const { data, isSuccess, isLoading } = useQuery<
    (Appointment & { User: User })[],
    unknown,
    { [key: string]: (Appointment & { User: User })[] }
  >({
    queryKey: ["shift-data"],
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
      data.reduce(
        (acc: Record<string, (Appointment & { User: User })[]>, cur) => {
          const month = dayjs(cur.startedAt).format("YYYY-MM");
          acc[month] = acc[month] || [];
          acc[month].push(cur);
          return acc;
        },
        {},
      ),
  });

  return (
    <main className="m-6 flex flex-1 flex-col bg-white p-6 md:max-h-[calc(100vh_-_4rem)]">
      <Notice />
      <Spacer y={4} />
      <SearchBar />
      <Spacer y={4} />
      {isLoading ? (
        <div className="grid place-items-center">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="flex flex-col gap-4 md:flex-row md:overflow-x-scroll">
          {isSuccess &&
            data &&
            Object.entries(data).map(([yearMonth, appointments]) => (
              <Shift
                key={yearMonth}
                yearMonth={yearMonth}
                appointments={appointments}
              />
            ))}
        </div>
      )}
    </main>
  );
}

"use client";

import { Button, Spacer, Spinner } from "@nextui-org/react";
import Notice from "./components/Notice";
import SearchBar from "./components/SearchBar";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Appointment, User } from "@prisma/client";
import Shift from "./components/Shift";
import { useCallback, useState } from "react";

export default function Home() {
  const [searchInput, setSearchInput] = useState("");
  const searchInputContains = useCallback(
    (input: string | null) => {
      return Boolean(
        input && input.toLowerCase().includes(searchInput.toLowerCase()),
      );
    },
    [searchInput],
  );
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

  return (
    <main className="m-6 flex flex-1 flex-col bg-white p-6 md:h-[calc(100vh_-_4rem)]">
      <Notice />
      <Spacer y={4} />
      <SearchBar
        value={searchInput}
        onChange={(value) => setSearchInput(value)}
      />
      <Spacer y={4} />
      {isLoading ? (
        <div className="grid h-full place-items-center">
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

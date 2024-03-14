import { ClockIcon } from "@heroicons/react/24/solid";

export default function Notice() {
  return (
    <div className="flex items-center gap-3">
      <ClockIcon className="h-9 w-9 text-orange-300" />
      <p>indicates held shift with less than 24 hours response time</p>
    </div>
  );
}

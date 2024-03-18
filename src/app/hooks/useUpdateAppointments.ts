import { UseMutationOptions, useMutation } from "@tanstack/react-query";

export type UpdateInfo = { id: string; status: string }[];

export default function useUpdateAppointments(
	options?: UseMutationOptions<any, Error, UpdateInfo, unknown>,
) {
	return useMutation({
		mutationKey: ["shifts", "update"],
		mutationFn: async (updateInfo: UpdateInfo) => {
			try {
				const respond = await fetch("/appointment", {
					method: "PATCH",
					body: JSON.stringify(updateInfo),
				});
				return await respond.json();
			} catch (error) {
				throw error;
			}
		},
		...options,
	});
}

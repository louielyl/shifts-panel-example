import { UseMutationOptions, useMutation } from "@tanstack/react-query";

export default function useResetAppointments(options?: UseMutationOptions) {
	return useMutation({
		mutationKey: ["shifts", "delete"],
		mutationFn: async () => {
			try {
				const respond = await fetch("/appointment", {
					method: "DELETE",
				});
				return await respond.json();
			} catch (error) {
				throw error;
			}
		},
		...options
	});
}

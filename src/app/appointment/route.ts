import { Status } from "@/types";
import prisma from "@lib/prisma";

export async function GET() {
	const appointments = await prisma.appointment.findMany({
		orderBy: [
			{ startedAt: "asc" },
			{ endedAt: "asc" },
			{ createdAt: "asc" },
			{ userId: "asc" },
			{ id: "asc" },
		],
		include: { User: true },
	});

	return Response.json(appointments);
}

export async function PATCH(request: Request) {
	const data: { id: string; status: Status }[] = await request.json();
	const response = await Promise.all(
		data.map(async (datum) =>
			prisma.appointment.update({
				where: { id: datum.id },
				data: {
					status: datum.status,
				},
			}),
		),
	);

	return Response.json(response);
}

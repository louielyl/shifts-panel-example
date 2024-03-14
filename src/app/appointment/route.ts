import prisma from "@lib/prisma";

export async function GET() {
	const appointments = await prisma.appointment.findMany({
		orderBy: [
			{ startedAt: "asc" },
			{ endedAt: "asc" },
			{ createdAt: "asc" },
			{ userId: "asc" },
		],
		include: { User: true },
	});

	return Response.json(appointments);
}

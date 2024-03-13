import prisma from "@lib/prisma";

export async function GET() {
	const appointments = await prisma.appointment.findMany({});
	return Response.json(appointments);
}

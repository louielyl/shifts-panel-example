import { Status } from "@/types";
import prisma from "@lib/prisma";
import shifts from "../../../prisma/data.json";

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

	if (!data) return Response.json({ message: "No data" });

	try {
		const response = await Promise.all(
			data.map(async (datum) =>
				prisma.appointment.update({
					where: { id: datum.id, status: "PENDING" },
					data: {
						status: datum.status,
					},
				}),
			),
		);
		return Response.json(response);
	} catch (error) {
		throw Response.json(error);
	}
}

export async function DELETE() {
	try {
		// TODO: DRY it with seed.
		await prisma.user.deleteMany({});
		await prisma.appointment.deleteMany({});

		await prisma.user.createMany({
			data: shifts.map((shift) => {
				return {
					chiName: shift.chiName,
					firstName: shift.firstName,
					id: shift.userId,
					lastName: shift.lastName,
					role: shift.role,
				};
			}),
			skipDuplicates: true,
		});

		await prisma.appointment.createMany({
			data: shifts.map((shift) => ({
				endedAt: shift.endedAt,
				startedAt: shift.startedAt,
				status: shift.status,
				userId: shift.userId,
			})),
			skipDuplicates: true,
		});
		return Response.json("reset success");
	} catch (error) {
		throw Response.json(error);
	}
}

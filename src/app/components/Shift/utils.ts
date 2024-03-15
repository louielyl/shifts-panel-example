import { Role, Status } from "@/types";
import { Appointment, User } from "@prisma/client";

export function userSerialiser(data: Appointment & { User: User }): {
	id: number;
	chiName: string | null;
	firstName: string | null;
	lastName: string | null;
	role: Role | null;
} {
	return {
		id: data.User.id,
		chiName: data.User.chiName,
		firstName: data.User.firstName,
		lastName: data.User.lastName,
		role: data.User.role as Role,
	};
}

export function appointmentSerialiser(data: Appointment & { User: User }): {
	id: string;
	status: Status | null;
	startedAt: Date | null;
	endedAt: Date | null;
} {
	return {
		id: data.id,
		status: data.status as Status,
		startedAt: data.startedAt,
		endedAt: data.endedAt,
	};
}

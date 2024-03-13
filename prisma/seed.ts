import { PrismaClient } from "@prisma/client";
import shifts from "./data.json";

const prisma = new PrismaClient();

async function main() {
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
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

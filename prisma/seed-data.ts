import { PrismaClient, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const userCount = await prisma.user.count();
  if (userCount === 0) {
    const rootUser = {
      email: 'root@admin.com',
      hash: '$argon2id$v=19$m=65536,t=3,p=4$U3I3p5jRWdfK+v5biXnybA$iVOZUjaJXzgiPejjJIlIQ8KEUoB1T8Dp3oBnKiiq0Cc',
      firstName: 'Root',
      lastName: 'User',
      role: UserRole.ADMIN,
    };

    await prisma.user.create({ data: rootUser });
  }
  const count = await prisma.coordinates.count();
  if (count === 0) {
    const locations = [
      'F-6',
      'F-7',
      'F-8',
      'F-9',
      'F-10',
      'G-6',
      'G-7',
      'G-8',
      'G-9',
      'G-10',
      'H-8',
      'H-9',
      'H-10',
      'I-8',
      'I-9',
      'I-10',
      'I-11',
      'I-12',
      'G-11',
      'G-12',
    ];

    const areas = [];
    for (let i = 0; i < locations.length; i++) {
      const longitude = Math.random() * 100;
      const latitude = Math.random() * 100;
      const locationName = locations[i];

      areas.push({ longitude, latitude, locationName });
    }

    await prisma.coordinates.createMany({ data: areas });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

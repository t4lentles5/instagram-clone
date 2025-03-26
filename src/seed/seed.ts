import prisma from '../lib/prisma';
import { users } from './seed-users';

async function main() {
  await prisma.user.deleteMany();

  await prisma.user.createMany({ data: users });

  console.log('Seed executed');
}

(() => {
  main();
})();

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany({}); // use with caution.

  const amountOfUsers = 10;  

  for (let i = 1; i <= amountOfUsers; i++) {
    
    let passwd = (Math.random() + 1).toString(36).substring(8);

    let salt = bcrypt.genSaltSync(10);
    let hashedpassword = bcrypt.hashSync(passwd, salt);
    
    const name = faker.name.lastName()

    const user = await prisma.user.create({ data: {
      email: faker.internet.email(name),
      name,
      password: hashedpassword,
    }});

    
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
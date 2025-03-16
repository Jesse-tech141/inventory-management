import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

// Define the correct order for deletion and seeding based on foreign key dependencies
const orderedFileNames = [
  // Independent tables (no foreign keys)
  "users.json",
  "products.json",
  "expenseCategories.json",

  // Tables that depend on the above
  "expenses.json", // Depends on users and expenseCategories
  "notifications.json", // Depends on users
  "sales.json", // Depends on users and products
  "orders.json", // Depends on users and products

  // Tables that depend on the above
  "saleItems.json", // Depends on sales and products
  "orderItems.json", // Depends on orders and products
];

async function deleteAllData(orderedFileNames: string[]) {
  // Reverse the order for deletion to respect foreign key constraints
  const reversedOrderedFileNames = [...orderedFileNames].reverse();

  for (const fileName of reversedOrderedFileNames) {
    const modelName = path.basename(fileName, path.extname(fileName));
    const capitalizedModelName =
      modelName.charAt(0).toUpperCase() + modelName.slice(1);
    const model: any = prisma[capitalizedModelName as keyof typeof prisma];

    if (model) {
      await model.deleteMany({});
      console.log(`Cleared data from ${capitalizedModelName}`);
    } else {
      console.error(
        `Model ${capitalizedModelName} not found. Please ensure the model name is correctly specified.`
      );
    }
  }
}

async function main() {
  const dataDirectory = path.join(__dirname, "seedData");

  // Delete all data in the correct order
  await deleteAllData(orderedFileNames);

  // Seed data in the correct order
  for (const fileName of orderedFileNames) {
    const filePath = path.join(dataDirectory, fileName);
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const modelName = path.basename(fileName, path.extname(fileName));
    const capitalizedModelName =
      modelName.charAt(0).toUpperCase() + modelName.slice(1);
    const model: any = prisma[capitalizedModelName as keyof typeof prisma];

    if (!model) {
      console.error(`No Prisma model matches the file name: ${fileName}`);
      continue;
    }

    for (const data of jsonData) {
      await model.create({
        data,
      });
    }

    console.log(`Seeded ${capitalizedModelName} with data from ${fileName}`);
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
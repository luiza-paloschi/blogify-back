import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const categories = [
    "Technology",
    "Sports",
    "Entertainment",
    "Fashion",
    "Health",
    "Fitness",
    "Travel",
    "Food",
    "Science",
    "Politics",
    "Business",
    "Lifestyle",
    "Education",
    "Arts",
    "Music",
    "Film",
    "Literature",
    "Gaming",
    "Home and Garden",
    "Parenting",
    "Automotive",
    "Finance",
    "Beauty",
    "DIY",
    "History"
  ];
  
  const categoryObjects = categories.map(category => {
      return { name: category };
  });

async function main() {
    await prisma.category.createMany({
        data: categoryObjects
    })
}
  
main()
.catch((e) => {
    console.error(e);
    process.exit(1);
})
.finally(async () => {
    await prisma.$disconnect();
});
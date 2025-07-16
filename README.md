This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

1. Clone the repository
2. Create a copy of the `.env.template` and rename it to `.env` and change the environment variables
3. Install dependencies `npm install`
4. Start the database `docker-compose up -d`
5. Run Prisma migrations `npx prisma migrate dev`
6. Run the project `npm run dev`
7. Send a POST request to `http://localhost:3000/api/seed` to seed the database with initial data.

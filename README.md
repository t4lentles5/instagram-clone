This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

1. Clone the repository
2. Create a copy of the `.env.template` and rename it to `.env` and change the environment variables
3. Install dependencies `npm install`
4. Start the database `docker-compose up --build`
5. Run Prisma migrations `npx prisma migrate dev`
6. Before running seed for the first time, create the typesetting compilation files `cd src/seed` `npx tsc --init`
7. Run seed `npm run seed`
8. Run the project `npm run dev`

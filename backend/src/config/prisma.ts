// import { PrismaPg } from "@prisma/adapter-pg";
// import pg from "pg";
// import { PrismaClient } from "../generated/prisma/client";

// const globalForPrisma = globalThis as unknown as {
//     prisma: PrismaClient | undefined;
// };

// // Connection Pool 
// const pool = new pg.Pool({ 
//     connectionString: process.env.DATABASE_URL 
// });


// const adapter = new PrismaPg(pool as any);

// export const prisma = globalForPrisma.prisma ?? new PrismaClient({
//     adapter: adapter,
//     // log: ["query", "error", "warn"]
// });

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;



import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool as any);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
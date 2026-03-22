import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import { PrismaClient } from "../generated/prisma/client.js";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

// Connection Pool তৈরি
const pool = new pg.Pool({ 
    connectionString: process.env.DATABASE_URL 
});


const adapter = new PrismaPg(pool as any);

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
    adapter: adapter,
    // log: ["query", "error", "warn"]
});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;


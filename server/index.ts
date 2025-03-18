import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
 import * as schema from "@/server/schema";

import * as dotenv from 'dotenv'

dotenv.config({
    path: ".env",
});

const sql = neon("postgresql://neondb_owner:npg_v5YESXmg4HtO@ep-fancy-credit-a1tf76ms-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require");
export const db = drizzle(sql, {schema});


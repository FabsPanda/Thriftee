'use server'

import { createSafeActionClient } from "next-safe-action"
import { z } from "zod";
import { db } from "..";
import { products } from "../schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

const actionClient = createSafeActionClient();

export const deleteProduct = actionClient.schema(z.object({id: z.number()})).action(async ({parsedInput}) => {
    try {
        if(parsedInput.id){
            const data = await db
                .delete(products)
                .where(eq(products.id, parsedInput.id))
                .returning();

            revalidatePath('/dashboard/products')
            return {success: `Product ${data[0].title} has been deleted`}
        }
    } catch (err) {
        return {error: "Failed to delete product"}
    }
})
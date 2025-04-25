'use server'

import { ProductSchema } from "@/types/product-schema";
import { createSafeActionClient } from "next-safe-action"
import { db } from "..";
import { eq } from "drizzle-orm";
import { products } from "../schema";

const actionClient = createSafeActionClient();

export const createProduct = actionClient.schema(ProductSchema).action(async ({parsedInput}) => {
    try {
        if(parsedInput.id){
            const currentProduct = await db.query.products.findFirst({
                where: eq(products.id, parsedInput.id)
            })

            // If there is no current product
            if(!currentProduct){
                return { error: "Product not found" }
            }
            
            const editedProduct = await db
                .update(products)
                .set(parsedInput)
                .where(eq(products.id, parsedInput.id)).returning()
            return { success: `Product ${editedProduct[0].title} has been created` }
        }

        if(!parsedInput.id){
            const newProduct = await db
                .insert(products)
                .values(parsedInput)
                .returning();
            return { success: `Product ${newProduct[0].title} has been created` }
        }
    } catch (err) {
        return { error: JSON.stringify(err) }
    }
})
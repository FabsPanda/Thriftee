'use server'

import { ProductSchema } from "@/types/product-schema";
import { createSafeActionClient } from "next-safe-action"
import { db } from "..";
import { eq } from "drizzle-orm";
import { products } from "../schema";
import { verifyProduct } from "@/lib/verify-product";
import { revalidatePath } from "next/cache";

const actionClient = createSafeActionClient();

export const createProduct = actionClient.schema(ProductSchema).action(async ({parsedInput}) => {
    try {

        // Product Verif
        let verified = false;
        const upc = parsedInput.upc;
        const verification = await verifyProduct(upc);
        // if(verification.error) {
        //     return { error: `Verification failed: ${verification.error}` };
        // }

        if(!verification.error) {
            verified = true;
        }

        // const verifiedData = verification.data;

        // For edit product
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
                .set({
                    ...parsedInput,
                    verified
                })
                .where(eq(products.id, parsedInput.id)).returning()
            
            revalidatePath("/dashboard/products")
            return { success: `Product ${editedProduct[0].title} has been updated` }
        }

        // For new product
        if(!parsedInput.id){
            const newProduct = await db
                .insert(products)
                .values({
                    ...parsedInput,
                    verified
                })
                .returning();
            return { success: `Product ${newProduct[0].title} has been created` }
        }
    } catch (err) {
        return { error: 'Failed to create a product' }
    }
})
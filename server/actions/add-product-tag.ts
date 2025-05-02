'use server'

import { db } from ".."
import { productTags } from "../schema"
import { eq } from "drizzle-orm"

export async function addProductTag({
  productId,
  tagId,
}: {
  productId: number
  tagId: number
}): Promise<{ success?: string; error?: string }> {
  try {
    // Check if the product already has a tag
    const existing = await db.query.productTags.findFirst({
      where: eq(productTags.productId, productId),
    })

    if (existing) {
      // Update the tagId for the existing product
      await db
        .update(productTags)
        .set({ tagId })
        .where(eq(productTags.productId, productId))

      return {
        success: `Updated tag for Product ${productId} to Tag ${tagId}`,
      }
    }

    // Insert if no existing tag found
    await db.insert(productTags).values({ productId, tagId })

    return {
      success: `Added Tag ${tagId} to Product ${productId}`,
    }
  } catch (error) {
    console.error(error)
    return { error: "Failed to add or update tag" }
  }
}

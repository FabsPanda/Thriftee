'use server'

import { db } from ".."
import { tags, productTags } from "../schema"
import { eq, and } from "drizzle-orm"

export async function deleteProductTag({
  productId,
  tagName,
}: {
  productId: number;
  tagName: string;
}): Promise<{ success?: string; error?: string }> {
  try {
    // First, get the tag ID based on tag name
    const tag = await db.query.tags.findFirst({
      where: eq(tags.name, tagName),
    });

    if (!tag) {
      return { error: "Tag not found" };
    }

    // Then delete the productTag entry
    await db
      .delete(productTags)
      .where(
        and(
          eq(productTags.productId, productId),
          eq(productTags.tagId, tag.id)
        )
      );

    return { success: "Tag removed successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to remove tag" };
  }
}

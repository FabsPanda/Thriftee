"use client"

import { TagsWithProducts } from "@/lib/infer-type"
import React from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
  
export default function ProductTag(
    {
        editMode,
        productId,
        children
    }: {
        editMode: boolean,
        productId: number,
        children: React.ReactNode
    }
){
    return(
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
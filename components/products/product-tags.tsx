'use client'

import { cn } from "@/lib/utils"
import { Badge } from "../ui/badge"
import { useRouter, useSearchParams } from "next/navigation"

export default function ProductTags() {

    const router = useRouter();
    const params = useSearchParams();
    const tag = params.get("tag");

    const setFilter = (tag: string) => {
        if(tag) {
            router.push(`?tag=${tag}`);
        }
        if(!tag) {
            router.push('/');
        }
    }

    return (
        <div className="my-4 flex gap-4 items-center justify-center">
            <Badge onClick={() => setFilter("")} className={cn("cursor-pointer bg-primary hover:bg-primary/75 hover:opacity-100", !tag ? 'opacity-100' : 'opacity-50')}>All</Badge>
            <Badge onClick={() => setFilter("jacket")} className={cn("cursor-pointer bg-primary hover:bg-primary/75 hover:opacity-100", tag === "jacket" && tag ? 'opacity-100' : 'opacity-50')}>Jacket</Badge>
            <Badge onClick={() => setFilter("t-shirt")} className={cn("cursor-pointer bg-primary hover:bg-primary/75 hover:opacity-100", tag === "t-shirt" && tag ? 'opacity-100' : 'opacity-50')}>T-Shirt</Badge>
            <Badge onClick={() => setFilter("pants")} className={cn("cursor-pointer bg-primary hover:bg-primary/75 hover:opacity-100", tag === "pants" && tag ? 'opacity-100' : 'opacity-50')}>Pants</Badge>
            <Badge onClick={() => setFilter("jeans")} className={cn("cursor-pointer bg-primary hover:bg-primary/75 hover:opacity-100", tag === "jeans" && tag ? 'opacity-100' : 'opacity-50')}>Jeans</Badge>
            <Badge onClick={() => setFilter("long sleeve")} className={cn("cursor-pointer bg-primary hover:bg-primary/75 hover:opacity-100", tag === "long-sleeve" && tag ? 'opacity-100' : 'opacity-50')}>Long Sleeve</Badge>
        </div>
    )
}
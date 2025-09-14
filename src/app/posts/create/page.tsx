"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import api from "@/lib/axios"

export default function CreatePostPage() {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const router = useRouter()

    const handleCreate = async () => {
        await api.post("/posts", { title, content })
        router.push("/posts") // กลับไป list page
    }

    return (
        <main className="p-10 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Create Post</h1>
            <div className="space-y-4">
                <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <Textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
                <Button onClick={handleCreate}>Create</Button>
            </div>
        </main>
    )
}

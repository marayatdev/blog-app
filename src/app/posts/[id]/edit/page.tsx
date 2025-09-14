"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"
import api from "@/lib/axios"

export default function EditPostPage() {
    const router = useRouter()
    const params = useParams()
    const postId = params.id

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    console.log('params:', postId);


    useEffect(() => {
        api.get(`/posts/${postId}`).then((res) => {
            setTitle(res.data.title)
            setContent(res.data.content)
        })
    }, [postId])

    const handleUpdate = async () => {
        try {
            await api.put(`/api/posts/${postId}`, { title, content })
            router.push("/posts")
        } catch (err) {
            console.error(err)
        }
    }


    return (
        <main className="p-10 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
            <div className="space-y-4">
                <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                <Textarea value={content} onChange={(e) => setContent(e.target.value)} />
                <Button onClick={handleUpdate}>Save</Button>
            </div>
        </main>
    )
}

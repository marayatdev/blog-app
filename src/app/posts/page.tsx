"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import api from "@/lib/axios"
import { Edit, Trash } from "lucide-react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { formatDateTH } from "@/lib/formatDate"

export default function PostsPage() {
    const [posts, setPosts] = useState<any[]>([])
    const [postToDelete, setPostToDelete] = useState<string | null>(null)

    useEffect(() => {
        api.get("/posts").then((res) => setPosts(res.data))
    }, [])

    const handleDelete = async () => {
        if (!postToDelete) return
        await api.delete(`/posts?id=${postToDelete}`)
        setPosts(posts.filter(post => post._id !== postToDelete))
        setPostToDelete(null)
    }

    return (
        <main className="p-10 max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold">📖 Posts</h1>
                <Link href="/posts/create">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">Add Post</Button>
                </Link>
            </div>

            {/* Grid 2 columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map((p) => (
                    <Card key={p._id} className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-lg font-semibold">{p.title}</CardTitle>
                                <p className="text-xs text-gray-500">{formatDateTH(p.createdAt)}</p>
                            </div>
                            <div className="flex gap-2">
                                <Link href={`/posts/${p._id}/edit`}>
                                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                                        <Edit size={16} /> Edit
                                    </Button>
                                </Link>

                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            className="flex items-center gap-1"
                                            onClick={() => setPostToDelete(p._id)}
                                        >
                                            <Trash size={16} /> Delete
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Delete Post?</AlertDialogTitle>
                                            <p>Are you sure you want to delete this post? This action cannot be undone.</p>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </CardHeader>
                        <CardContent className="text-gray-700">{p.content}</CardContent>
                    </Card>
                ))}
            </div>
        </main>
    )
}

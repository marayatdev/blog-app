import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongo";
import { ObjectId } from "mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db(process.env.MONGO_DB);
  const posts = await db.collection("posts").find().toArray();
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const data = await req.json();
  const client = await clientPromise;
  const db = client.db(process.env.MONGO_DB);

  const newPost = {
    title: data.title,
    content: data.content,
    createdAt: new Date(),
  };

  await db.collection("posts").insertOne(newPost);
  return NextResponse.json(newPost, { status: 201 });
}

// ลบโพสต์ตาม ID
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing post id" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db(process.env.MONGO_DB);

  const result = await db
    .collection("posts")
    .deleteOne({ _id: new ObjectId(id) });

  if (result.deletedCount === 0) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Post deleted successfully" });
}

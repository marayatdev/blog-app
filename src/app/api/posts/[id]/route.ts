import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongo";
import { ObjectId } from "mongodb";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const client = await clientPromise;
    const db = client.db(process.env.MONGO_DB);
    const post = await db
      .collection("posts")
      .findOne({ _id: new ObjectId(id) });

    if (!post)
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    return NextResponse.json(post);
  } catch (err) {
    return NextResponse.json({ error: "Cannot fetch post" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const data = await req.json();
    const client = await clientPromise;
    const db = client.db(process.env.MONGO_DB);

    const updatedPost = await db
      .collection("posts")
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { title: data.title, content: data.content } },
        { returnDocument: "after" }
      );

    if (!updatedPost?.value) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(updatedPost.value);
  } catch (err) {
    return NextResponse.json({ error: "Cannot update post" }, { status: 500 });
  }
}

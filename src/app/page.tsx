"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-10 bg-gray-50">
      <h1 className="text-5xl font-extrabold mb-6 text-center">
        ยินดีต้อนรับสู่ Blog App 📖
      </h1>
      <p className="text-lg text-center max-w-xl mb-8">
        เว็บแอปนี้ช่วยให้คุณสามารถสร้าง อ่าน และแก้ไขโพสต์ได้อย่างง่ายดาย พัฒนาโดยใช้ Next.js, MongoDB, Docker และ Kubernetes
        ลองสร้างโพสต์ใหม่ หรือดูรายการโพสต์ทั้งหมดได้ที่หน้าถัดไป
      </p>

      <div className="flex gap-4">
        <Link href="/posts">
          <Button>ดูโพสต์ทั้งหมด</Button>
        </Link>
        <Link href="/posts/create">
          <Button variant="outline">สร้างโพสต์ใหม่</Button>
        </Link>
      </div>
    </main>
  )
}

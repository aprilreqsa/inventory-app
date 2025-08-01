"use client"
import { useSession } from "next-auth/react"


export default function Page(){
    const {data: session} = useSession()
    return (
        <div className=" p-8 max-w-xl mx-auto rounded-2xl shadow-xl space-y-3">
      <h1 className="text-2xl font-bold mb-4">Selamat datang di dashboard {session?.user?.name || 'User'} !</h1>
      <p>Ini adalah halaman dashboard utama.</p>
    </div>
    )
}
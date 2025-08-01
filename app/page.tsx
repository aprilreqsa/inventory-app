import Link from "next/link";


export default function Home() {
  return (
    <div className=" p-8 max-w-xl mx-auto rounded-2xl shadow-xl space-y-3">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Inventory App</h1>
      <p>Silahkan Sign In Terlebih dahulu</p>
      <Link href="/signin">
      <button className="rounded-xl bg-green-600 px-4 py-1 hover:bg-green-700 text-white">
        Login
      </button>
      </Link>
      
    </div>
  );
}

"use client"

import { useEffect, useState } from "react"

export default function Home() {
  const [users, setUsers] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-6">Usuarios 👥</h1>

      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} className="p-3 bg-white shadow rounded-lg">
            {user.name} — {user.email}
          </li>
        ))}
      </ul>
    </main>
  )
}

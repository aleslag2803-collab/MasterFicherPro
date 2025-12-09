"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Redirigir a login
    router.push("/iniciar-sesion")
  }, [router])

  return null
}

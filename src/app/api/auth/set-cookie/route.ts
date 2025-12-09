import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { usuario } = await request.json();

  const response = NextResponse.json({ success: true });

  // Guardar cookie con información del usuario
  response.cookies.set("usuario", JSON.stringify(usuario), {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 días
  });

  return response;
}

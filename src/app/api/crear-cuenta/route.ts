export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import argon2 from "argon2";

export async function POST(req: NextRequest) {
  try {
    const { nombre, correo, password, rol } = await req.json();

    // Validación básica
    if (!nombre || !correo || !password || !rol) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    // Verificar si ya existe el correo
    const existe = await prisma.usuarios.findUnique({
      where: { correo },
    });

    if (existe) {
      return NextResponse.json(
        { error: "Este correo ya está registrado" },
        { status: 409 } // Conflict
      );
    }

    // Hashear la contraseña
    const passwordHash = await argon2.hash(password, {
      type: argon2.argon2id,
    });

    // Crear usuario
    const usuario = await prisma.usuarios.create({
      data: {
        nombre,
        correo,
        passwordHash,
        rol,
        estado: true,
      },
    });

    return NextResponse.json(
      {
        mensaje: "Cuenta creada exitosamente",
        usuario: {
          idUsuario: usuario.idUsuario,
          nombre: usuario.nombre,
          correo: usuario.correo,
          rol: usuario.rol,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error en crear cuenta:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

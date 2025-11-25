import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Mensaje no proporcionado" },
        { status: 400 }
      );
    }

    // Llamada a OpenAI
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini", // O el modelo que uses (gpt-4o-mini es mejor)
      messages: [
        { role: "system", content: "Eres un asistente útil" },
        { role: "user", content: message },
      ],
    });

    const responseText =
      completion.choices?.[0]?.message?.content || "No pude generar respuesta.";

    return NextResponse.json({ response: responseText });
  } catch (error) {
    console.error("API ERROR:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// src/app/api/auth/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies(); // Await cookies() since it returns a Promise
  const session = cookieStore.get("session");

  const user = session ? JSON.parse(session.value) : null;
  return NextResponse.json({ user });
}

export async function POST(req: Request) {
  const { username, password } = await req.json();

  // Dummy authentication (Replace with real logic)
  if (username === "admin" && password === "password") {
    const user = { name: "Admin", email: "admin@example.com" };
    const cookieStore = await cookies();
    cookieStore.set("session", JSON.stringify(user), { httpOnly: true });
    
    return NextResponse.json({ message: "Logged in", user });
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("session");

  return NextResponse.json({ message: "Logged out" });
}

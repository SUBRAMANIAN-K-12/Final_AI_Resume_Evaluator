import { NextResponse } from "next/server";
 
export async function POST() {
  console.log("Logout API called"); 
  const response = NextResponse.json({ success: true }, { status: 200 });
 
  // Remove the session cookie properly
  response.cookies.set("session", "", {
    httpOnly: true,
    path: "/", // Ensures it clears across all paths
    expires: new Date(0), 
  });
 
  return response;
}
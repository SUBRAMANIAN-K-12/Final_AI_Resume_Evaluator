import { supabase } from "@/utils/supabase";
import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    const { email, password } = await req.json();
 

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    
    if (user.password !== password) {
      return NextResponse.json({ success: false, error: "Invalid password" }, { status: 401 });
    }
    
   const sessionToken = `session_${user.id}`;

   const response = NextResponse.json({ success: true}, { status: 200 });

   response.cookies.set("session", sessionToken, {
     httpOnly: true,
     expires: new Date(Date.now() + 3600000),
   });
   
    return response;

  } catch (error) {
    
    return NextResponse.json({ success: false, error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

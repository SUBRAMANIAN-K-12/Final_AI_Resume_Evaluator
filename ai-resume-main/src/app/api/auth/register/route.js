import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase"; 

export async function POST(req) {
  

  try {
    const { username, email, password ,phoneNo } = await req.json();
    
    
    const { error } = await supabase.from("users").insert([{ username, email, password ,phoneNo }]);

    if (error) {
   
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

 
    return NextResponse.json({ success: true, message: "User registered successfully!" }, { status: 201 });

  } catch (error) {
    
    return NextResponse.json({ success: false, error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

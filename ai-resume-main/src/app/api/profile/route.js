
import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

export async function GET(req) {
 
  const cookieHeader = req.headers.get('cookie');
  const cookies = cookieHeader.split(';').reduce((acc, cookieStr) => {
    const [key, value] = cookieStr.trim().split('=');
    if (key && value) {
      acc[key] = value;
    }
    return acc;
  }, {});

  const sessionToken = cookies['session'];
  if (!sessionToken) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  // Assuming the session token format is "session_<userId>"
  const parts = sessionToken.split('_');
  const userId = parts[1];
  if (!userId) {
    return NextResponse.json({ error: 'Invalid session token' }, { status: 401 });
  }

  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user profile:', JSON.stringify(error, null, 2));
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}

export async function PUT(req) {
  const cookieHeader = req.headers.get('cookie');
  const cookies = cookieHeader.split(';').reduce((acc, cookieStr) => {
    const [key, value] = cookieStr.trim().split('=');
    if (key && value) {
      acc[key] = value;
    }
    return acc;
  }, {});
  const sessionToken = cookies['session'];
  if (!sessionToken) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
  const parts = sessionToken.split('_');
  const userId = parts[1];
  if (!userId) {
    return NextResponse.json({ error: 'Invalid session token' }, { status: 401 });
  }
  try {
    const updatedProfile = await req.json();  // Parsing the request body to get the updated profile data
    if (!updatedProfile || Object.keys(updatedProfile).length === 0) {
      return NextResponse.json({ error: 'No data provided to update' }, { status: 400 });
    }
    const { data, error } = await supabase
      .from('users')
      .update(updatedProfile)  // Update the user profile in the database
      .eq('id', userId)
      .single();
    if (error) {
      console.error('Error updating profile:', JSON.stringify(error, null, 2));
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ message: 'Profile updated successfully', data }, { status: 200 });
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
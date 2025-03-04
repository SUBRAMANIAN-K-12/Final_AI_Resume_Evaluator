
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

import path from 'path';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;


const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(req) {
  // console.log("apicalled");


  const cookieHeader = req.headers.get('cookie');
  if (!cookieHeader) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

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

  
  const formData = await req.formData();
  const file = formData.get('file');
  if (!file) {
    return NextResponse.json({ error: 'File not provided' }, { status: 400 });
  }

  
  const fileName = file.name;
  const fileExt = path.extname(fileName).toLowerCase();
  if (fileExt !== '.pdf') {
    return NextResponse.json({ error: 'Only PDF files are allowed.' }, { status: 400 });
  }

  try {
    
    const fileBuffer = await file.arrayBuffer();

    
    const filePath = `uploads/${userId}/${Date.now()}-${fileName}`;

    
    const { data, error } = await supabase.storage
      .from('pdf_bucket')
      .upload(filePath, fileBuffer, { contentType: 'application/pdf' });

    if (error) {
      throw error;
    }

    
    const publicUrl = `${supabaseUrl}/storage/v1/object/public/pdf_bucket/${filePath}`;

    return NextResponse.json({ success: true, url: publicUrl });
  } catch (err) {
    console.error('Upload Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


export async function GET(req) {
  try {
    // Extract session token from cookies
    const cookieHeader = req.headers.get('cookie');
    if (!cookieHeader) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

    const cookies = cookieHeader.split(';').reduce((acc, cookieStr) => {
      const [key, value] = cookieStr.trim().split('=');
      if (key && value) acc[key] = value;
      return acc;
    }, {});

    const sessionToken = cookies['session'];
    if (!sessionToken) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

    const parts = sessionToken.split('_');
    const userId = parts[1];
    if (!userId) return NextResponse.json({ error: 'Invalid session token' }, { status: 401 });

   

    // Fetch files from Supabase Storage
    const folderPath = `uploads/${userId}`;
    const { data, error } = await supabase.storage
      .from('pdf_bucket')
      .list(folderPath, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
      });

    // console.log("Supabase Data:", data);

    if (error) {
      console.error("Supabase List Error:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ success: true, files: [] }); // Handle empty folder
    }

    // Filter out `.emptyFolderPlaceholder`
    const filteredData = data.filter(file => file.name !== ".emptyFolderPlaceholder");

  

    // Use Supabase getPublicUrl()
    const files = filteredData.map((file) => {
      const { data: fileUrl } = supabase.storage
        .from("pdf_bucket")
        .getPublicUrl(`${folderPath}/${file.name}`);

      return {
        name: file.name,
        url: fileUrl.publicUrl,
      };
    });

    return NextResponse.json({ success: true, files });
  } catch (err) {
    console.error('Get Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
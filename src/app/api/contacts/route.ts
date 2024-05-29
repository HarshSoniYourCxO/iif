import { NextResponse } from "next/server";
import { cookies, } from "next/headers";
import { error } from "console";

let clientId = process.env.GOHIGHLEVEL_CLIENT_ID ;
let clientSecret = process.env.GOHIGHLEVEL_CLIENT_SECRET;
let redirectUri = process.env.GOHIGHLEVEL_REDIRECT_URI;
export async function POST(request:Request) {
    const cookieStore = cookies()
  
  try {
    const { code } = await request.json();
    if (!code) {
        return NextResponse.json({ error: 'Authorization code is required',status: 400 });
      }
  
      if (!clientId || !clientSecret || !redirectUri) {
        return NextResponse.json({ error: 'Missing required environment variables',status: 500 });
      }

      /* return NextResponse.json({ message: sheetData, status: 200 }); */
    const resData = await fetch('https://api.gohighlevel.com/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
        }),
      });

      const data = await resData.json();

      if (!resData.ok) {
        return NextResponse.json({ message: data, status: resData.status });
      }

    return NextResponse.json({ message: data, status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error, status: 500 });
  }
}



export async function GET(request:Request) {
    const cookieStore = cookies()
    console.log("hello")

  try {
    const parsed_token = JSON.parse(cookieStore.get('access_token')?.value.trim()??'')

    const resData = await fetch("https://services.leadconnectorhq.com/contacts/?locationId=k5fielI0kEe9IZml91hh", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${parsed_token}`,
        Version:"2021-07-28"
      },
    });


    const res = await resData.json();
    console.log("res",res)


      return NextResponse.json({res, status: 200 });
    }
   catch (error) {
    console.log(error);
    return NextResponse.json({ error: error, status: 500 });
  }
}
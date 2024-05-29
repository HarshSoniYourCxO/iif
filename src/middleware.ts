import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const clientid = process.env.CLIENT_ID
    const clientsecret = process.env.CLIENT_SECRET
    const redirecturi = process.env.REDIRECT_URI

    if(request.nextUrl.pathname.startsWith('/oauth')){
        console.log("heya;looooooo ",process.env.CLIENT_ID)
        const code = request.nextUrl.searchParams.get('code')
        if(!code){
            return NextResponse.next()
        }
        const response = NextResponse.next({request:{headers: new Headers(request.headers)}})
        const resData = await fetch('https://services.leadconnectorhq.com/oauth/token',{
                    method:'POST',
                    headers:{'Content-Type':'application/x-www-form-urlencoded'},
                    body:new URLSearchParams({
                        grant_type:'authorization_code',
                        client_id:clientid as string,
                        client_secret:clientsecret as string,
                        redirect_uri:"http://localhost:3000/oauth/callback",
                        code:code,
                        user_type: 'Location',
                      }
                  )
                })
        
        const data = await resData.json()
        const access_token = JSON.stringify(data.access_token)
        const refresh_token = JSON.stringify(data.refresh_token)
        console.log(JSON.stringify(data))
        const onemonth = new Date(Number(new Date())+ 2592000)
        // const oneyear = new Date(Number(new Date())+ 60 * 60 * 24 * 30)
        response.cookies.set('access_token',access_token,{httpOnly:true,secure:true,sameSite:'none',path:'/',expires:onemonth})
        response.cookies.set('refresh_token',refresh_token,{httpOnly:true,secure:true,sameSite:'none',path:'/',expires:onemonth})
        
        return response
    }

    if(!request.cookies.has('refresh_token')||!request.cookies.get('refresh_token')?.value){
        return NextResponse.redirect('https://marketplace.gohighlevel.com/oauth/chooselocation?response_type=code&redirect_uri=http://localhost:3000/oauth/callback&client_id=66560baac4a88107701bafb6-lwqmzpxx&scope=contacts.readonly%20contacts.write')
    }
    if(request.cookies.has('refresh_token') && !request.cookies.has('access_token')){
        console.log("auth token not found regenerating token")
        const response = NextResponse.next({request:{headers: new Headers(request.headers)}})
        const refresh_token = request.cookies.get('refresh_token')?.value.trim()??''
        //parsed refresh token
        const parsed_refresh_token = JSON.parse(refresh_token)
        const resData = await fetch(`https://services.leadconnectorhq.com/oauth/token`,{
                        method:'POST',
                        headers:{
                        'Content-Type':'application/x-www-form-urlencoded'},
                        body:new URLSearchParams({
                        grant_type:'refresh_token',
                        client_id:clientid as string,
                        client_secret:clientsecret as string,
                        refresh_token:parsed_refresh_token,
        })})
        if(resData.status === 200){
        const data = await resData.json()
        const access_token = JSON.stringify(data.access_token)
        const onemonth = new Date(Number(new Date())+ 2592000)
        response.cookies.set('access_token',access_token,{httpOnly:true,secure:true,sameSite:'strict',path:'/',expires:onemonth})
        }
        else{
            console.log("error in regenerating token")
            return NextResponse.next({request:{headers: new Headers(request.headers)}})
        }
      
        return response
         }
        
        else{
            return NextResponse.next()
        }
}
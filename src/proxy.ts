import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function proxy(req : NextRequest) {

const jwt = await getToken({req})

console.log("jwt from middleware" , jwt);

if(jwt == null) {
    return NextResponse.redirect("http://localhost:3000/login")
}

    return NextResponse.next()
}

export const config = {
    matcher : [ "/shop" ]
}
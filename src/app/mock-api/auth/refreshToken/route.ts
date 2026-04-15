import { NextResponse } from "next/server";
import { generateMockToken } from "../util";


export async function POST (){
    const access = generateMockToken("access");
    
    const now = new Date();

    // 15 minutes from now
    const access_expiry = new Date(now.getTime() + 15 * 60 * 1000);


    return NextResponse.json({
        access,
        access_expiry: access_expiry.toISOString(),
    });
}
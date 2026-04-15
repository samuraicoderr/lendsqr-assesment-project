import { NextResponse } from "next/server";
import { generateMockToken } from "../util";


export async function POST (){
    // const access = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.access_payload_signature";
    // const refresh = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.refresh_payload_signature";
    const access = generateMockToken("access");
    const refresh = generateMockToken("refresh");
    
    const now = new Date();

    // 15 minutes from now
    const access_expiry = new Date(now.getTime() + 15 * 60 * 1000);

    // 7 days from now
    const refresh_expiry = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    return NextResponse.json({
        access,
        refresh,
        access_expiry: access_expiry.toISOString(),
        refresh_expiry: refresh_expiry.toISOString(),
    });
}
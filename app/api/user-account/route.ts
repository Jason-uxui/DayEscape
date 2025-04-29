import { NextRequest, NextResponse } from 'next/server';

// Route xử lý dữ liệu account thay vì server-side rendering
export async function GET(request: NextRequest) {
    return NextResponse.json({ message: "User account data API route" });
} 
import { prisma } from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import React from "react";

export async function GET(req: NextRequest,
    context: { params: Promise<{ appId: string }> }
) {
    const {appId} = await context.params;
    console.log("Fetching chats for appId:", appId);
    try {
        const res = await prisma.chats.findMany({
            where: {
                appId: appId
            }
        })
        return NextResponse.json({ chats: res }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch chats" }, { status: 500 })
    }
}
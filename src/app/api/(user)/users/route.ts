import { getAllusers } from "@/app/(main)/actions/users/users";
import { auth } from "@/auth";
// import { auth } from "@/auth";
import {  NextResponse } from "next/server";

//Get all users
export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const usersAccounts = await getAllusers();
    return NextResponse.json(
      { usersAccounts, message: "Get all users success" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Get all users error" },
      { status: 500 }
    );
  }
}


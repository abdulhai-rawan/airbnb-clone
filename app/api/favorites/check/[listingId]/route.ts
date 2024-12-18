import { NextResponse } from "next/server";
import db from "@/libs/db";
import { currentUser as getCurrentUser } from "@/libs/user";

interface IParams {
  listingId?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string")
    throw new Error("Invalid ID");

  // Check if the favorite exists in the database
  const favorite = await db.favorite.findFirst({
    where: {
      userId: currentUser.id,
      listingId,
    },
  });

  return NextResponse.json({
    isFavorited: Boolean(favorite),
  });
}

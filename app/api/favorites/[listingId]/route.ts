import { NextResponse } from "next/server";
import db from "@/libs/db";
import { currentUser as getCurrentUser } from "@/libs/user";

interface IParams {
  listingId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) return NextResponse.error();

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string")
    throw new Error("Invalid ID");

  // Check if the favorite already exists
  const existingFavorite = await db.favorite.findFirst({
    where: {
      userId: currentUser.id,
      listingId,
    },
  });

  if (existingFavorite) {
    return NextResponse.json({ message: "Already favorited" });
  }

  // Add a new favorite
  const favorite = await db.favorite.create({
    data: {
      userId: currentUser.id,
      listingId,
    },
  });

  return NextResponse.json(favorite);
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string")
    throw new Error("Invalid ID");

  // Delete the favorite
  await db.favorite.deleteMany({
    where: {
      userId: currentUser.id,
      listingId,
    },
  });

  return NextResponse.json({ message: "Favorite removed" });
}

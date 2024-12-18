import { useCallback, useMemo } from "react";

import axios from "axios";
import { toast } from "sonner";
import { useCurrentUser } from "./use-current-user";
import useLoginModal from "./useLoginModal";
import { useRouter } from "next/navigation";

interface IUseFavorite {
  listingId: string;
}

const useFavorite = ({ listingId }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const currentUser = useCurrentUser();

  // Check if the user has favorited the listing by matching the listingId
  const hasFavorited = useMemo(() => {
    const favoriteListings = currentUser?.favorites || [];
    return favoriteListings.some((fav) => fav.listingId === listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;

        if (hasFavorited) {
          // If already favorited, send a DELETE request
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          // If not favorited, send a POST request
          request = () => axios.post(`/api/favorites/${listingId}`);
        }

        await request();
        router.refresh();
        toast.success("Success");
      } catch (error) {
        toast.error("Something went wrong.");
      }
    },
    [currentUser, hasFavorited, listingId, loginModal, router]
  );

  return { hasFavorited, toggleFavorite };
};

export default useFavorite;

import Container from "@/components/container";
import EmptyState from "@/components/empty-state";
import ListingCard from "@/components/listings/listing-card";
import { currentUser } from "@/libs/user";
import getListings from "@/actions/getListings";

const page = async () => {
  const listings = await getListings();
  const user = await currentUser();

  if (listings.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing: any) => (
          <ListingCard key={listing.id} data={listing} />
        ))}
      </div>
    </Container>
  );
};

export default page;

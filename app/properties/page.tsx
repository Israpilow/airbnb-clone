import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import getCurrentUser from '@/app/actions/getCurrentUser';
import getReservations from '@/app/actions/getReservations';
import TripsClient from '@/app/trips/TripsClient';
import getListings from '@/app/actions/getListings';
import PropertiesClient from '@/app/properties/PropertiesClient';

const PropertiesPage = async () => {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return (
			<ClientOnly>
				<EmptyState title="Unauthorized" subtitle="Please login" />
			</ClientOnly>
		);
	}

	const listings = await getListings({
		userId: currentUser.id,
	});

	if (listings.length === 0) {
		return (
			<ClientOnly>
				<EmptyState
					title="No trips found"
					subtitle="Look like you havent reserved any tryps."
				/>
			</ClientOnly>
		);
	}

	return (
		<ClientOnly>
			<PropertiesClient listings={listings} currentUser={currentUser} />
		</ClientOnly>
	);
};

export default PropertiesPage;

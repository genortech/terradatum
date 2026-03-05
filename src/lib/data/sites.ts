export interface Site {
	id: string;
	lng: number;
	lat: number;
	name: string;
	address: string;
	resistivity: number;
	lastTestDate: string;
	validated: boolean;
	hasImages: boolean;
	readingCount: number;
}

const sydneySuburbs = [
	{ name: 'Sydney CBD', lat: -33.8688, lng: 151.2093 },
	{ name: 'North Sydney', lat: -33.82, lng: 151.21 },
	{ name: 'Parramatta', lat: -33.815, lng: 151.0 },
	{ name: 'Homebush', lat: -33.875, lng: 151.075 },
	{ name: 'Penrith', lat: -33.72, lng: 150.92 },
	{ name: 'Marrickville', lat: -33.92, lng: 151.14 },
	{ name: 'Strathfield', lat: -33.78, lng: 151.08 },
	{ name: 'Chatswood', lat: -33.75, lng: 151.32 },
	{ name: 'Hornsby', lat: -33.7, lng: 151.1 },
	{ name: 'Sutherland', lat: -34.03, lng: 151.06 },
	{ name: 'Liverpool', lat: -33.92, lng: 150.92 },
	{ name: 'Campbelltown', lat: -34.07, lng: 150.41 },
	{ name: 'Blacktown', lat: -33.77, lng: 150.91 },
	{ name: 'Wollongong', lat: -34.43, lng: 150.88 },
	{ name: 'Newcastle', lat: -32.93, lng: 151.78 },
	{ name: 'Bondi', lat: -33.89, lng: 151.27 },
	{ name: 'Manly', lat: -33.8, lng: 151.28 },
	{ name: 'Mosman', lat: -33.83, lng: 151.24 },
	{ name: 'Randwick', lat: -33.91, lng: 151.25 },
	{ name: 'Camperdown', lat: -33.88, lng: 151.18 },
	{ name: 'Ultimo', lat: -33.88, lng: 151.2 },
	{ name: 'Darling Harbour', lat: -33.87, lng: 151.2 },
	{ name: 'Pyrmont', lat: -33.87, lng: 151.19 },
	{ name: 'Glebe', lat: -33.88, lng: 151.18 },
	{ name: 'Leichhardt', lat: -33.88, lng: 151.15 },
	{ name: 'Annandale', lat: -33.88, lng: 151.17 },
	{ name: 'Stanmore', lat: -33.89, lng: 151.16 },
	{ name: 'Enmore', lat: -33.9, lng: 151.17 },
	{ name: 'Newtown', lat: -33.9, lng: 151.18 },
	{ name: 'Erskineville', lat: -33.9, lng: 151.19 },
	{ name: 'St Peters', lat: -33.91, lng: 151.17 },
	{ name: 'Alexandria', lat: -33.91, lng: 151.2 },
	{ name: 'Waterloo', lat: -33.9, lng: 151.21 },
	{ name: 'Zetland', lat: -33.9, lng: 151.22 },
	{ name: 'Rosebery', lat: -33.91, lng: 151.22 },
	{ name: 'Mascot', lat: -33.93, lng: 151.19 },
	{ name: 'Botany', lat: -33.94, lng: 151.2 },
	{ name: 'Kingsford', lat: -33.92, lng: 151.22 },
	{ name: 'Kensington', lat: -33.91, lng: 151.23 },
	{ name: 'Coogee', lat: -33.92, lng: 151.26 },
	{ name: 'Bronte', lat: -33.91, lng: 151.27 },
	{ name: 'Waverley', lat: -33.9, lng: 151.27 },
	{ name: 'Bondi Junction', lat: -33.89, lng: 151.25 },
	{ name: 'Bellevue Hill', lat: -33.89, lng: 151.26 },
	{ name: 'Double Bay', lat: -33.88, lng: 151.26 },
	{ name: 'Point Piper', lat: -33.87, lng: 151.26 },
	{ name: 'Darling Point', lat: -33.87, lng: 151.25 },
	{ name: 'Edgecliff', lat: -33.87, lng: 151.24 },
	{ name: 'Potts Point', lat: -33.86, lng: 151.23 },
	{ name: 'Kings Cross', lat: -33.87, lng: 151.22 },
	{ name: 'Elizabeth Bay', lat: -33.87, lng: 151.24 },
	{ name: 'Rushcutters Bay', lat: -33.87, lng: 151.23 },
	{ name: 'Paddington', lat: -33.88, lng: 151.22 },
	{ name: 'Darlington', lat: -33.89, lng: 151.21 },
	{ name: 'Redfern', lat: -33.89, lng: 151.23 },
	{ name: 'Surry Hills', lat: -33.88, lng: 151.22 },
	{ name: 'Haymarket', lat: -33.88, lng: 151.2 },
	{ name: 'The Rocks', lat: -33.86, lng: 151.2 },
	{ name: 'Millers Point', lat: -33.86, lng: 151.19 },
	{ name: 'Balmain', lat: -33.86, lng: 151.18 },
	{ name: 'Birchgrove', lat: -33.86, lng: 151.19 },
	{ name: 'Rozelle', lat: -33.86, lng: 151.17 },
	{ name: 'Lilyfield', lat: -33.87, lng: 151.16 },
	{ name: 'Dobroyd Point', lat: -33.87, lng: 151.15 },
	{ name: 'Haberfield', lat: -33.88, lng: 151.14 },
	{ name: 'Ashfield', lat: -33.88, lng: 151.13 },
	{ name: 'Summer Hill', lat: -33.89, lng: 151.14 },
	{ name: 'Lewisham', lat: -33.89, lng: 151.15 },
	{ name: 'Warwick Farm', lat: -33.92, lng: 150.94 },
	{ name: 'Cabramatta', lat: -33.9, lng: 150.93 },
	{ name: 'Fairfield', lat: -33.87, lng: 150.95 },
	{ name: 'Bankstown', lat: -33.92, lng: 151.03 },
	{ name: 'Yagoona', lat: -33.91, lng: 151.04 },
	{ name: 'Condell Park', lat: -33.93, lng: 151.02 },
	{ name: 'Panania', lat: -33.94, lng: 151.05 },
	{ name: 'Milperra', lat: -33.95, lng: 151.02 },
	{ name: 'Revesby', lat: -33.95, lng: 151.03 },
	{ name: 'Padstow', lat: -33.96, lng: 151.04 },
	{ name: 'Peakhurst', lat: -33.97, lng: 151.05 },
	{ name: 'Riverwood', lat: -33.96, lng: 151.07 },
	{ name: 'Hurstville', lat: -33.97, lng: 151.1 },
	{ name: 'Mortdale', lat: -33.97, lng: 151.08 },
	{ name: 'Penshurst', lat: -33.98, lng: 151.1 },
	{ name: 'Beverly Hills', lat: -33.99, lng: 151.07 },
	{ name: 'Narwee', lat: -33.99, lng: 151.05 },
	{ name: 'Riverstone', lat: -33.68, lng: 150.87 },
	{ name: 'Schofields', lat: -33.68, lng: 150.87 },
	{ name: 'Quakers Hill', lat: -33.73, lng: 150.89 },
	{ name: 'Marayong', lat: -33.74, lng: 150.9 },
	{ name: 'Prospect', lat: -33.78, lng: 150.9 },
	{ name: 'Greystanes', lat: -33.8, lng: 150.95 },
	{ name: 'Merrylands', lat: -33.83, lng: 150.98 },
	{ name: 'Guildford', lat: -33.85, lng: 150.99 },
	{ name: 'Yennora', lat: -33.86, lng: 150.99 },
	{ name: 'Chipping Norton', lat: -33.88, lng: 150.95 },
	{ name: 'Moorebank', lat: -33.9, lng: 150.96 },
	{ name: 'Wattle Grove', lat: -33.91, lng: 150.95 },
	{ name: 'Holsworthy', lat: -33.97, lng: 150.94 },
	{ name: 'Glenfield', lat: -33.93, lng: 150.93 },
	{ name: 'Casula', lat: -33.95, lng: 150.9 },
	{ name: 'Chipping Norton', lat: -33.88, lng: 150.95 }
];

const streetNames = [
	'Street',
	'Road',
	'Avenue',
	'Parade',
	'Drive',
	'Crescent',
	'Place',
	'Lane',
	'Parade',
	'Highway',
	'Circuit',
	'Vista',
	'Gardens',
	'Terrace',
	'Broadway'
];

const streetNumbers = Array.from({ length: 200 }, (_, i) => i + 1);

function generateRandomDate(): string {
	const now = new Date();
	const fourYearsAgo = 4 * 365;
	const daysAgo = Math.floor(Math.random() * fourYearsAgo);
	now.setDate(now.getDate() - daysAgo);
	return now.toISOString().split('T')[0];
}

function generateAddress(suburb: (typeof sydneySuburbs)[0]): string {
	const num = streetNumbers[Math.floor(Math.random() * streetNumbers.length)];
	const street = streetNames[Math.floor(Math.random() * streetNames.length)];
	const postcode = Math.floor(Math.random() * (2750 - 2000) + 2000);
	return `${num} ${street}, ${suburb.name} NSW ${postcode}`;
}

export function generateSites(count: number = 300): Site[] {
	const sites: Site[] = [];
	const usedAddresses = new Set<string>();

	for (let i = 0; i < count; i++) {
		const suburb = sydneySuburbs[i % sydneySuburbs.length];
		const latOffset = (Math.random() - 0.5) * 0.05;
		const lngOffset = (Math.random() - 0.5) * 0.05;

		let address = generateAddress(suburb);
		while (usedAddresses.has(address)) {
			address = generateAddress(suburb);
		}
		usedAddresses.add(address);

		sites.push({
			id: `site-${i + 1}`,
			name: `${suburb.name} Site ${Math.floor(i / sydneySuburbs.length) + 1}`,
			lat: suburb.lat + latOffset,
			lng: suburb.lng + lngOffset,
			address,
			resistivity: Math.round((Math.random() * 250 + 10) * 10) / 10,
			lastTestDate: generateRandomDate(),
			validated: Math.random() > 0.35,
			hasImages: Math.random() > 0.4,
			readingCount: Math.floor(Math.random() * 20) + 1
		});
	}

	return sites;
}

export const demoSites = generateSites(300);

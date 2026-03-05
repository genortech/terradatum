export type { Site } from './sites';
import type { Site } from './sites';

let sites: Site[] = [];
let intervalId: ReturnType<typeof setInterval> | null = null;
let newSiteId: string | null = null;

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
	{ name: 'Bondi', lat: -33.89, lng: 151.27 }
];

const streetNames = ['Street', 'Road', 'Avenue', 'Parade', 'Drive', 'Crescent', 'Place', 'Lane'];
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

function generateRandomSite(id: number): Site {
	const suburb = sydneySuburbs[Math.floor(Math.random() * sydneySuburbs.length)];
	const latOffset = (Math.random() - 0.5) * 0.05;
	const lngOffset = (Math.random() - 0.5) * 0.05;

	return {
		id: `site-${id}`,
		name: `${suburb.name} Site ${id}`,
		lat: suburb.lat + latOffset,
		lng: suburb.lng + lngOffset,
		address: generateAddress(suburb),
		resistivity: Math.round((Math.random() * 250 + 10) * 10) / 10,
		lastTestDate: generateRandomDate(),
		validated: Math.random() > 0.35,
		hasImages: Math.random() > 0.4,
		readingCount: Math.floor(Math.random() * 20) + 1
	};
}

export function initializeSites(initialSites: Site[]) {
	sites = [...initialSites];
}

export function isInitialized(): boolean {
	return sites.length > 0;
}

export function getSites(): Site[] {
	return sites;
}

export function getNewSiteId(): string | null {
	return newSiteId;
}

export function clearNewSiteId() {
	newSiteId = null;
}

export function startAddingSites() {
	if (intervalId) return;

	let nextId = sites.length + 1;
	console.log(
		`[SiteStore] Starting interval with ${sites.length} existing sites, nextId=${nextId}`
	);

	intervalId = setInterval(
		() => {
			const newSite = generateRandomSite(nextId++);
			sites = [...sites, newSite];
			newSiteId = newSite.id;
			console.log(`[SiteStore] Added new site: ${newSite.name} - Total: ${sites.length}`);
		},
		2 * 60 * 1000
	);
}

export function stopAddingSites() {
	if (intervalId) {
		clearInterval(intervalId);
		intervalId = null;
	}
}

export function resetSites(initialSites: Site[]) {
	stopAddingSites();
	sites = [...initialSites];
}

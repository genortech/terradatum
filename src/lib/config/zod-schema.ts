import { z } from 'zod';

// Wenner 4-pole formula: ρ = 2πaR
// Calculate apparent resistivity from electrode spacing and resistance
export function calculateApparentResistivity(
	electrodeSpacingM: number,
	resistanceOhm: number
): number {
	if (electrodeSpacingM <= 0 || resistanceOhm <= 0) {
		return 0;
	}
	const rho = 2 * Math.PI * electrodeSpacingM * resistanceOhm;
	return Math.round(rho * 100) / 100; // Round to 2 decimal places
}

// Site creation schema
export const siteCreateSchema = z.object({
	address: z.string().min(1, 'Address is required'),
	latitude: z.number().min(-90).max(90, 'Latitude must be between -90 and 90'),
	longitude: z.number().min(-180).max(180, 'Longitude must be between -180 and 180'),
	equipmentMake: z.string().optional(),
	equipmentModel: z.string().optional(),
	calibrationDate: z.string().optional()
});

// Reading creation schema
export const readingCreateSchema = z
	.object({
		electrodeSpacingM: z
			.number()
			.positive('Electrode spacing must be positive')
			.max(100, 'Electrode spacing seems unreasonably large'),
		resistanceOhm: z.number().nonnegative('Resistance cannot be negative')
	})
	.transform((data) => ({
		...data,
		apparentResistivityOhmM: calculateApparentResistivity(
			data.electrodeSpacingM,
			data.resistanceOhm
		)
	}));

// Multiple readings schema
export const readingsCreateSchema = z
	.array(readingCreateSchema)
	.min(1, 'At least one reading is required');

// Image upload schema (for validation after upload)
export const imageUploadSchema = z.object({
	filename: z.string().min(1, 'Filename is required'),
	filepath: z.string().min(1, 'Filepath is required')
});

// Allowed file types for image uploads
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
export const MAX_IMAGE_SIZE_MB = 5;
export const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;

// Validate image file
export function validateImageFile(file: File): { valid: boolean; error?: string } {
	if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
		return { valid: false, error: `File type must be jpg or png, got ${file.type}` };
	}

	if (file.size > MAX_IMAGE_SIZE_BYTES) {
		return {
			valid: false,
			error: `File size must be less than ${MAX_IMAGE_SIZE_MB}MB, got ${(file.size / 1024 / 1024).toFixed(2)}MB`
		};
	}

	return { valid: true };
}

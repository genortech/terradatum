import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { relations, sql } from 'drizzle-orm';

export const project = sqliteTable('projet', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	address: text('address').notNull(),
	latitude: real('latitude').notNull(),
	longitude: real('longitude').notNull(),
	equipmentMake: text('equipment_make'),
	equipmentModel: text('equipment_model'),
	calibrationDate: text('calibration_date'),
	createdAt: integer('created_at', { mode: 'timestamp_ms' })
		.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
		.notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
		.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull()
});

export const readings = sqliteTable('readings', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	projectId: text('project_id')
		.notNull()
		.references(() => project.id, { onDelete: 'cascade' }),
	electrodeSpacingM: real('electrode_spacing_m').notNull(),
	resistanceOhm: real('resistance_ohm').notNull(),
	apparentResistivityOhmM: real('apparent_resistivity_ohm_m'),
	createdAt: integer('created_at', { mode: 'timestamp_ms' })
		.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
		.notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
		.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull()
});

// Images table - evidence photos for test sites
export const images = sqliteTable('images', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	projectId: text('project_id')
		.notNull()
		.references(() => project.id, { onDelete: 'cascade' }),
	filename: text('filename').notNull(),
	filepath: text('filepath').notNull(),
	uploadedAt: text('uploaded_at')
		.notNull()
		.$defaultFn(() => new Date().toISOString())
});

// Relations
export const sitesRelations = relations(project, ({ many }) => ({
	readings: many(readings),
	images: many(images)
}));

export const readingsRelations = relations(readings, ({ one }) => ({
	site: one(project, {
		fields: [readings.projectId],
		references: [project.id]
	})
}));

export const imagesRelations = relations(images, ({ one }) => ({
	site: one(project, {
		fields: [images.projectId],
		references: [project.id]
	})
}));

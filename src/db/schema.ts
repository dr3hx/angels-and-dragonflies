import { pgTable, serial, text, timestamp, jsonb, boolean } from 'drizzle-orm/pg-core';

// Users table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  resetPasswordToken: text('reset_password_token'),
  resetPasswordExpiration: timestamp('reset_password_expiration'),
  loginAttempts: serial('login_attempts').default(0),
  lockUntil: timestamp('lock_until'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Media table
export const media = pgTable('media', {
  id: serial('id').primaryKey(),
  filename: text('filename').notNull(),
  mimeType: text('mime_type').notNull(),
  filesize: serial('filesize').notNull(),
  width: serial('width'),
  height: serial('height'),
  sizes: jsonb('sizes'),
  url: text('url').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Pages table
export const pages = pgTable('pages', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  content: jsonb('content'),
  meta: jsonb('meta'),
  published: boolean('published').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Posts table
export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  content: jsonb('content'),
  meta: jsonb('meta'),
  published: boolean('published').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Programs table
export const programs = pgTable('programs', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  content: jsonb('content'),
  meta: jsonb('meta'),
  published: boolean('published').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Events table
export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date'),
  location: text('location'),
  content: jsonb('content'),
  meta: jsonb('meta'),
  published: boolean('published').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Categories table
export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

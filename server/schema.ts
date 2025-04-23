import {
  pgTable,
  text,
  integer,
  timestamp,
  boolean,
  pgEnum,
  primaryKey,
} from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

export const RoleEnum = pgEnum("roles", ["user", "admin"]);

export const user = pgTable("user", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: boolean("emailVerified"),
  emailVerifiedDate: timestamp("emailVerifiedDate", { mode: "date" }),
  image: text("image"),
  password: text("password"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  twoFactorEnabled: boolean("twoFactorEnabled").default(false),
  role: RoleEnum("roles").default("user"),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable(
  "verification",
  {
    id: text("id")
      .notNull()
      .$defaultFn(() => createId()),
    token: text("token"),
    email: text("email"),
    identifier: text("identifier"),
    value: text("value"),
    expiresAt: timestamp("expires_at"),
    createdAt: timestamp("created_at"),
    updatedAt: timestamp("updated_at"),
    expires: timestamp("expires", { mode: "date" }),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.id] }),
  })
);

export const passwordResetTokens = pgTable(
    "password_reset_tokens",
    {
        id: text("id")
            .notNull()
            .$defaultFn(() => createId()),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
        email: text("email").notNull()
    },
    (vt) => ({
        compoundKey: primaryKey({ columns: [vt.id, vt.token] }),
    })
)

export const twoFactorTokens = pgTable(
    "two_factor_tokens",
    {
        id: text("id")
            .notNull()
            .$defaultFn(() => createId()),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
        email: text("email").notNull()
    },
    (vt) => ({
        compoundKey: primaryKey({ columns: [vt.id, vt.token] }),
    })
)
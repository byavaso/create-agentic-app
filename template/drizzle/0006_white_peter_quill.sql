CREATE TABLE "fetched_items" (
	"id" text PRIMARY KEY NOT NULL,
	"source_id" text NOT NULL,
	"title" text NOT NULL,
	"url" text NOT NULL,
	"published_at" timestamp,
	"status" text DEFAULT 'pending' NOT NULL,
	"processed_news_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "news_sources" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"url" text NOT NULL,
	"type" text DEFAULT 'rss' NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"last_fetched_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "fetched_items" ADD CONSTRAINT "fetched_items_source_id_news_sources_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."news_sources"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "news_sources" ADD CONSTRAINT "news_sources_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "fetched_items_source_id_idx" ON "fetched_items" USING btree ("source_id");--> statement-breakpoint
CREATE INDEX "fetched_items_url_idx" ON "fetched_items" USING btree ("url");--> statement-breakpoint
CREATE INDEX "news_sources_user_id_idx" ON "news_sources" USING btree ("user_id");
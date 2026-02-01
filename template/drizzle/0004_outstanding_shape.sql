CREATE TABLE "localized_news" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"original_article" text NOT NULL,
	"localized_article" text NOT NULL,
	"headline" text NOT NULL,
	"seo_title" text,
	"seo_description" text,
	"region" text NOT NULL,
	"region_label" text NOT NULL,
	"style" text NOT NULL,
	"editorial_score" text,
	"editorial_notes" text,
	"local_relevance" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "localized_news" ADD CONSTRAINT "localized_news_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "localized_news_user_id_idx" ON "localized_news" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "localized_news_created_at_idx" ON "localized_news" USING btree ("created_at");
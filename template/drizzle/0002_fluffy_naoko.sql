CREATE TABLE "research" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"query" text NOT NULL,
	"title" text NOT NULL,
	"report" text NOT NULL,
	"sources" text NOT NULL,
	"template" text NOT NULL,
	"elapsed_time" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "video_news" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"video_id" text,
	"video_url" text,
	"video_title" text,
	"transcript" text NOT NULL,
	"transcript_source" text NOT NULL,
	"article" text NOT NULL,
	"headline" text,
	"news_style" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "research" ADD CONSTRAINT "research_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "video_news" ADD CONSTRAINT "video_news_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "research_user_id_idx" ON "research" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "research_created_at_idx" ON "research" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "video_news_user_id_idx" ON "video_news" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "video_news_created_at_idx" ON "video_news" USING btree ("created_at");
CREATE TABLE "generated_images" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"prompt" text NOT NULL,
	"smart_name" text NOT NULL,
	"model" text NOT NULL,
	"aspect_ratio" text NOT NULL,
	"resolution" text NOT NULL,
	"image_url" text,
	"image_base64" text,
	"thumbnail_base64" text,
	"mime_type" text NOT NULL,
	"drive_file_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "generated_images" ADD CONSTRAINT "generated_images_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "generated_images_user_id_idx" ON "generated_images" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "generated_images_created_at_idx" ON "generated_images" USING btree ("created_at");
set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."products" (
	"productId" serial NOT NULL,
	"productName" TEXT NOT NULL UNIQUE,
	"price" DECIMAL NOT NULL,
	"description" TEXT NOT NULL,
	"image" TEXT NOT NULL,
	"category" TEXT NOT NULL,
	CONSTRAINT "products_pk" PRIMARY KEY ("productId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."customers" (
	"customerId" serial NOT NULL,
	"username" TEXT NOT NULL,
	"password" TEXT NOT NULL,
	"email" TEXT NOT NULL,
	CONSTRAINT "customers_pk" PRIMARY KEY ("customerId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."orders" (
	"orderId" serial NOT NULL,
	"customerId" integer NOT NULL,
	"dateTime" TIMESTAMP NOT NULL,
	CONSTRAINT "orders_pk" PRIMARY KEY ("orderId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."orderedProducts_map" (
	"orderedProductId" serial NOT NULL,
	"orderId" integer NOT NULL,
	"productQuantity" integer NOT NULL,
	"productName" TEXT NOT NULL,
	"price" DECIMAL NOT NULL,
	"description" TEXT NOT NULL,
	"image" TEXT NOT NULL,
	-- "category" TEXT NOT NULL,
	"productId" bigint NOT NULL,
	CONSTRAINT "orderedProducts_map_pk" PRIMARY KEY ("orderedProductId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."carts" (
	"cartId" serial NOT NULL,
	"customerId" integer NOT NULL,
	CONSTRAINT "carts_pk" PRIMARY KEY ("cartId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."cartedProducts_map" (
	"cartedProductId" serial NOT NULL,
	"cartId" integer NOT NULL,
	"productId" integer NOT NULL,
	"productQuantity" integer NOT NULL,
	CONSTRAINT "cartedProducts_map_pk" PRIMARY KEY ("cartedProductId")
) WITH (
  OIDS=FALSE
);





ALTER TABLE "orders" ADD CONSTRAINT "orders_fk0" FOREIGN KEY ("customerId") REFERENCES "customers"("customerId");

ALTER TABLE "orderedProducts_map" ADD CONSTRAINT "orderedProducts_map_fk0" FOREIGN KEY ("orderId") REFERENCES "orders"("orderId");
ALTER TABLE "orderedProducts_map" ADD CONSTRAINT "orderedProducts_map_fk1" FOREIGN KEY ("productId") REFERENCES "products"("productId");

ALTER TABLE "carts" ADD CONSTRAINT "carts_fk0" FOREIGN KEY ("customerId") REFERENCES "customers"("customerId");

ALTER TABLE "cartedProducts_map" ADD CONSTRAINT "cartedProducts_map_fk0" FOREIGN KEY ("cartId") REFERENCES "carts"("cartId");
ALTER TABLE "cartedProducts_map" ADD CONSTRAINT "cartedProducts_map_fk1" FOREIGN KEY ("productId") REFERENCES "products"("productId");

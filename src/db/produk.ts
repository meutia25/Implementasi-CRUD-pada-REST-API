
import { Elysia } from "elysia";
import { db } from "./index";
import { productsTable } from "./schema";
import { eq } from "drizzle-orm";

export const produkRoute = new Elysia({
    prefix: "/produk"
});

// GET: menampilkan semua produk
produkRoute.get("/", async () => {
    const data = await db.select().from(productsTable);
    return data;
});

// GET: menampilkan produk berdasarkan ID
produkRoute.get("/:id", async ({ params }) => {
    const id = Number(params.id);

    const data = await db
        .select()
        .from(productsTable)
        .where(eq(productsTable.id, id));

    return data;
});

// POST: menambahkan produk
produkRoute.post("/", async ({ body }) => {
    const produk = body as typeof productsTable.$inferInsert;

    const data = await db
        .insert(productsTable)
        .values(produk)
        .returning();

    return data;
});


produkRoute.put("/:id", async ({ params, body }) => {
    const id = Number(params.id);
    const produk = body as Partial<typeof productsTable.$inferInsert>;

    const data = await db
        .update(productsTable)
        .set(produk)
        .where(eq(productsTable.id, id))
        .returning();

    return data;
});


produkRoute.delete("/:id", async ({ params }) => {
    const id = Number(params.id);

    const data = await db
        .delete(productsTable)
        .where(eq(productsTable.id, id))
        .returning();

    return data;
});

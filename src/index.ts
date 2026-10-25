
import { Elysia } from "elysia";
import { mahasiswaRoute } from "./routes/mahasiswa";
import { produkRoute } from "./db/produk";

const app = new Elysia()
  .get("/", () => ({
    message: "API berjalan!",
  }))
  .get("/echo/:pesan", ({ params }) => ({
    echo: params.pesan,
  }));

app.use(mahasiswaRoute);
app.use(produkRoute);

app.listen(process.env.PORT || 3001);

console.log(
  `Server berjalan pada http://${app.server?.hostname}:${app.server?.port}`
);

import cors from "cors";
import express from "express";
import { routes } from "./routes";

const app = express();
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
app.use(cors());
app.use(express.json()); //middleware
app.use(routes);

app.listen(process.env.PORT || 3333, () => {
  console.log("👂Listening server...");
});

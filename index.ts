import express from "express";
import dotenv from "dotenv";

import { routerEspacios } from "./src/espacios/infrastructure/rest/espacio.rest";
import { routerWebDepartamentos } from "./src/departamentos/infrastructure/web/departamento.web";
import { routerDepartamentos } from "./src/departamentos/infrastructure/rest/departamento.rest";

dotenv.config();
const port = process.env.PORT;

const app = express();
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use(express.static(__dirname + "/public"));
app.use("/departamentos", routerWebDepartamentos);

//routers
const api = "api/";
app.use(`/${api}espacios`, routerEspacios);
app.use(`/${api}departamentos`, routerDepartamentos);

app.listen(process.env.PORT, () => {
  console.log(`Application started on port ${port}`);
});

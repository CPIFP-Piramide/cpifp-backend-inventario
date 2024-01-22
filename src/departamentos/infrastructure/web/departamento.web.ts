import express, { Request, Response } from "express";

//use cases
import DepartamentoUseCases from "../../application/departamento.usecases";
//repositories
import DepartamentoRepositoryPostgres from "../db/departamento.postgres";
import Departamento from "../../domain/Departamento";
import Articulo from "../../../articulos/domain/Articulo";

const departamentoUseCases: DepartamentoUseCases = new DepartamentoUseCases(
  new DepartamentoRepositoryPostgres()
);

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const departamentos = await departamentoUseCases.find();
    res.render("departamentos", { departamentos });
  } catch (error) {
    res.send(error);
  }
});

router.get("/:nombre", async (req: Request, res: Response) => {
  try {
    const departamento: Departamento = await departamentoUseCases.findByName(
      req.params.nombre
    );
    const articulos: Articulo[] = await departamentoUseCases.findArticulos(
      departamento
    );
    res.render("departamento", { departamento, articulos });
  } catch (error) {
    res.send(error);
  }
});

export { router as routerWebDepartamentos };

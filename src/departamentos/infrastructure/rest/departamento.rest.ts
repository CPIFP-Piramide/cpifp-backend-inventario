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
    const data = await departamentoUseCases.find();
    res.send(data);
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
    departamento.articulos = articulos;
    res.send(departamento);
  } catch (error) {
    res.send(error);
  }
});

router.get("/:nombre/espacio/:espacio", async (req: Request, res: Response) => {
  try {
    const departamento: Departamento = await departamentoUseCases.findByName(
      req.params.nombre
    );
    const articulos: Articulo[] = await departamentoUseCases.findArticulos(
      departamento,
      req.params.espacio
    );
    departamento.articulos = articulos;
    res.send(departamento);
  } catch (error) {
    res.send(error);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const departamento: Departamento = {
      nombre: req.body.nombre,
    };
    await departamentoUseCases.create(departamento);
    const departamentoCreado: Departamento =
      await departamentoUseCases.findByName(req.body.nombre);
    res.send(departamentoCreado);
  } catch (error) {
    res.send(error);
  }
});

router.post("/:nombre", async (req: Request, res: Response) => {
  try {
    const articulo: Articulo = {
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      espacio: req.body.espacio,
    };
    const departamento: Departamento = await departamentoUseCases.findByName(
      req.params.nombre
    );
    await departamentoUseCases.add(departamento, articulo);
    const articulos: Articulo[] = await departamentoUseCases.findArticulos(
      departamento
    );
    departamento.articulos = articulos;
    res.send(departamento);
  } catch (error) {
    res.send(error);
  }
});

router.put("/:nombre/articulo/:id", async (req: Request, res: Response) => {
  try {
    const articulo: Articulo = {
      id: Number(req.params.id),
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      espacio: req.body.espacio,
    };
    const departamento: Departamento = await departamentoUseCases.findByName(
      req.params.nombre
    );
    await departamentoUseCases.update(departamento, articulo);
    const articulos: Articulo[] = await departamentoUseCases.findArticulos(
      departamento
    );
    departamento.articulos = articulos;
    res.send(departamento);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:nombre/articulo/:id", async (req: Request, res: Response) => {
  try {
    const articulo: Articulo = {
      id: Number(req.params.id),
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      espacio: req.body.espacio,
    };
    const departamento: Departamento = await departamentoUseCases.findByName(
      req.params.nombre
    );
    await departamentoUseCases.delete(departamento, articulo);
    const articulos: Articulo[] = await departamentoUseCases.findArticulos(
      departamento
    );
    departamento.articulos = articulos;
    res.send(departamento);
  } catch (error) {
    res.send(error);
  }
});

export { router as routerDepartamentos };

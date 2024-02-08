import express, { Request, Response } from "express";

//use cases
import ArticuloUseCases from "../../application/articulo.usecases";
//repositories
import Departamento from "../../domain/Departamento";
import Articulo from "../../domain/Articulo";
import ArticuloRepositoryPostgres from "../db/articulo.postgres";
import { isAuth } from "../../../context/security/auth";

const articuloUseCases: ArticuloUseCases = new ArticuloUseCases(
  new ArticuloRepositoryPostgres()
);

const router = express.Router();

router.get("/", isAuth, async (req: Request, res: Response) => {
  try {
    const data = await articuloUseCases.find();
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const articulo: Articulo = await articuloUseCases.findById(
      Number(req.params.id)
    );
    res.send(articulo);
  } catch (error) {
    res.send(error);
  }
});
/*
router.get("/:nombre/aula/:aula", async (req: Request, res: Response) => {
  try {
    const departamento: Departamento = await articuloUseCases.findByName(
      req.params.nombre
    );
    const articulos: Articulo[] = await articuloUseCases.findArticulos(
      departamento,
      req.params.aula
    );
    departamento.articulos = articulos;
    res.send(departamento);
  } catch (error) {
    res.send(error);
  }
});

router.post("/:nombre", async (req: Request, res: Response) => {
  try {
    const articulo: Articulo = {
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      aula: req.body.aula,
      categoria: req.body.categoria,
      subcategoria: req.body.subcategoria,
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
      aula: req.body.aula,
      categoria: req.body.categoria,
      subcategoria: req.body.subcategoria,
      fechabaja: req.body.fechabaja,
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
*/
export { router as routerArticulos };

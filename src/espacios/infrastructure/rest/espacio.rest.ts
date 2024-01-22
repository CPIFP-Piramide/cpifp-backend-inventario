import express, { Request, Response } from "express";

//use cases
import EspacioUseCases from "../../application/espacio.usecases";
//repositories
import espacios from "../data/espacio.json";

const espaciosUseCases: EspacioUseCases = new EspacioUseCases(espacios);

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const data = await espaciosUseCases.find();
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

export { router as routerEspacios };

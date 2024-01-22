import Articulo from "../../articulos/domain/Articulo";
import Departamento from "./Departamento";

export default interface DepartamentoRepository {
  find(): Promise<Departamento[]>;
  findByName(nombre: string): Promise<Departamento>;
  findArticulos(
    departamento: Departamento,
    espacio?: string
  ): Promise<Articulo[]>;
  create(departamento: Departamento): Promise<void>;
  add(departamento: Departamento, articulo: Articulo): Promise<void>;
  update(departamento: Departamento, articulo: Articulo): Promise<void>;
  delete(departamento: Departamento, articulo: Articulo): Promise<void>;
}

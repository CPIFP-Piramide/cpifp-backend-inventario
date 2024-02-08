import Articulo from "./Articulo";
import Departamento from "./Departamento";

export default interface ArticuloRepository {
  find(): Promise<Articulo[]>;
  findById(id: number): Promise<Articulo>;
  findByDepartamento(departamento: Departamento): Promise<Articulo[]>;
  findArticulos(
    departamento: Departamento,
    aula?: string,
    categoria?: string,
    subcategoria?: string
  ): Promise<Articulo[]>;
  add(departamento: Departamento, articulo: Articulo): Promise<void>;
  update(departamento: Departamento, articulo: Articulo): Promise<void>;
  delete(departamento: Departamento, articulo: Articulo): Promise<void>;
}

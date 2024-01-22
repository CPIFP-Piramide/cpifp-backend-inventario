import Articulo from "../../articulos/domain/Articulo";

export default interface Departamento {
  nombre: string;
  articulos?: Articulo[];
}

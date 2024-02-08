import Articulo from "./Articulo";

export default interface Departamento {
  nombre: string;
  articulos?: Articulo[];
}

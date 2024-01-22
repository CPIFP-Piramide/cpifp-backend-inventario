import Articulo from "../../../articulos/domain/Articulo";
import executeQuery from "../../../context/db/postgres.connector";
import Departamento from "../../domain/Departamento";
import DepartamentoRepository from "../../domain/departamento.repository";

export default class DepartamentoRepositoryPostgres
  implements DepartamentoRepository
{
  async find(): Promise<Departamento[]> {
    const departamentos: Departamento[] = [];
    try {
      const result: any[] = await executeQuery("select * from departamentos");
      for (const item of result) {
        const departamento: Departamento = {
          nombre: item.nombre,
        };
        departamentos.push(departamento);
      }
    } catch (err) {
      console.error(err);
    }
    return departamentos;
  }

  async findByName(nombre: string): Promise<Departamento> {
    const result: any[] = await executeQuery(
      `select * from departamentos where nombre = '${nombre}'`
    );
    if (result.length > 0) {
      const departamento: Departamento = {
        nombre: result[0].nombre,
      };
      return departamento;
    } else {
      throw new Error("No se ha encontrado el departamento");
    }
  }

  async findArticulos(
    departamento: Departamento,
    espacio?: string
  ): Promise<Articulo[]> {
    const articulos: Articulo[] = [];
    try {
      let query = `select * from articulos where departamento = '${departamento.nombre}'`;
      if (espacio) {
        query += ` and espacio = '${espacio}'`;
      }
      const result: any[] = await executeQuery(query);
      for (const item of result) {
        const articulo: Articulo = {
          id: item.id,
          nombre: item.nombre,
          descripcion: item.descripcion,
          espacio: item.espacio,
        };
        articulos.push(articulo);
      }
    } catch (err) {
      console.error(err);
    }
    return articulos;
  }

  async create(departamento: Departamento): Promise<void> {
    const query = `insert into departamentos(nombre) values('${departamento.nombre}')`;
    await executeQuery(query);
  }

  async add(departamento: Departamento, articulo: Articulo): Promise<void> {
    const query = `insert into articulos(nombre, descripcion, espacio, departamento) values('${articulo.nombre}', '${articulo.descripcion}', '${articulo.espacio}', '${departamento.nombre}')`;
    await executeQuery(query);
  }

  async update(departamento: Departamento, articulo: Articulo): Promise<void> {
    const query = `update articulos set nombre = '${articulo.nombre}', descripcion = '${articulo.descripcion}', espacio = '${articulo.espacio}' where id = ${articulo.id} and departamento = '${departamento.nombre}'`;
    await executeQuery(query);
  }

  async delete(departamento: Departamento, articulo: Articulo): Promise<void> {
    const query = `delete from articulos where id = ${articulo.id} and departamento = '${departamento.nombre}'`;
    await executeQuery(query);
  }
}

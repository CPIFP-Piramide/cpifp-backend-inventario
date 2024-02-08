import Articulo from "../../domain/Articulo";
import executeQuery from "../../../context/db/postgres.connector";
import Departamento from "../../domain/Departamento";
import ArticuloRepository from "../../domain/articulo.repository";

export default class ArticuloRepositoryPostgres implements ArticuloRepository {
  async find(): Promise<Articulo[]> {
    const articulos: Articulo[] = [];
    try {
      const result: any[] = await executeQuery("select * from articulos");
      for (const item of result) {
        const articulo: Articulo = {
          id: item.id,
          nombre: item.nombre,
          descripcion: item.descripcion,
          aula: item.aula,
          categoria: item.categoria,
          subcategoria: item.subcategoria,
          fechabaja: item.fechabaja,
        };
        articulos.push(articulo);
      }
    } catch (err) {
      console.error(err);
    }
    return articulos;
  }

  async findById(id: number): Promise<Articulo> {
    const result: any[] = await executeQuery(
      `select * from articulos where id = ${id}`
    );
    if (result.length === 0) {
      throw new Error("Articulo no encontrado");
    }
    let articulo: Articulo = {};
    for (const item of result) {
      articulo = {
        id: item.id,
        nombre: item.nombre,
        descripcion: item.descripcion,
        aula: item.aula,
        categoria: item.categoria,
        subcategoria: item.subcategoria,
        fechabaja: item.fechabaja,
      };
    }
    return articulo;
  }

  async findByDepartamento(departamento: Departamento): Promise<Articulo[]> {
    const articulos: Articulo[] = [];
    try {
      const result: any[] = await executeQuery(
        `select * from articulos where id in (select articulo from articulos_departamentos where departamento = '${departamento.nombre}')`
      );
      for (const item of result) {
        const articulo: Articulo = {
          id: item.id,
          nombre: item.nombre,
          descripcion: item.descripcion,
          aula: item.aula,
          categoria: item.categoria,
          subcategoria: item.subcategoria,
          fechabaja: item.fechabaja,
        };
        articulos.push(articulo);
      }
    } catch (err) {
      console.error(err);
    }
    return articulos;
  }

  async findArticulos(
    departamento: Departamento,
    aula?: string,
    categoria?: string,
    subcategoria?: string
  ): Promise<Articulo[]> {
    const articulos: Articulo[] = [];
    try {
      let query = `select * from articulos where id in (select articulo from articulos_departamento where departamento = '${departamento.nombre}')`;
      if (aula) {
        query += ` and aula = '${aula}'`;
      }
      if (categoria) {
        query += ` and categoria = '${categoria}'`;
      }
      if (subcategoria) {
        query += ` and subcategoria = '${subcategoria}'`;
      }
      const result: any[] = await executeQuery(query);
      for (const item of result) {
        const articulo: Articulo = {
          id: item.id,
          nombre: item.nombre,
          descripcion: item.descripcion,
          aula: item.aula,
          categoria: item.categoria,
          subcategoria: item.subcategoria,
          fechabaja: item.fechabaja,
        };
        articulos.push(articulo);
      }
    } catch (err) {
      console.error(err);
    }
    return articulos;
  }

  async add(departamento: Departamento, articulo: Articulo): Promise<void> {
    const query = `insert into articulos (id, nombre, descripcion, aula, categoria, subcategoria) values (${articulo.id}, '${articulo.nombre}', '${articulo.descripcion}', '${articulo.aula}', '${articulo.categoria}', '${articulo.subcategoria}')`;
    await executeQuery(query);
    const query2 = `insert into articulos_departamento (articulo, departamento) values (${articulo.id}, '${departamento.nombre}')`;
    await executeQuery(query2);
  }

  async update(departamento: Departamento, articulo: Articulo): Promise<void> {
    const query = `update articulos set nombre = '${articulo.nombre}', descripcion = '${articulo.descripcion}', aula = '${articulo.aula}', categoria = '${articulo.categoria}', subcategoria = '${articulo.subcategoria}', fechabaja = '${articulo.fechabaja}' where id = ${articulo.id} and departamento = '${departamento.nombre}'`;
    await executeQuery(query);
  }

  async delete(departamento: Departamento, articulo: Articulo): Promise<void> {
    const query = `delete from articulos_departamento where articulo = ${articulo.id} and departamento = '${departamento.nombre}'`;
    await executeQuery(query);
    const query2 = `delete from articulos where id = ${articulo.id} and departamento = '${departamento.nombre}'`;
    await executeQuery(query2);
  }
}

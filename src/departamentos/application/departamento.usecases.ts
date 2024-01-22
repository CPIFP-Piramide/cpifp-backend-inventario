import Articulo from "../../articulos/domain/Articulo";
import Departamento from "../domain/Departamento";
import DepartamentoRepository from "../domain/departamento.repository";

export default class DepartamentoUseCases {
  constructor(private departamentoRepository: DepartamentoRepository) {}
  async find() {
    return await this.departamentoRepository.find();
  }

  async findByName(nombre: string) {
    return await this.departamentoRepository.findByName(nombre);
  }

  async findArticulos(departamento: Departamento, espacio?: string) {
    return await this.departamentoRepository.findArticulos(
      departamento,
      espacio
    );
  }

  async create(departamento: Departamento) {
    return await this.departamentoRepository.create(departamento);
  }

  async add(departamento: Departamento, articulo: Articulo) {
    return await this.departamentoRepository.add(departamento, articulo);
  }

  async update(departamento: Departamento, articulo: Articulo) {
    return await this.departamentoRepository.update(departamento, articulo);
  }

  async delete(departamento: Departamento, articulo: Articulo) {
    return await this.departamentoRepository.delete(departamento, articulo);
  }
}

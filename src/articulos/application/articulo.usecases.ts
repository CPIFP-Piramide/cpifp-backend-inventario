import Articulo from "../domain/Articulo";
import Departamento from "../domain/Departamento";
import ArticuloRepository from "../domain/articulo.repository";

export default class ArticuloUseCases {
  constructor(private articuloRepository: ArticuloRepository) {}
  async find(): Promise<Articulo[]> {
    return await this.articuloRepository.find();
  }

  async findByDepartamento(departamento: Departamento): Promise<Articulo[]> {
    return await this.articuloRepository.findByDepartamento(departamento);
  }

  async findById(id: number): Promise<Articulo> {
    return await this.articuloRepository.findById(id);
  }

  async findArticulos(departamento: Departamento, aula?: string) {
    return await this.articuloRepository.findArticulos(departamento, aula);
  }

  async add(departamento: Departamento, articulo: Articulo) {
    return await this.articuloRepository.add(departamento, articulo);
  }

  async update(departamento: Departamento, articulo: Articulo) {
    return await this.articuloRepository.update(departamento, articulo);
  }

  async delete(departamento: Departamento, articulo: Articulo) {
    return await this.articuloRepository.delete(departamento, articulo);
  }
}

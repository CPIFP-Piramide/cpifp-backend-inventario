import Espacio from "../domain/Espacio";

export default class EspacioUseCases {
  constructor(private espacios: Espacio[]) {}
  async find() {
    return await this.espacios;
  }
}

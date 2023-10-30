import Consulta from '../../database/models/Consulta.js';

export class ConsultaService {
  async findManyById(id) {
    const consultas = await Consulta.find({ userId: id });

    return consultas;
  }
}

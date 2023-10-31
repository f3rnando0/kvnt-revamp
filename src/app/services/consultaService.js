import Consulta from '../../database/models/Consulta.js';

export class ConsultaService {
  async create(userId, keyword, range, rowsTotal, userInput) {
    const consulta = await Consulta.create({
      userId,
      keyword,
      range,
      rowsTotal,
      userInput,
    });
    if (!consulta) return null;

    return consulta;
  }

  async findOne(id) {
    const consulta = await Consulta.findOne({ _id: id });

    return consulta;
  }

  async findManyById(id) {
    const consultas = await Consulta.find({ userId: id });

    return consultas;
  }

  async findLastestByDateAndKeyword(keyword) {
    const lastest = await Consulta.find()
      .where('keyword')
      .equals(keyword)
      .where('userId')
      .equals(this.id)
      .sort({ createdAt: -1 });

    return lastest;
  }

  async hasDomainFileOrNot(id) {
    const doesntHasFile = await Consulta.findOne({
      _id: id,
      'files.withDomain': '',
    });

    return doesntHasFile;
  }

  async hasUserPasswordFileOrNot(id) {
    const doesntHasFile = await Consulta.findOne({
      _id: id,
      'files.withoutDomain': '',
    });

    return doesntHasFile;
  }

  async setDomainFile(id, fileId) {
    const consulta = await Consulta.findOne({ _id: id });
    if (!consulta) return null;

    consulta.files.withDomain = fileId;
    await consulta.save();
    return consulta;
  }

  async setUserPasswordFile(id, fileId) {
    const consulta = await Consulta.findOne({ _id: id });
    if (!consulta) return null;

    consulta.files.withoutDomain = fileId;
    await consulta.save();
    return consulta;
  }
}

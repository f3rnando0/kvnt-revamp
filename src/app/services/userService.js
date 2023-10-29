import User from '../../database/models/User.js';

export class UserService {
  constructor(id) {
    this.id = id;
  }

  async create(lang) {
    if (lang === 'br') lang = 'portuguese';
    if (lang === 'en') lang = 'english';

    const user = await User.create({ _id: this.id, preferredLanguage: lang });

    if (!user) return null;

    return user;
  }

  async find() {
    const user = await User.findOne({ _id: this.id });

    if (user) return user;

    return null;
  }

  async findById(id) {
    const user = await User.findOne({ _id: this.id });

    if (!user) return null;

    if (user.admin) {
      const searchedUser = await User.findOne({ _id: id });

      if (!searchedUser) return null;

      return searchedUser;
    }
  }

  async addBalanceById(id, amount, currency) {
    const user = await User.findOne({ _id: this.id });

    if (!user) return null;

    if (user.admin) {
      const searchedUser = await this.findById(id);

      if (!searchedUser) return null;

      if (currency === 'brl') {
        searchedUser.balance.brl = searchedUser.balance.brl + amount;
      } else if (currency === 'usd') {
        searchedUser.balance.usd = searchedUser.balance.usd + amount;
      } else {
        return null;
      }
    }
  }

  async acceptTerms() {
    const user = await User.findOne({ _id: this.id });

    if (!user) return null;

    user.termsAccepted = true;
    await user.save();

    return user;
  }
}

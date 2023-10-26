import User from '../../database/models/User.js';

export class UserService {
  constructor(id) {
    this.id = id;
  }

  async find() {
    const user = await User.findOne({ _id: this.id });

    if(user) return user

    return null
  }
}

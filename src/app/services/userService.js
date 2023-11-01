import dayjs from 'dayjs';
import { prices } from '../../config/prices.js';
import User from '../../database/models/User.js';
import { rows } from '../../config/rows.js';
import { getPlanName } from '../../utils/getPlanName.js';

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
      const searchedUser = await User.findOne({ _id: id });

      if (!searchedUser) return null;

      if (currency === 'brl') {
        searchedUser.balance.brl.amount = searchedUser.balance.brl.amount + amount;
        await searchedUser.save();
        return searchedUser;
      } else if (currency === 'usd') {
        searchedUser.balance.usd.amount = searchedUser.balance.usd.amount + amount;
        await searchedUser.save();
        return searchedUser;
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

  async handleBuy(plan, duration, currency) {
    const user = await User.findOne({ _id: this.id });

    if (!user) return null;
    const price = prices[currency === 'usd' ? 'en' : 'br'][plan][duration];

    if (Math.round(user.balance[currency]['amount']) < price)
      return `Not enough balance.`;

    user.balance.usd.amount = Math.round(
      user.balance[currency]['amount'] - price
    );
    user.subscription.subscribed = true;
    user.subscription.subscriptionType =
      plan === 'initial'
        ? 1
        : plan === 'classic'
        ? 2
        : plan === 'vip'
        ? 3
        : plan === 'primordial'
        ? 4
        : plan === 'business'
        ? 5
        : plan === 'professional'
        ? 6
        : plan === 'maximum'
        ? 7
        : 0;
    user.subscription.expiresAt = dayjs().add(
      duration === 'semanal'
        ? 7
        : duration === 'mensal'
        ? 30
        : duration === 'trimestral'
        ? 90
        : 0,
      'days'
    );
    const modified = await this.modifyDailyRows('handleBuy', rows[plan], plan);
    if (!modified) return null;
    await user.save();
    return user;
  }

  async modifyDailyRows(flow, amount, plan = null) {
    const user = await User.findOne({ _id: this.id });

    if (!user) return null;

    if (flow === 'handleBuy') {
      if (user.subscription.subscribed) return null;

      if (user.rowsTotalDaily === 0 && rows[plan] <= amount) {
        user.rowsTotalDaily = rows[plan];
        user.rowsTotalDailyDateReset = dayjs().add(1, 'days');
        await user.save();
        return user;
      } else {
        return null;
      }
    } else if (flow === 'search') {
      if (!user.subscription.subscribed) return null;
      if (dayjs().isAfter(user.subscription.expiresAt)) return null;

      if (amount > rows[getPlanName(user.subscription.subscriptionType)])
        return null;
      const newAmount = user.rowsTotalDaily - amount;
      if (newAmount > user.rowsTotalDaily) return null;

      user.rowsTotalDaily = user.rowsTotalDaily - amount;
      user.rowsTotal = user.rowsTotal + amount;
      user.lastState = 'none';
      await user.save();
      return user;
    } else if (flow === 'dailyReset') {
      if (amount > rows[getPlanName(user.subscription.subscriptionType)])
        return;
      user.rowsTotalDaily =
        rows[getPlanName(user.subscription.subscriptionType)];
      user.rowsTotalDailyDateReset = dayjs().add('1', 'day');
      await user.save();
      return user;
    }
  }

  async changeState(state) {
    const user = await User.findOne({ _id: this.id });

    if (!user) return null;

    user.lastState = state;
    await user.save();
    return user;
  }

  async handleResetDailyRows() {
    const user = await User.findOne({ _id: this.id });
    if (!user) return;

    if (user.subscription.subscribed) {
      if (dayjs().isAfter(user.subscription.expiresAt)) {
        user.subscription.subscribed = false;
        user.subscription.expiresAt = null;
        user.subscription.subscriptionType = 0;
        user.rowsTotalDailyDateReset = null;
        user.rowsTotalDaily = 0;
        await user.save();
        return;
      } else {
        if (dayjs().isAfter(user.rowsTotalDailyDateReset)) {
          const name = getPlanName(user.subscription.subscriptionType);
          const amount = rows[name];
          await this.modifyDailyRows('dailyReset', amount);
        } else {
          return;
        }
      }
    } else {
      return;
    }
  }

  async blacklist(id) {
    const user = await User.findOne({ _id: id });

    if (!user) return null;
    
    if (user.blacklisted) {
      user.blacklisted = false;
      await user.save();
      return false;
    } else {
      user.blacklisted = true;
      await user.save();
      return true;
    }
  }
}

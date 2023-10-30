export default {
  async execute(array, index, ctx, user) {
    switch (array[index]) {
      case '💻 Planos': {
        const imported = await import(`./inputs/plans.js`);

        imported.default.execute(ctx, array[index], user);
        break;
      }

      case '💻 Plans': {
        const imported = await import(`./inputs/plans.js`);

        imported.default.execute(ctx, array[index], user);
        break;
      }

      case '👤 Perfil': {
        const imported = await import(`./inputs/profile.js`);

        imported.default.execute(ctx, array[index], user);
        break;
      }

      case '👤 Profile': {
        const imported = await import(`./inputs/profile.js`);

        imported.default.execute(ctx, array[index], user);
        break;
      }

      case '🔍 Search': {
        const imported = await import(`./inputs/search.js`);

        imported.default.execute(ctx, array[index], user);
        break;
      }
      case '🔍 Consultar': {
        const imported = await import(`./inputs/search.js`);

        imported.default.execute(ctx, array[index], user);
        break;
      }
      case '💵 Recharge': {
        const imported = await import(`./inputs/recharge.js`);

        imported.default.execute(ctx, array[index], user);
        break;
      }
      case '💵 Recarregar': {
        const imported = await import(`./inputs/recharge.js`);

        imported.default.execute(ctx, array[index], user);
        break;
      }
      case '⭐️ Join our channel!': {
        const imported = await import(`./inputs/channel.js`);

        imported.default.execute(ctx, array[index], user);
        break;
      }
      case '⭐️ Entre no nosso canal!': {
        const imported = await import(`./inputs/channel.js`);

        imported.default.execute(ctx, array[index], user);
        break;
      }
    }
  },
};

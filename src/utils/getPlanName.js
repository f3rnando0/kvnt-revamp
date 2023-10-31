export const getPlanName = (number) => {
  switch (number) {
    case 0:
      return 'none';
    case 1:
      return 'initial';
    case 2:
      return 'classic';
    case 3:
      return 'vip';
    case 4:
      return 'primordial';
    case 5:
      return 'business';
    case 6:
      return 'professional';
    case 7:
      return 'maximum';
    default:
      return 'none';
  }
};

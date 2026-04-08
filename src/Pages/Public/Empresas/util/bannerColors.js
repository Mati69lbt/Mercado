export const bannerColors = [
  "linear-gradient(135deg, #534AB7 0%, #7F77DD 60%, #AFA9EC 100%)",
  "linear-gradient(135deg, #0F6E56 0%, #1D9E75 60%, #5DCAA5 100%)",
  "linear-gradient(135deg, #185FA5 0%, #378ADD 60%, #85B7EB 100%)",
  "linear-gradient(135deg, #993C1D 0%, #D85A30 60%, #F0997B 100%)",
  "linear-gradient(135deg, #854F0B 0%, #BA7517 60%, #EF9F27 100%)",
];

export const getRandomBanner = () => {
  return bannerColors[Math.floor(Math.random() * bannerColors.length)];
};

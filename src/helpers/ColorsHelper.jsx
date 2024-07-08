const avatarColors = [
  '#EFEFEF',
  '#DEDEE8',
  '#F3F0E0',
  '#E4EADE',
  '#DCE5E6',
  '#EDE8EA',
];

export const getColorById = (id) => {
  return avatarColors[id % avatarColors.length];
};

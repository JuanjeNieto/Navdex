// MoveMethodTranslations.js
const moveMethodTranslations = {
    'level-up': 'Nivel',
    'machine': 'MT/MO',
    'egg': 'Huevo',
    'tutor': 'Tutor',
    'stadium-surfing-pikachu': 'Surf (Stadium)',
    'light-ball-egg': 'Huevo (Light Ball)',
    'colosseum-purification': 'Purificación (Colosseum)',
    'xd-shadow': 'Shadow (XD)',
    'form-change': 'Cambio de Forma',
};

export const translateMoveMethod = (method) => {
    return moveMethodTranslations[method] || method;
};

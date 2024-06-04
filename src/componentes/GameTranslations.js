// src/componentes/GameTranslations.js

const gameNamesInSpanish = {
    'red': 'Rojo',
    'blue': 'Azul',
    'yellow': 'Amarillo',
    'gold': 'Oro',
    'silver': 'Plata',
    'crystal': 'Cristal',
    'ruby': 'Rubí',
    'sapphire': 'Zafiro',
    'emerald': 'Esmeralda',
    'firered': 'Rojo Fuego',
    'leafgreen': 'Verde Hoja',
    'diamond': 'Diamante',
    'pearl': 'Perla',
    'platinum': 'Platino',
    'heartgold': 'Oro HeartGold',
    'soulsilver': 'Plata SoulSilver',
    'black': 'Negro',
    'white': 'Blanco',
    'black-2': 'Negro 2',
    'white-2': 'Blanco 2',
    'x': 'X',
    'y': 'Y',
    'omega-ruby': 'Rubí Omega',
    'alpha-sapphire': 'Zafiro Alfa',
    'sun': 'Sol',
    'moon': 'Luna',
    'ultra-sun': 'Ultra Sol',
    'ultra-moon': 'Ultra Luna',
    'sword': 'Espada',
    'shield': 'Escudo',
    'brilliant-diamond': 'Diamante Brillante',
    'shining-pearl': 'Perla Reluciente',
    'legends-arceus': 'Leyendas Arceus',
    'scarlet': 'Escarlata',
    'violet': 'Púrpura',
    'colosseum': 'Coliseo',
    'xd': 'XD',
    'lets-go-pikachu': "Let's GO Pikachu",
    'lets-go-eevee': "Let's GO Eevee",
    'the-isle-of-armor': 'La isla de la armadura',
    'the-crown-tundra': 'Las nieves de la corona',
    'the-teal-mask': 'La máscara turquesa',
    'the-indigo-disk': 'El disco índigo'
};

export const translateGameName = (name) => {
    return gameNamesInSpanish[name.toLowerCase()] || name;
};

export const translateGameNameInverse = (name) => {
    const invertedGameNames = Object.entries(gameNamesInSpanish).reduce((acc, [key, value]) => {
        acc[value.toLowerCase()] = key;
        return acc;
    }, {});
    return invertedGameNames[name.toLowerCase()] || name;
};
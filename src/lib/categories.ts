
export const categories = [
    { value: 'Deporte', label: 'Deporte' },
    { value: 'Baile', label: 'Baile' },
    { value: 'Arte', label: 'Arte' },
    { value: 'Salud', label: 'Salud' },
];

export const subCategories: Record<string, { value: string; label: string }[]> = {
    Baile: [
        { value: 'Salsa', label: 'Salsa' },
        { value: 'Bachata', label: 'Bachata' },
        { value: 'Tango', label: 'Tango' },
        { value: 'Flamenco', label: 'Flamenco' },
        { value: 'Reggaeton', label: 'Reggaeton' },
        { value: 'Dancehall', label: 'Dancehall' },
        { value: 'Ballet', label: 'Ballet' },
        { value: 'Kizomba', label: 'Kizomba' },
        { value: 'Heels', label: 'Heels' },
        { value: 'Pole Dance', label: 'Pole Dance' },
        { value: 'K-Pop', label: 'K-Pop' },
        { value: 'Twerk', label: 'Twerk' },
        { value: 'Hip-Hop', label: 'Hip-Hop' },
        { value: 'Urbano', label: 'Urbano' },
        { value: 'Vals', label: 'Vals' },
        { value: 'Foxtrot', label: 'Foxtrot' },
        { value: 'Cha-cha-cha', label: 'Cha-cha-chá' },
        { value: 'Jive', label: 'Jive' },
        { value: 'Merengue', label: 'Merengue' },
        { value: 'Samba', label: 'Samba' },
        { value: 'Breakdance', label: 'Breakdance' },
        { value: 'Jazz', label: 'Jazz' },
        { value: 'Lirico', label: 'Lírico' },
        { value: 'Belly Dance', label: 'Belly Dance' },
    ],
    Deporte: [
        { value: 'Calistenia', label: 'Calistenia' },
        { value: 'Crossfit', label: 'Crossfit' },
        { value: 'Funcional', label: 'Funcional' },
        { value: 'Yoga', label: 'Yoga' },
        { value: 'Pilates', label: 'Pilates' },
    ],
};

export const audienceTypes = [
    { id: 'mixto', label: 'Mixto' },
    { id: 'lady', label: 'Lady Style' },
    { id: 'men', label: 'Men Style' },
];
    

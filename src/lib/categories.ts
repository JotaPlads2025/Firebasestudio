
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
    ],
    Deporte: [
        { value: 'Calistenia', label: 'Calistenia' },
        { value: 'Crossfit', label: 'Crossfit' },
        { value: 'Funcional', label: 'Funcional' },
        { value: 'Yoga', label: 'Yoga' },
        { value: 'Pilates', label: 'Pilates' },
    ],
};

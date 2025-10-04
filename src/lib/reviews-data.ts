import type { Review } from './types';

export const reviewsData: Review[] = [
  {
    id: 'rev-001',
    studentName: 'Ana García',
    studentAvatarUrl: 'https://picsum.photos/seed/student1/100/100',
    rating: 5,
    comment: '¡La mejor clase de bachata! Susana es una instructora increíble, muy paciente y con una energía que contagia. He aprendido muchísimo en poco tiempo. ¡Totalmente recomendada!',
    date: '2024-07-15',
    className: 'Bachata Básico',
  },
  {
    id: 'rev-002',
    studentName: 'Diego Pérez',
    studentAvatarUrl: 'https://picsum.photos/seed/student2/100/100',
    rating: 5,
    comment: 'Susana hace que aprender a bailar sea divertido y accesible. Sus clases de intermedio son desafiantes pero muy gratificantes. El ambiente es genial.',
    date: '2024-07-10',
    className: 'Bachata Intermedio',
  },
  {
    id: 'rev-003',
    studentName: 'Camila Díaz',
    studentAvatarUrl: 'https://picsum.photos/seed/student3/100/100',
    rating: 4,
    comment: 'Me encantó el coaching personalizado. Susana me ayudó a pulir detalles de mi técnica que marcaron una gran diferencia. Es muy observadora y da un feedback muy preciso.',
    date: '2024-06-28',
    className: 'Coaching Personalizado de Bachata',
  },
    {
    id: 'rev-004',
    studentName: 'Felipe Morales',
    studentAvatarUrl: 'https://picsum.photos/seed/student4/100/100',
    rating: 5,
    comment: 'El bootcamp fue intenso pero valió totalmente la pena. Aprendí coreografías nuevas y conocí a gente increíble. ¡Una experiencia inolvidable!',
    date: '2024-06-20',
    className: 'Bootcamp Intensivo de Verano',
    },
];


export type Booking = {
    classId: string;
    planType: 'suelta' | 'pack';
    date: string; // YYYY-MM-DD
};
  
export type Student = {
    studentId: string;
    name: string;
    joinDate: string; // YYYY-MM-DD
    bookings: Booking[];
};
  
export const studentData: Student[] = [
    // Students who joined in January
    {
      studentId: 'user-001',
      name: 'Ana García',
      joinDate: '2024-01-10',
      bookings: [
        { classId: 'cls-001', planType: 'suelta', date: '2024-01-15' },
        { classId: 'cls-001', planType: 'pack', date: '2024-02-12' },
        { classId: 'cls-002', planType: 'pack', date: '2024-03-11' },
        { classId: 'cls-002', planType: 'pack', date: '2024-04-08' },
      ],
    },
    {
      studentId: 'user-002',
      name: 'Benjamín Soto',
      joinDate: '2024-01-12',
      bookings: [
        { classId: 'cls-003', planType: 'suelta', date: '2024-01-20' },
        // Did not return
      ],
    },
    {
        studentId: 'user-003',
        name: 'Camila Díaz',
        joinDate: '2024-01-18',
        bookings: [
          { classId: 'cls-002', planType: 'pack', date: '2024-01-22' },
          { classId: 'cls-002', planType: 'pack', date: '2024-02-19' },
          { classId: 'cls-001', planType: 'pack', date: '2024-03-18' },
        ],
    },
    // Students who joined in February
    {
        studentId: 'user-004',
        name: 'Diego Pérez',
        joinDate: '2024-02-05',
        bookings: [
          { classId: 'cls-001', planType: 'pack', date: '2024-02-05' },
          { classId: 'cls-001', planType: 'pack', date: '2024-03-04' },
          { classId: 'cls-003', planType: 'pack', date: '2024-04-01' },
          { classId: 'cls-003', planType: 'pack', date: '2024-05-06' },
        ],
    },
    {
        studentId: 'user-005',
        name: 'Elena Castillo',
        joinDate: '2024-02-10',
        bookings: [
          { classId: 'cls-004', planType: 'suelta', date: '2024-02-11' },
          { classId: 'cls-001', planType: 'suelta', date: '2024-03-10' },
          // Churned after March
        ],
    },
    // Students who joined in March
    {
        studentId: 'user-006',
        name: 'Felipe Morales',
        joinDate: '2024-03-01',
        bookings: [
          { classId: 'cls-005', planType: 'pack', date: '2024-03-04' },
          { classId: 'cls-005', planType: 'pack', date: '2024-04-01' },
          { classId: 'cls-001', planType: 'suelta', date: '2024-05-05' },
        ],
    },
    //... More students to make data richer
    {
        studentId: 'user-007',
        name: 'Gabriela Rojas',
        joinDate: '2024-01-25',
        bookings: [
            { classId: 'cls-001', planType: 'pack', date: '2024-01-29' },
            { classId: 'cls-001', planType: 'pack', date: '2024-02-26' },
            { classId: 'cls-002', planType: 'pack', date: '2024-03-25' },
            { classId: 'cls-002', planType: 'pack', date: '2024-04-22' },
            { classId: 'cls-003', planType: 'pack', date: '2024-05-20' },
            { classId: 'cls-003', planType: 'pack', date: '2024-06-17' },
        ],
    },
    {
        studentId: 'user-008',
        name: 'Hugo Silva',
        joinDate: '2024-04-02',
        bookings: [
            { classId: 'cls-003', planType: 'suelta', date: '2024-04-06' },
            { classId: 'cls-003', planType: 'pack', date: '2024-05-04' },
            { classId: 'cls-001', planType: 'pack', date: '2024-06-01' },
        ],
    },
    {
        studentId: 'user-009',
        name: 'Isidora Flores',
        joinDate: '2024-05-15',
        bookings: [
            { classId: 'cls-002', planType: 'pack', date: '2024-05-20' },
            { classId: 'cls-002', planType: 'pack', date: '2024-06-17' },
            { classId: 'cls-002', planType: 'pack', date: '2024-07-15' },
        ],
    },
    {
        studentId: 'user-010',
        name: 'Joaquín Núñez',
        joinDate: '2024-06-01',
        bookings: [
            { classId: 'cls-001', planType: 'suelta', date: '2024-06-03' },
            // Did not return
        ],
    },
];

    
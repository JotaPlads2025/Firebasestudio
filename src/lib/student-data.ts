
export type Booking = {
    classId: string;
    planType: 'suelta' | 'pack';
    date: string; // YYYY-MM-DD
    paymentStatus: 'Pagado' | 'Pendiente';
    attendance: 'Presente' | 'Ausente' | 'No registrado';
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
        { classId: 'demo-cls-001', planType: 'suelta', date: '2024-07-29', paymentStatus: 'Pagado', attendance: 'Presente' },
        { classId: 'demo-cls-001', planType: 'pack', date: '2024-08-05', paymentStatus: 'Pagado', attendance: 'Presente' },
        { classId: 'demo-cls-002', planType: 'pack', date: '2024-07-30', paymentStatus: 'Pagado', attendance: 'Presente' },
        { classId: 'demo-cls-002', planType: 'pack', date: '2024-08-06', paymentStatus: 'Pagado', attendance: 'No registrado' },
      ],
    },
    {
      studentId: 'user-002',
      name: 'Benjamín Soto',
      joinDate: '2024-01-12',
      bookings: [
        { classId: 'demo-cls-003', planType: 'suelta', date: '2024-07-31', paymentStatus: 'Pendiente', attendance: 'Presente' },
        // Did not return
      ],
    },
    {
        studentId: 'user-003',
        name: 'Camila Díaz',
        joinDate: '2024-01-18',
        bookings: [
          { classId: 'demo-cls-002', planType: 'pack', date: '2024-07-30', paymentStatus: 'Pagado', attendance: 'Presente' },
          { classId: 'demo-cls-002', planType: 'pack', date: '2024-08-06', paymentStatus: 'Pagado', attendance: 'Presente' },
          { classId: 'demo-cls-001', planType: 'pack', date: '2024-08-05', paymentStatus: 'Pagado', attendance: 'Presente' },
        ],
    },
    // Students who joined in February
    {
        studentId: 'user-004',
        name: 'Diego Pérez',
        joinDate: '2024-02-05',
        bookings: [
          { classId: 'demo-cls-001', planType: 'pack', date: '2024-07-29', paymentStatus: 'Pagado', attendance: 'Presente' },
          { classId: 'demo-cls-001', planType: 'pack', date: '2024-08-05', paymentStatus: 'Pagado', attendance: 'Presente' },
          { classId: 'demo-cls-003', planType: 'pack', date: '2024-07-31', paymentStatus: 'Pagado', attendance: 'Presente' },
          { classId: 'demo-cls-003', planType: 'pack', date: '2024-08-07', paymentStatus: 'Pendiente', attendance: 'Ausente' },
        ],
    },
    {
        studentId: 'user-005',
        name: 'Elena Castillo',
        joinDate: '2024-02-10',
        bookings: [
          { classId: 'demo-cls-004', planType: 'suelta', date: '2024-08-01', paymentStatus: 'Pagado', attendance: 'Presente' },
          { classId: 'demo-cls-001', planType: 'suelta', date: '2024-08-05', paymentStatus: 'Pagado', attendance: 'Ausente' },
        ],
    },
    // Students who joined in March
    {
        studentId: 'user-006',
        name: 'Felipe Morales',
        joinDate: '2024-03-01',
        bookings: [
          { classId: 'demo-cls-005', planType: 'pack', date: '2024-08-02', paymentStatus: 'Pagado', attendance: 'Presente' },
          { classId: 'demo-cls-005', planType: 'pack', date: '2024-08-09', paymentStatus: 'Pagado', attendance: 'Presente' },
          { classId: 'demo-cls-001', planType: 'suelta', date: '2024-08-05', paymentStatus: 'Pendiente', attendance: 'No registrado' },
        ],
    },
    //... More students to make data richer
    {
        studentId: 'user-007',
        name: 'Gabriela Rojas',
        joinDate: '2024-01-25',
        bookings: [
            { classId: 'demo-cls-001', planType: 'pack', date: '2024-07-29', paymentStatus: 'Pagado', attendance: 'Presente' },
            { classId: 'demo-cls-001', planType: 'pack', date: '2024-08-05', paymentStatus: 'Pagado', attendance: 'Presente' },
            { classId: 'demo-cls-002', planType: 'pack', date: '2024-07-30', paymentStatus: 'Pagado', attendance: 'Presente' },
            { classId: 'demo-cls-002', planType: 'pack', date: '2024-08-06', paymentStatus: 'Pagado', attendance: 'Presente' },
            { classId: 'demo-cls-003', planType: 'pack', date: '2024-07-31', paymentStatus: 'Pagado', attendance: 'Presente' },
            { classId: 'demo-cls-003', planType: 'pack', date: '2024-08-07', paymentStatus: 'Pagado', attendance: 'Presente' },
        ],
    },
    {
        studentId: 'user-008',
        name: 'Hugo Silva',
        joinDate: '2024-04-02',
        bookings: [
            { classId: 'demo-cls-003', planType: 'suelta', date: '2024-07-31', paymentStatus: 'Pagado', attendance: 'Presente' },
            { classId: 'demo-cls-003', planType: 'pack', date: '2024-08-07', paymentStatus: 'Pagado', attendance: 'Presente' },
            { classId: 'demo-cls-001', planType: 'pack', date: '2024-08-05', paymentStatus: 'Pagado', attendance: 'Ausente' },
        ],
    },
    {
        studentId: 'user-009',
        name: 'Isidora Flores',
        joinDate: '2024-05-15',
        bookings: [
            { classId: 'demo-cls-002', planType: 'pack', date: '2024-07-30', paymentStatus: 'Pagado', attendance: 'Presente' },
            { classId: 'demo-cls-002', planType: 'pack', date: '2024-08-06', paymentStatus: 'Pagado', attendance: 'Presente' },
            { classId: 'demo-cls-002', planType: 'pack', date: '2024-08-13', paymentStatus: 'Pendiente', attendance: 'No registrado' },
        ],
    },
    {
        studentId: 'user-010',
        name: 'Joaquín Núñez',
        joinDate: '2024-06-01',
        bookings: [
            { classId: 'demo-cls-001', planType: 'suelta', date: '2024-07-29', paymentStatus: 'Pagado', attendance: 'Presente' },
        ],
    },
];

    
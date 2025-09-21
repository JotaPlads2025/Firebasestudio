
export const regions = [
  { value: 'rm', label: 'Región Metropolitana' },
  { value: 'valpo', label: 'Valparaíso' },
  { value: 'biobio', label: 'Biobío' },
  { value: 'arica', label: 'Arica y Parinacota' },
  { value: 'tarapaca', label: 'Tarapacá' },
  { value: 'antofagasta', label: 'Antofagasta' },
  { value: 'atacama', label: 'Atacama' },
  { value: 'coquimbo', label: 'Coquimbo' },
];

export const communesByRegion: Record<string, { value: string; label: string }[]> = {
  rm: [
    { value: 'stgo', label: 'Santiago' },
    { value: 'prov', label: 'Providencia' },
    { value: 'vit', label: 'Vitacura' },
    { value: 'las-condes', label: 'Las Condes' },
    { value: 'nunoa', label: 'Ñuñoa' },
  ],
  valpo: [
    { value: 'valparaiso', label: 'Valparaíso' },
    { value: 'vina-del-mar', label: 'Viña del Mar' },
    { value: 'concon', label: 'Concón' },
    { value: 'quilpue', label: 'Quilpué' },
  ],
  biobio: [
    { value: 'concepcion', label: 'Concepción' },
    { value: 'talcahuano', label: 'Talcahuano' },
    { value: 'hualpen', label: 'Hualpén' },
  ],
  // Puedes seguir agregando comunas para las otras regiones aquí
};

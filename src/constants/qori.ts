export const QORI_LIST = [
  { id: '01', name: 'Abdullah Al-Juhany' },
  { id: '02', name: 'Abdul-Muhsin Al-Qasim' },
  { id: '03', name: 'Abdurrahman as-Sudais' },
  { id: '04', name: 'Ibrahim Al-Dossari' },
  { id: '05', name: 'Mishary Rashid Al-Afasy' },
  { id: '06', name: 'Yasser-Al-Dosari' },
] as const;

export type QoriId = (typeof QORI_LIST)[number]['id'];

//quran.ts
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface AudioMap {
  [key: string]: string;
}

export interface Ayat {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
  audio: AudioMap;
}

export interface Tafsir {
  ayat: number;
  teks: string;
}

export interface SuratNavigasi {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
}

export interface SuratBase {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
  deskripsi: string;
  audioFull: AudioMap;
  suratSelanjutnya?: SuratNavigasi | false;
  suratSebelumnya?: SuratNavigasi | false;
}

export interface SuratDetail extends SuratBase {
  ayat: Ayat[];
}

export interface SuratTafsir extends SuratBase {
  tafsir: Tafsir[];
}
// src/services/api.ts
import axios from 'axios';
import type { ApiResponse, SuratBase, SuratDetail, SuratTafsir } from '../types/quran';

const apiClient = axios.create({
  baseURL: 'https://equran.id/api/v2',
  timeout: 10000,
});

const getData = <T>(response: ApiResponse<T>): T => response.data;

export const quranService = {
  getDaftarSurat: async (): Promise<SuratBase[]> => {
    const response = await apiClient.get<ApiResponse<SuratBase[]>>('/surat');
    return getData(response.data);
  },

  getSuratDetail: async (nomor: number): Promise<SuratDetail> => {
    const response = await apiClient.get<ApiResponse<SuratDetail>>(`/surat/${nomor}`);
    return getData(response.data);
  },

  getTafsirSurat: async (nomor: number): Promise<SuratTafsir> => {
    const response = await apiClient.get<ApiResponse<SuratTafsir>>(`/tafsir/${nomor}`);
    return getData(response.data);
  },
};
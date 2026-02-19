// src/lib/api.ts
const BASE_URL = 'http://localhost:3000/invest'; // NestJS 서버 주소

export interface InvestData {
  id?: string;
  date?: string;
  amount?: number;
  description?: string;
  attr1?: string;
  attr2?: string;
  createdDate?: string;
  lastUpdateDate?: string;
}

export const investApi = {
  getAll: () => fetch(BASE_URL, { cache: 'no-store' }).then(res => res.json()),
  create: (data: Partial<InvestData>) => fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(res => res.json()),
  update: (id: string, data: Partial<InvestData>) => fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(res => res.json()),
  delete: (id: string) => fetch(`${BASE_URL}/${id}`, { method: 'DELETE' }),
};

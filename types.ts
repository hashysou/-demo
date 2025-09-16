export interface Work {
  id: number;
  title: string;
  category: '建具' | '家具' | '什器' | 'その他';
  material: '木' | '金属' | 'ガラス';
  finish: 'オイル' | 'ウレタン' | '塗装';
  priceRange: '¥' | '¥¥' | '¥¥¥' | '¥¥¥¥';
  leadTime: '1-2週間' | '3-4週間' | '1-2ヶ月' | '3ヶ月以上';
  region: string;
  clientType: 'B2B' | 'B2C';
  imageUrl: string;
  description: string;
}

export enum FormCategory {
  Joinery = '建具',
  Furniture = '家具',
  Fixtures = '什器',
  Other = 'その他'
}

export enum ConsultationType {
  B2B = 'B2B',
  B2C = 'B2C'
}
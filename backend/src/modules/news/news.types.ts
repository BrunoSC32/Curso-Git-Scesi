export type NewsStatus = 'draft' | 'published';

export interface News {
  id: string;
  title: string;
  content?: string;
  author: string;
  imageUrl?: string;
  status: NewsStatus;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface NewsStats {
  total: number;
  published: number;
  draft: number;
  authorCount: Record<string, number>;
  latestNewsTitle: string | null;
}

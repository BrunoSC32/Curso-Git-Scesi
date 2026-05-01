export interface News {
  id: string
  title: string
  content?: string
  author: string
  imageUrl?: string
  createdAt: string
  updatedAt: string
}

export interface NewsPayload {
  title: string
  content: string
  author: string
  imageUrl?: string
}

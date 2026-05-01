import type { News } from '../types/news'

export const seedNews: News[] = [
  {
    id: 'news-1',
    title: 'La ciudad inaugura un nuevo centro cultural barrial',
    content:
      'El espacio abre con talleres abiertos, biblioteca comunitaria y actividades para jovenes durante toda la semana.',
    author: 'Redaccion Central',
    imageUrl:
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
    createdAt: '2026-04-28T09:00:00.000Z',
    updatedAt: '2026-04-28T09:00:00.000Z',
  },
  {
    id: 'news-2',
    title: 'Universitarios impulsan una feria de tecnologia local',
    content:
      'La iniciativa reunio proyectos de software, robotica y emprendimientos estudiantiles con acceso gratuito.',
    author: 'Mesa Digital',
    imageUrl:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    createdAt: '2026-04-27T15:30:00.000Z',
    updatedAt: '2026-04-27T15:30:00.000Z',
  },
  {
    id: 'news-3',
    title: 'Mejoran los horarios del transporte en la zona sur',
    content:
      'Autoridades informaron ajustes operativos para reducir tiempos de espera en horas pico y ampliar cobertura.',
    author: 'Equipo Ciudad',
    createdAt: '2026-04-26T12:15:00.000Z',
    updatedAt: '2026-04-26T12:15:00.000Z',
  },
]

// Tipos y mock de la sección Consultas + Reseñas

import type { ID } from "./types";

export type ConsultaStatus =
  | "nueva"
  | "pendiente"
  | "respondida"
  | "spam"
  | "archivada";

export interface Consulta {
  id: ID;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  body: string;
  receivedAt: string; // ISO
  status: ConsultaStatus;
  read: boolean;
}

export const consultasSeed: Consulta[] = [
  {
    id: "c-001",
    name: "María Camila López",
    email: "maria.camila@email.com",
    phone: "+34 612 345 678",
    subject: "Presupuesto para escultura en jardín",
    body:
      "Hola, me gustaría solicitar un presupuesto para una escultura de acero inoxidable para mi jardín. La idea es una pieza abstracta de aproximadamente 2 metros de altura.\n\n¿Podrían orientarme sobre los materiales disponibles, tiempos de entrega y costos aproximados?\n\nGracias de antemano.",
    receivedAt: "2025-05-14T10:24:00",
    status: "nueva",
    read: false,
  },
  {
    id: "c-002",
    name: "Javier Sánchez",
    email: "javier.sanchez@studio.com",
    phone: "+34 654 123 987",
    subject: "Consulta sobre materiales",
    body:
      "Buenos días, estoy preparando un proyecto para un espacio interior y me preguntaba si trabajan también en bronce de menor escala (hasta 80 cm).\n\nMe interesaría hablar de plazos y de un posible encargo. Un saludo.",
    receivedAt: "2025-05-14T09:15:00",
    status: "nueva",
    read: false,
  },
  {
    id: "c-003",
    name: "Ana Ramírez",
    email: "ana.ramirez@ayto-coruna.es",
    phone: "+34 981 000 111",
    subject: "Plazo de entrega para obra pública",
    body:
      "Le escribo desde el área de cultura. Tenemos previsto un encargo para una rotonda y querríamos confirmar plazos antes de pasar la propuesta al pleno.\n\nGracias.",
    receivedAt: "2025-05-13T16:40:00",
    status: "pendiente",
    read: true,
  },
  {
    id: "c-004",
    name: "Luis González",
    email: "luisg@gmail.com",
    subject: "Mantenimiento de escultura",
    body:
      "Hola Maestro, tengo una pieza suya desde 2018 y querría preguntarle por mantenimiento de la pátina. ¿Realizan revisiones?",
    receivedAt: "2025-05-13T11:08:00",
    status: "respondida",
    read: true,
  },
  {
    id: "c-005",
    name: "Valentina Peña",
    email: "v.pena@grupocomercial.com",
    phone: "+34 600 778 232",
    subject: "Información para proyecto comercial",
    body:
      "Buenos días, estamos diseñando un hotel boutique en Girona y nos gustaría incorporar una pieza suya en el hall principal.\n\n¿Sería posible concertar una visita al taller?",
    receivedAt: "2025-05-12T14:22:00",
    status: "pendiente",
    read: true,
  },
  {
    id: "c-006",
    name: "Fernando Díaz",
    email: "fernando.diaz@hotmail.com",
    subject: "¿Hacen esculturas personalizadas?",
    body:
      "Buenas, me gustaría regalar una pieza personalizada para el aniversario de bodas de mis padres. ¿Es algo viable o solo trabajan grandes formatos?",
    receivedAt: "2025-05-12T09:30:00",
    status: "respondida",
    read: true,
  },
  {
    id: "c-007",
    name: "Sofía Castillo",
    email: "promo@offer-mailer.io",
    subject: "Envío de catálogo",
    body:
      "Le ofrecemos el catálogo más completo de servicios SEO y marketing digital para artistas. Aproveche nuestra promoción este mes…",
    receivedAt: "2025-05-10T18:15:00",
    status: "spam",
    read: true,
  },
];

// =====================================================

export type ResenaStatus = "publicada" | "pendiente" | "oculta";

export interface ResenaCompleta {
  id: ID;
  authorName: string;
  authorRole: string; // "Cliente particular · Barcelona"
  authorPhotoUrl: string;
  rating: number; // 1..5 (puede tener .5)
  text: string;
  imageUrl?: string; // foto del proyecto
  receivedAt: string; // ISO
  status: ResenaStatus;
  featured: boolean; // destacada en portada
}

export const resenasSeed: ResenaCompleta[] = [
  {
    id: "r-001",
    authorName: "María Camila López",
    authorRole: "Cliente particular · Barcelona",
    authorPhotoUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&auto=format&fit=crop",
    rating: 5,
    text:
      "Excelente servicio y atención al detalle. Cumplieron con los plazos acordados y el resultado final fue incluso mejor de lo que esperábamos. Sin duda, volveríamos a trabajar con ellos en futuros proyectos.",
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80&auto=format&fit=crop",
    receivedAt: "2025-05-14",
    status: "publicada",
    featured: true,
  },
  {
    id: "r-002",
    authorName: "Javier Sánchez",
    authorRole: "Estudio de arquitectura · Madrid",
    authorPhotoUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&auto=format&fit=crop",
    rating: 5,
    text:
      "Muy profesionales y comprometidos con el resultado. Han sabido adaptar la propuesta a un emplazamiento complicado sin perder fuerza visual.",
    receivedAt: "2025-05-12",
    status: "pendiente",
    featured: false,
  },
  {
    id: "r-003",
    authorName: "Ana Ramírez",
    authorRole: "Ayuntamiento · A Coruña",
    authorPhotoUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80&auto=format&fit=crop",
    rating: 5,
    text:
      "El trato fue cercano y el trabajo final superó nuestras expectativas. Una pieza que se ha integrado perfectamente en la plaza y que recibe muchos elogios de los vecinos.",
    imageUrl:
      "https://images.unsplash.com/photo-1604005950576-9d893c8fe71d?w=1400&q=80&auto=format&fit=crop",
    receivedAt: "2025-05-10",
    status: "publicada",
    featured: true,
  },
  {
    id: "r-004",
    authorName: "Luis González",
    authorRole: "Coleccionista privado",
    authorPhotoUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop",
    rating: 4.5,
    text:
      "Buena experiencia en general. Recomendables. La comunicación durante el envío podría mejorar un poco, pero el resultado es impecable.",
    receivedAt: "2025-05-08",
    status: "publicada",
    featured: false,
  },
  {
    id: "r-005",
    authorName: "Valentina Peña",
    authorRole: "Hotel boutique · Girona",
    authorPhotoUrl:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80&auto=format&fit=crop",
    rating: 5,
    text:
      "Nos ayudaron a hacer realidad nuestro proyecto. Una pieza única que se ha convertido en el corazón del hall.",
    receivedAt: "2025-05-06",
    status: "pendiente",
    featured: false,
  },
  {
    id: "r-006",
    authorName: "Fernando Díaz",
    authorRole: "Galerista · Vigo",
    authorPhotoUrl:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80&auto=format&fit=crop",
    rating: 5,
    text:
      "Gran calidad en los materiales y en los acabados. Una pieza que envejece con dignidad — esto es lo que diferencia el oficio de la producción industrial.",
    receivedAt: "2025-05-03",
    status: "publicada",
    featured: false,
  },
];

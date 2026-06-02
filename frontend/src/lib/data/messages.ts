import type { Message } from "./types";

export const messages: Message[] = [
  {
    id: "m1",
    name: "Marta Ruiz",
    email: "marta@galeriaruiz.com",
    subject: "Interesada en exposición conjunta",
    body:
      "Hola Alejandro, dirijo una galería en Bilbao y me gustaría hablar de una posible muestra para otoño.",
    receivedAt: "2025-02-09T10:24:00Z",
    status: "nuevo",
  },
  {
    id: "m2",
    name: "Carlos Méndez",
    email: "carlos.mendez@ayto-jaca.es",
    subject: "Encargo institucional",
    body:
      "Buenos días, queremos hablar de un posible encargo para la nueva plaza del centro.",
    receivedAt: "2025-02-07T17:02:00Z",
    status: "leido",
  },
  {
    id: "m3",
    name: "Anna Petrov",
    email: "anna.petrov@private.com",
    subject: "Pieza para jardín privado",
    body: "Hola, vi su trabajo en Instagram. Busco una pieza para un jardín privado.",
    receivedAt: "2025-02-04T08:41:00Z",
    status: "respondido",
  },
];

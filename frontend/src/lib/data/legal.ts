// Datos mock + generadores de textos legales (RGPD + LSSI, España).
// Solo frontend. Textos orientativos, NO asesoramiento legal.

export interface Fiscal {
  razonSocial: string;
  nif: string;
  domicilio: string;
  email: string;
  telefono: string;
  actividad: string;
}

export interface Situacion {
  cookiesAnaliticas: boolean;
  formularioContacto: boolean;
  agendaCitas: boolean;
  newsletter: boolean;
  ventaOnline: boolean;
}

export interface LegalDocDef {
  id: string;
  title: string;
  slug: string; // ruta pública
  always: boolean; // true = siempre; false = solo si vende online
}

export const LEGAL_DOCS: LegalDocDef[] = [
  { id: "aviso-legal", title: "Aviso Legal", slug: "/aviso-legal", always: true },
  { id: "privacidad", title: "Política de Privacidad", slug: "/privacidad", always: true },
  { id: "cookies", title: "Política de Cookies", slug: "/cookies", always: true },
  { id: "condiciones", title: "Condiciones de Contratación", slug: "/condiciones", always: false },
  { id: "devoluciones", title: "Política de Devoluciones", slug: "/devoluciones", always: false },
  { id: "accesibilidad", title: "Declaración de Accesibilidad (EAA)", slug: "/accesibilidad", always: false },
];

export const fiscalSeed: Fiscal = {
  razonSocial: "Alejandro Carballo García",
  nif: "12.345.678-X",
  domicilio: "Rúa do Taller, 12 · 15001 A Coruña",
  email: "hola@maestrocarballo.com",
  telefono: "+34 600 000 000",
  actividad: "Escultura y obra artística por encargo",
};

export const situacionSeed: Situacion = {
  cookiesAnaliticas: true,
  formularioContacto: true,
  agendaCitas: false,
  newsletter: false,
  ventaOnline: false,
};

export const COOKIE_TEXT_SEED =
  "Usamos cookies propias y de terceros para que la web funcione y para entender cómo se usa. Puedes aceptarlas todas, rechazarlas o elegir por categorías.";

export const SITUACION_LABELS: { key: keyof Situacion; label: string }[] = [
  { key: "cookiesAnaliticas", label: "¿Usas cookies analíticas?" },
  { key: "formularioContacto", label: "¿Tienes formulario de contacto?" },
  { key: "agendaCitas", label: "¿Agenda de citas?" },
  { key: "newsletter", label: "¿Newsletter?" },
  { key: "ventaOnline", label: "¿Vendes online?" },
];

// ---- Generadores ----

export function generateFormsClause(f: Fiscal): string {
  return `☐ He leído y acepto la Política de Privacidad.

Responsable: ${f.razonSocial} (${f.nif}). Finalidad: atender tu solicitud y mantener el contacto. Legitimación: tu consentimiento. Destinatarios: no se ceden datos a terceros salvo obligación legal. Derechos: acceso, rectificación, supresión y demás recogidos en nuestra Política de Privacidad, escribiendo a ${f.email}.`;
}

function privacidadFinalidades(s: Situacion): string {
  const lines: string[] = [];
  if (s.formularioContacto)
    lines.push("· Datos del formulario de contacto (nombre, email y mensaje), para responder a tus consultas.");
  if (s.agendaCitas)
    lines.push("· Datos de reserva de cita (nombre, contacto y fecha), para gestionar tu visita al taller.");
  if (s.newsletter)
    lines.push("· Tu email de suscripción, para enviarte novedades del taller (hasta que te des de baja).");
  if (s.ventaOnline)
    lines.push("· Datos de pedido y facturación, para gestionar tus compras y cumplir obligaciones fiscales.");
  if (lines.length === 0)
    lines.push("· Datos de navegación estrictamente necesarios para el funcionamiento del sitio.");
  return lines.join("\n");
}

export function generateDoc(id: string, f: Fiscal, s: Situacion): string {
  switch (id) {
    case "aviso-legal":
      return `AVISO LEGAL

En cumplimiento de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los datos del titular de este sitio web:

Titular: ${f.razonSocial}
NIF/CIF: ${f.nif}
Domicilio: ${f.domicilio}
Email: ${f.email}
Teléfono: ${f.telefono}
Actividad: ${f.actividad}

OBJETO
Este sitio tiene carácter informativo y de presentación del trabajo del titular. El acceso y uso atribuye la condición de usuario e implica la aceptación de las presentes condiciones.

PROPIEDAD INTELECTUAL E INDUSTRIAL
Todos los contenidos (textos, fotografías de las obras, diseños y marcas) son titularidad de ${f.razonSocial} o se usan con autorización. Queda prohibida su reproducción sin consentimiento expreso.

RESPONSABILIDAD
El titular no se hace responsable del mal uso de los contenidos, que es responsabilidad exclusiva de quien accede a ellos.`;

    case "privacidad":
      return `POLÍTICA DE PRIVACIDAD

RESPONSABLE DEL TRATAMIENTO
${f.razonSocial}, con NIF ${f.nif} y domicilio en ${f.domicilio}. Email de contacto: ${f.email}.

¿QUÉ DATOS TRATAMOS Y PARA QUÉ?
${privacidadFinalidades(s)}

LEGITIMACIÓN
El tratamiento se basa en tu consentimiento y, cuando proceda, en la ejecución de un contrato o en el cumplimiento de obligaciones legales.

CONSERVACIÓN
Conservamos tus datos el tiempo necesario para la finalidad indicada y mientras existan obligaciones legales.

DESTINATARIOS
No cedemos tus datos a terceros, salvo obligación legal o proveedores necesarios para prestar el servicio.

TUS DERECHOS
Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a ${f.email}. También puedes reclamar ante la Agencia Española de Protección de Datos (www.aepd.es).`;

    case "cookies":
      return `POLÍTICA DE COOKIES

${s.cookiesAnaliticas
        ? "Este sitio utiliza cookies técnicas necesarias y cookies analíticas para entender cómo se usa la web y mejorarla."
        : "Este sitio utiliza únicamente cookies técnicas necesarias para su funcionamiento."}

TIPOS DE COOKIES
· Necesarias: imprescindibles para que la web funcione. Siempre activas.
${s.cookiesAnaliticas ? "· Analíticas: nos ayudan a medir las visitas de forma agregada y anónima.\n" : ""}· Marketing: solo si en algún momento activas publicidad personalizada.

GESTIÓN
Al entrar puedes Aceptar todo, Rechazar o Configurar por categorías. Puedes cambiar tu elección en cualquier momento desde el enlace "Cookies" del pie de página.`;

    case "condiciones":
      return `CONDICIONES DE CONTRATACIÓN

IDENTIFICACIÓN
Vendedor: ${f.razonSocial} (${f.nif}), ${f.domicilio}. Contacto: ${f.email}.

PROCESO DE COMPRA
La compra se realiza a través de la web. Tras confirmar el pedido y el pago, recibirás un email con el detalle.

PRECIOS Y PAGO
Los precios incluyen los impuestos aplicables (IVA). Se aceptan los medios de pago indicados en el proceso de compra.

ENTREGA
Los plazos de entrega se indicarán en cada pedido. Al tratarse de obra artística, algunas piezas pueden requerir tiempos de elaboración específicos.`;

    case "devoluciones":
      return `POLÍTICA DE DEVOLUCIONES Y DESISTIMIENTO

DERECHO DE DESISTIMIENTO
Como consumidor dispones de 14 días naturales desde la recepción para desistir de la compra sin necesidad de justificación, salvo en bienes confeccionados conforme a especificaciones del cliente (obra por encargo), que quedan excluidos.

CÓMO EJERCERLO
Comunícalo por email a ${f.email} indicando tu pedido. Te devolveremos el importe en un máximo de 14 días desde que ejerzas el derecho.

ESTADO DE LOS PRODUCTOS
Los productos deben devolverse en su estado original. Los gastos de devolución corren a cargo del comprador salvo producto defectuoso.`;

    case "accesibilidad":
      return `DECLARACIÓN DE ACCESIBILIDAD (EAA)

COMPROMISO
${f.razonSocial} se compromete a hacer accesible este sitio web conforme a la Directiva (UE) 2019/882 (European Accessibility Act) y a las pautas WCAG 2.1 nivel AA.

ESTADO DE CUMPLIMIENTO
Este sitio es parcialmente conforme; trabajamos de forma continua para mejorar la accesibilidad de todos sus contenidos.

CONTACTO Y SUGERENCIAS
Si encuentras barreras de accesibilidad, escríbenos a ${f.email} y lo revisaremos lo antes posible.`;

    default:
      return "";
  }
}

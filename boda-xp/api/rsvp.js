export default function handler(request, response) {
  if (request.method === 'OPTIONS') {
    response.status(204).end();
    return;
  }

  if (request.method === 'GET') {
    response.status(200).json({
      ok: true,
      service: 'boda-xp-api',
      message: 'RSVP endpoint listo para conectar con Google Sheets o Excel.',
    });
    return;
  }

  if (request.method !== 'POST') {
    response.status(405).json({
      ok: false,
      error: 'Method not allowed',
    });
    return;
  }

  const payload = request.body ?? {};

  response.status(200).json({
    ok: true,
    received: payload,
    message: 'Respuesta recibida. Aquí se conectará el guardado en Google Sheets o Excel.',
  });
}

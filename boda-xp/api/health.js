export default function handler(request, response) {
  if (request.method === 'OPTIONS') {
    response.status(204).end();
    return;
  }

  response.status(200).json({ ok: true, status: 'healthy' });
}

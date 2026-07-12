export default function BodaWindow() {
  return (
    <div>
      <h2 className="win-title">[Novio] &amp; [Novia]</h2>
      <div className="fact"><b>Fecha:</b> Sábado, [XX] de [mes] de 2027</div>
      <div className="fact"><b>Ceremonia:</b> [Hora] · [Lugar de la ceremonia]</div>
      <div className="fact"><b>Banquete:</b> [Hora] · [Nombre del restaurante/finca]</div>
      <div className="fact"><b>Código de vestimenta:</b> Elegante / Etiqueta rigurosa opcional</div>
      <h3 style={{ color: '#0a3fae', fontSize: '13px', marginTop: '16px' }}>Programa del día</h3>
      <ul className="timeline">
        <li><b>12:30</b> — Ceremonia</li>
        <li><b>13:30</b> — Cóctel de bienvenida</li>
        <li><b>15:00</b> — Banquete</li>
        <li><b>19:00</b> — Barra libre y baile</li>
        <li><b>02:00</b> — Autobuses de vuelta</li>
      </ul>
      <p style={{ marginTop: 14, color: '#777', fontSize: '11.5px' }}>🎁 En vez de regalo, nos haría mucha ilusión un sobre — os dejamos los detalles en la invitación física.</p>
    </div>
  );
}
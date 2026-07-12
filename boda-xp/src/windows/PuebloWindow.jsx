export default function PuebloWindow() {
  return (
    <div>
      <h2 className="win-title">Bienvenidos a [Nombre del Pueblo]</h2>
      <p>La boda se celebra en un pueblecito con encanto donde nos conocimos hace años. Aquí tenéis lo esencial para no perderos nada:</p>
      <div className="fact"><b>Cómo llegar:</b> A 1h en coche desde la ciudad. Habrá autobús gratuito de ida y vuelta (parada e indicaciones más abajo).</div>
      <div className="fact"><b>Dónde dormir:</b> Hotel Rural [Nombre] y Casa Rural [Nombre], con precio especial para invitados.</div>
      <div className="fact"><b>Qué ver:</b> Plaza mayor, ermita del s. XVII y el mirador con vistas al valle — ideal si llegáis con tiempo el día antes.</div>
      <div className="fact"><b>Parking:</b> Zona habilitada junto a la iglesia, señalizada el día del evento.</div>
      <p style={{ marginTop: 14, color: '#777', fontSize: '11.5px' }}>💡 Consejo: si venís de fuera, os recomendamos llegar la tarde-noche anterior.</p>
    </div>
  );
}
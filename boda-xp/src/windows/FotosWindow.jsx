export default function FotosWindow() {
  const fotos = [
    { emoji: '🐕', nombre: 'durmiendo, como siempre' },
    { emoji: '🦴', nombre: 'vigilando el jardín' },
    { emoji: '🐾', nombre: "listo pa' la boda" },
    { emoji: '🐕‍🦺', nombre: 'con su pajarita' },
    { emoji: '😴', nombre: 'siesta oficial' },
    { emoji: '🎾', nombre: 'modo zoomies' },
  ];

  return (
    <div>
      <p style={{ marginTop: 0, color: '#777' }}>Carpeta random — aquí irían las fotos reales de [nombre del perro] 🐶</p>

      <div className="photo-grid">
        {fotos.map((foto, i) => (
          <figure key={foto.nombre} className="polaroid" style={{ '--r': `${[-4, 3, -2, 5, -3, 2][i]}deg` }}>
            <div className="ph" style={{ background: ['#f2d9b0', '#d9ecf2', '#f2e0d9', '#e0f2d9', '#f2d9e8', '#d9e0f2'][i] }}>{foto.emoji}</div>
            <figcaption>{foto.nombre}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
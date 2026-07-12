import { useState } from 'react';

export default function ConfirmWindow() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  };

  return (
    <form className="rsvp" onSubmit={handleSubmit}>
      <div className="row">
        <label>Nombre y apellidos</label>
        <input type="text" required placeholder="Ej: Ana Pérez" />
      </div>

      <fieldset>
        <legend>¿Asistirás?</legend>
        <div className="radiogroup">
          <label><input type="radio" name="asiste" value="si" defaultChecked /> Sí, allí estaré</label>
          <label><input type="radio" name="asiste" value="no" /> No podré ir</label>
        </div>
      </fieldset>

      <div className="row">
        <label>Número de acompañantes (incluyéndote)</label>
        <input type="number" min="1" max="10" defaultValue="1" />
      </div>

      <div className="row">
        <label>Alergias o restricciones alimentarias</label>
        <textarea placeholder="Ej: intolerancia al gluten, vegetariano..." />
      </div>

      <div className="row">
        <label>Una canción que no puede faltar 🎶</label>
        <input type="text" placeholder="Título - Artista" />
      </div>

      <div className="row">
        <label>Mensaje para los novios (opcional)</label>
        <textarea placeholder="¡Enhorabuena!" />
      </div>

      <button className="xpbtn" type="submit">Enviar confirmación</button>
      <div className="rsvp-msg" style={{ display: submitted ? 'block' : 'none' }}>
        ✔ ¡Gracias! Tu respuesta se ha guardado.
      </div>
    </form>
  );
}
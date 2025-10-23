export default function Nosotros() {
  return (
    <div className="container">
      <h2>Sobre Nosotros</h2>
      <p>
        <strong>Solar Affinity SpA</strong> es una empresa chilena dedicada a la
        instalación y mantención de sistemas solares residenciales y comerciales.
        Nuestro propósito es impulsar la independencia energética de los hogares,
        conectando a las personas con la energía limpia del sol.
      </p>

      <p>
        Contamos con un equipo técnico certificado y con experiencia en proyectos
        fotovoltaicos y termosolares, garantizando instalaciones seguras, eficientes
        y en cumplimiento con la normativa chilena (TE4 y SEC).
      </p>

      <p>
        En Solar Affinity creemos que la energía solar no solo reduce costos,
        sino que también fortalece comunidades sostenibles. Acompañamos a nuestros
        clientes desde la evaluación técnica hasta la puesta en marcha y mantención anual.
      </p>

      <section className="mision-vision-valores">
        <div className="card">
          <h3>Misión</h3>
          <p>
            Promover la independencia energética en Chile mediante soluciones solares
            accesibles, eficientes y sustentables, mejorando la calidad de vida y reduciendo
            el impacto ambiental.
          </p>
        </div>

        <div className="card">
          <h3>Visión</h3>
          <p>
            Ser un referente nacional en energía solar, reconocido por la innovación,
            la calidad de nuestras instalaciones y el compromiso con nuestros clientes
            y el medio ambiente.
          </p>
        </div>

        <div className="card">
          <h3>Valores</h3>
          <ul>
            <li><strong>Sostenibilidad:</strong> trabajamos por un futuro más limpio.</li>
            <li><strong>Transparencia:</strong> construimos confianza a través de la honestidad.</li>
            <li><strong>Excelencia:</strong> cada proyecto refleja nuestro compromiso con la calidad.</li>
            <li><strong>Comunidad:</strong> la energía nos une y nos mueve hacia un mismo propósito.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

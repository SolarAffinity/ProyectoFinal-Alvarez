import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
  const images = useMemo(() => ([
    '/img/solar-1.jpg',
    '/img/solar-2.jpg',
    '/img/solar-3.jpg'
  ]), [])

  const [index, setIndex] = useState(0)
  const [fading, setFading] = useState(false)
  const timerRef = useRef(null)

  const goTo = (i) => {
    setFading(true)
    setTimeout(() => {
      setIndex((i + images.length) % images.length)
      setFading(false)
    }, 300) // duración del fade-out
  }

  const next = () => goTo(index + 1)
  const prev = () => goTo(index - 1)

  useEffect(() => {
    timerRef.current && clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      next()
    }, 5000)
    return () => clearInterval(timerRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  return (
    <div
      style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Imagen del carrusel */}
      <img
        src={images[index]}
        alt="Fotografía de instalaciones solares"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'opacity 300ms ease',
          opacity: fading ? 0 : 1,
          filter: 'brightness(0.75)'
        }}
      />

      {/* Overlay de contenido */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 680,
          width: '92%',
          padding: '2rem',
          backgroundColor: 'rgba(0,0,0,0.35)',
          color: '#fff',
          textAlign: 'center',
          borderRadius: '1rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
          backdropFilter: 'blur(2px)'
        }}
      >
        <h1 style={{fontSize: '2.4rem', lineHeight: 1.1, margin: 0, marginBottom: '1rem', color: '#F7C600'}}>
          Instalaciones solares residenciales
        </h1>
        <p style={{marginBottom: '1.6rem'}}>
          Fotovoltaico (5–10 kW híbridos), termosolar y mantenciones. En Santiago y alrededores.
        </p>

        <div style={{display:'flex', gap:'.8rem', flexWrap:'wrap', justifyContent:'center', marginBottom: '1rem'}}>
          <Link
            to="/servicios"
            style={{
              backgroundColor: '#F7C600',
              color: '#000',
              padding: '.9rem 1.4rem',
              borderRadius: '.6rem',
              textDecoration: 'none',
              fontWeight: 700
            }}
          >
            Ver Servicios
          </Link>
          <Link
            to="/agendar"
            style={{
              backgroundColor: '#fff',
              color: '#000',
              padding: '.9rem 1.4rem',
              borderRadius: '.6rem',
              textDecoration: 'none',
              fontWeight: 700
            }}
          >
            Agendar visita técnica
          </Link>
        </div>

        {/* Controles del carrusel */}
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '.25rem'}}>
          <button
            onClick={prev}
            aria-label="Anterior"
            style={{
              border: 'none',
              padding: '.6rem .9rem',
              borderRadius: '.6rem',
              background: 'rgba(255,255,255,0.9)',
              cursor: 'pointer',
              fontWeight: 700
            }}
          >
            ◀
          </button>

          <div style={{display:'flex', gap: '.5rem'}}>
            {images.map((_, i) => (
              <button
                key={i}
                aria-label={`Ir a la imagen ${i+1}`}
                onClick={() => goTo(i)}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '999px',
                  border: 'none',
                  cursor: 'pointer',
                  background: i === index ? '#F7C600' : 'rgba(255,255,255,0.7)'
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Siguiente"
            style={{
              border: 'none',
              padding: '.6rem .9rem',
              borderRadius: '.6rem',
              background: 'rgba(255,255,255,0.9)',
              cursor: 'pointer',
              fontWeight: 700
            }}
          >
            ▶
          </button>
        </div>

        {/* Imagen decorativa opcional bajo el contenido */}
        <img
          src="/img/solar-home-mini.jpg"
          alt="Instalación solar en techo residencial"
          style={{
            width: '100%',
            maxWidth: 520,
            borderRadius: '1rem',
            marginTop: '1.2rem',
            boxShadow: '0 6px 18px rgba(0,0,0,0.35)'
          }}
        />
      </div>

      {/* Degradado sutil en la parte inferior para legibilidad */}
      <div
        style={{
          position: 'absolute',
          inset: 'auto 0 0 0',
          height: '40%',
          background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.45) 70%)',
          zIndex: 1
        }}
      />
    </div>
  )
}

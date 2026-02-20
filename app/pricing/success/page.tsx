'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function SuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push('/chat')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center" style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
    }}>
      <div style={{
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        padding: '3rem',
        maxWidth: '600px',
        width: '100%',
        border: '1px solid rgba(0, 206, 209, 0.3)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
        textAlign: 'center'
      }}>
        {/* Logo */}
        <div style={{ marginBottom: '2rem' }}>
          <Image 
            src="/logo-from-e.png" 
            alt="From E Labs Logo" 
            width={80} 
            height={80}
            style={{ margin: '0 auto' }}
          />
        </div>

        {/* Success Icon */}
        <div style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'rgba(0, 206, 209, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 2rem',
          border: '3px solid #00CED1'
        }}>
          <span style={{ fontSize: '3rem' }}>✓</span>
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: 'white',
          marginBottom: '1rem'
        }}>
          ¡Pago Exitoso!
        </h1>

        {/* Description */}
        <p style={{
          fontSize: '1.2rem',
          color: 'rgba(255, 255, 255, 0.7)',
          marginBottom: '2rem',
          lineHeight: '1.6'
        }}>
          Tu suscripción ha sido activada correctamente. Ya puedes disfrutar de todos los beneficios de tu nuevo plan.
        </p>

        {/* Session ID */}
        {sessionId && (
          <p style={{
            fontSize: '0.9rem',
            color: 'rgba(255, 255, 255, 0.5)',
            marginBottom: '2rem',
            fontFamily: 'monospace'
          }}>
            ID de sesión: {sessionId}
          </p>
        )}

        {/* Countdown */}
        <p style={{
          fontSize: '1rem',
          color: '#00CED1',
          marginBottom: '2rem'
        }}>
          Serás redirigido al chat en {countdown} segundos...
        </p>

        {/* Button */}
        <button
          onClick={() => router.push('/chat')}
          style={{
            padding: '14px 32px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #00CED1 0%, #008B8B 100%)',
            border: 'none',
            color: 'white',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0, 206, 209, 0.4)',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 206, 209, 0.6)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 206, 209, 0.4)'
          }}
        >
          Ir al Chat ahora
        </button>
      </div>
    </div>
  )
}

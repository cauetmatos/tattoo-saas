"use client"

import { useSearchParams, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function HorariosPage() {
  const searchParams = useSearchParams()
  const params = useParams()
  
  // Captura o ID do serviço da URL (?serviceId=...)
  const serviceId = searchParams.get('serviceId')
  // Captura o nome do estúdio da URL (/agendar/NOME-DO-ESTUDIO/...)
  const studioSlug = params.slug 

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (serviceId) {
      // Aqui você fará a busca de horários disponíveis no Supabase
      console.log("Buscando horários para o serviço:", serviceId)
      setLoading(false)
    }
  }, [serviceId])

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold text-orange-500 mb-4">Horários Disponíveis</h1>
      <p className="text-zinc-400">Estúdio: <span className="text-white">{studioSlug}</span></p>
      
      {loading ? (
        <p className="mt-8 text-center">Carregando horários...</p>
      ) : (
        <div className="mt-8">
          {/* Aqui entrará a sua grade de horários */}
          <p>Mostrando horários para o serviço ID: {serviceId}</p>
        </div>
      )}
    </div>
  )
}
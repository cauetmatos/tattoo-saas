"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'


export default function PaginaSucesso({ params }: { params: { slug: string } }) {
  const [estudio, setEstudio] = useState<any>(null)

  const router = useRouter();

  useEffect(() => {
    async function carregarEstudio() {
      
      const { data } = await supabase
        .from('studios')
        .select('*')
        .eq('slug', params.slug)
        .single()
      
      if (data) setEstudio(data)
    }
    carregarEstudio()
  }, [params.slug])

  if (!estudio) return <div className="p-10 text-center">Carregando...</div>

  
  const mensagem = `Olá! Acabei de realizar um agendamento no ${estudio.name}.`
  const linkWhats = `https://wa.me/${estudio.whatsapp}?text=${encodeURIComponent(mensagem)}`

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white p-8 rounded-3xl shadow-lg max-w-sm w-full">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Agendamento Realizado!</h1>
        <p className="text-gray-600 mb-8">
          Seus dados foram enviados para o <strong>{estudio.name}</strong>.
        </p>

        <a 
          href={linkWhats} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-full bg-[#25D366] text-white font-bold py-4 rounded-xl hover:bg-[#1ebe57] transition-all mb-4"
        >
          Confirmar no WhatsApp
        </a>
        
        <Link href={`/agendar/${params.slug}`} className="text-blue-600 text-sm font-medium">
          Fazer outro agendamento
        </Link>
      </div>
    </div>
  )
}
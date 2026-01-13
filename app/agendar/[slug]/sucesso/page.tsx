"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useParams } from 'next/navigation' // Importação correta para Client Components

export default function PaginaSucesso() {
  const [estudio, setEstudio] = useState<any>(null)
  const [erro, setErro] = useState(false) // Novo estado para tratar falhas
  const params = useParams() // Pega o slug da URL de forma segura

  useEffect(() => {
    async function carregarEstudio() {
      if (!params?.slug) return;

      const { data, error } = await supabase
        .from('studios')
        .select('*')
        .eq('slug', params.slug)
        .single()

      if (error) {
        console.error("Erro ao buscar estúdio:", error.message)
        setErro(true)
      } else {
        setEstudio(data)
      }
    }
    carregarEstudio()
  }, [params?.slug])

  if (erro) return <div className="p-10 text-center">Erro ao carregar dados do estúdio.</div>
  if (!estudio) return <div className="p-10 text-center">Carregando...</div>

  const mensagem = `Olá! Acabei de realizar um agendamento no ${estudio.name}.`
  const linkWhats = `https://wa.me/${estudio.whatsapp}?text=${encodeURIComponent(mensagem)}`

  return (
    <main className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 max-w-md w-full">
        <h1 className="text-3xl font-bold text-orange-500 mb-4">Agendamento Realizado!</h1>
        <p className="text-zinc-400 mb-8">
          Tudo certo! Agora você precisa confirmar seu horário via WhatsApp com o tatuador.
        </p>
        
        <a 
          href={linkWhats}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-xl w-full block transition-all"
        >
          CONFIRMAR NO WHATSAPP
        </a>

        <Link href={`/agendar/${params.slug}`} className="block mt-6 text-zinc-500 hover:text-zinc-300 text-sm">
          Voltar para o início
        </Link>
      </div>
    </main>
  )
}
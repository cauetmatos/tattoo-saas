"use client"

import { useParams, useRouter } from 'next/navigation'
import { CheckCircle2, MessageSquare, ArrowLeft } from 'lucide-react'

export default function SucessoPage() {
  const params = useParams()
  const router = useRouter()
  const studioSlug = params.slug

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="max-w-sm w-full bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-orange-500/10 p-4 rounded-full">
            <CheckCircle2 className="size-12 text-orange-500" />
          </div>
        </div>
        <h1 className="text-2xl font-extrabold mb-2">Agendamento Realizado!</h1>
        <p className="text-zinc-400 text-sm mb-8">Confirme agora pelo WhatsApp.</p>
        <div className="space-y-3">
          <button onClick={() => window.open('https://wa.me/5513991671641', '_blank')}
            className="w-full bg-orange-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2">
            <MessageSquare size={18} /> CONFIRMAR NO WHATSAPP
          </button>
          <button onClick={() => router.push(`/agendar/${studioSlug}`)}
            className="w-full text-zinc-400 text-sm flex items-center justify-center gap-2">
            <ArrowLeft size={14} /> Voltar para os serviços
          </button>
        </div>
      </div>
    </div>
  )
}
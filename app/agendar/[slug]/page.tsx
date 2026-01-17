"use client"

import { useParams, useRouter } from 'next/navigation'
import { CheckCircle2, MessageSquare, ArrowLeft } from 'lucide-react'

export default function SucessoPage() {
  const params = useParams()
  const router = useRouter()
  
  // Pegamos o 'slug' (ex: cadu-tattoo) diretamente dos parâmetros da URL
  const studioSlug = params.slug

  const handleVoltarParaServicos = () => {
    // Redireciona especificamente para /agendar/cadu-tattoo
    if (studioSlug) {
      router.push(`/agendar/${studioSlug}`)
    } else {
      // Caso algo dê errado, ele volta uma página
      router.back()
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="max-w-sm w-full bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 text-center shadow-2xl">
        
        <div className="flex justify-center mb-6">
          <div className="bg-orange-500/10 p-4 rounded-full">
            <CheckCircle2 className="size-12 text-orange-500" />
          </div>
        </div>

        <h1 className="text-2xl font-extrabold mb-2 tracking-tight">
          Agendamento Realizado!
        </h1>
        
        <p className="text-zinc-400 text-sm mb-8 leading-relaxed">
          Tudo certo! Agora você precisa confirmar seu horário via WhatsApp com o tatuador.
        </p>

        <div className="space-y-3">
          <button 
            onClick={() => window.open('https://wa.me/5513991671641', '_blank')}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
          >
            <MessageSquare size={18} />
            CONFIRMAR NO WHATSAPP
          </button>

          {/* BOTÃO CORRIGIDO AQUI */}
          <button 
            onClick={handleVoltarParaServicos}
            className="w-full bg-transparent hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 font-medium py-3 rounded-2xl transition-all text-sm flex items-center justify-center gap-2"
          >
            <ArrowLeft size={14} />
            Voltar para os serviços
          </button>
        </div>
      </div>
    </div>
  )
}
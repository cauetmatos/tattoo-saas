"use client"

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Calendar, User, Phone, Scissors, CheckCircle2, Loader2 } from 'lucide-react'

export default function PaginaAgendamentoCliente({ params }: { params: { slug: string } }) {
  const [servicos, setServicos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [sucesso, setSucesso] = useState(false)
  const [enviando, setEnviando] = useState(false)

  // Estados do Formulário
  const [nome, setNome] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [servicoSelecionado, setServicoSelecionado] = useState('')
  const [dataHora, setDataHora] = useState('')

  useEffect(() => {
    async function carregarDadosEstudio() {
      // 1. Buscamos o estúdio pelo slug (cadu-tattoo)
      const { data: estudio } = await supabase
        .from('studios')
        .select('id')
        .eq('slug', params.slug)
        .single()

      if (estudio) {
        // 2. Buscamos os serviços deste estúdio
        const { data: servs } = await supabase
          .from('services')
          .select('*')
          .eq('studio_id', estudio.id)
          .order('price', { ascending: true })
        
        setServicos(servs || [])
      }
      setLoading(false)
    }
    carregarDadosEstudio()
  }, [params.slug])

  async function handleAgendar(e: React.FormEvent) {
    e.preventDefault()
    setEnviando(true)

    const { error } = await supabase.from('appointments').insert([{
      customer_name: nome,
      customer_phone: whatsapp.replace(/\D/g, ''), // Limpa o telefone
      service_id: servicoSelecionado,
      appointment_date: dataHora,
      studio_id: '6ce31667-7ee3-4a77-b155-b92d7ca668d2' // Seu ID fixo por enquanto
    }])

    if (!error) setSucesso(true)
    setEnviando(false)
  }

  if (loading) return <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">Carregando estúdio...</div>

  if (servicos.length === 0 && !loading) {
    return <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">Estúdio não encontrado ou sem serviços ativos.</div>
  }

  if (sucesso) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 text-center">
        <CheckCircle2 size={80} className="text-green-500 mb-6 animate-bounce" />
        <h1 className="text-3xl font-black text-white mb-2">AGENDADO COM SUCESSO!</h1>
        <p className="text-zinc-400 mb-8">Cadu recebeu seu pedido e entrará em contato em breve.</p>
        <button onClick={() => window.location.reload()} className="text-orange-500 font-bold underline">Fazer outro agendamento</button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans p-6 md:p-12">
      <div className="max-w-xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-black tracking-tighter uppercase text-orange-500">Agende sua Tattoo</h1>
          <p className="text-zinc-500 mt-2 font-medium">Escolha o serviço e o melhor horário para você.</p>
        </header>

        <form onSubmit={handleAgendar} className="space-y-6">
          {/* Nome */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-zinc-500 ml-2">Seu Nome</label>
            <div className="relative">
              <User className="absolute left-4 top-4 text-zinc-600" size={20} />
              <input required className="w-full bg-zinc-900 border border-zinc-800 p-4 pl-12 rounded-2xl outline-none focus:border-orange-500" placeholder="Ex: Maria Oliveira" value={nome} onChange={e => setNome(e.target.value)} />
            </div>
          </div>

          {/* WhatsApp */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-zinc-500 ml-2">WhatsApp</label>
            <div className="relative">
              <Phone className="absolute left-4 top-4 text-zinc-600" size={20} />
              <input required type="tel" className="w-full bg-zinc-900 border border-zinc-800 p-4 pl-12 rounded-2xl outline-none focus:border-orange-500" placeholder="(13) 99999-9999" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />
            </div>
          </div>

          {/* Seleção de Serviço Dinâmica */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-zinc-500 ml-2">Escolha o Serviço</label>
            <div className="grid gap-3">
              {servicos.map(s => (
                <label key={s.id} className={`flex justify-between items-center p-4 rounded-2xl border cursor-pointer transition-all ${servicoSelecionado === s.id ? 'border-orange-500 bg-orange-500/10' : 'border-zinc-800 bg-zinc-900 hover:border-zinc-700'}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="servico" required className="hidden" onChange={() => setServicoSelecionado(s.id)} />
                    <Scissors size={18} className={servicoSelecionado === s.id ? 'text-orange-500' : 'text-zinc-600'} />
                    <span className="font-bold">{s.name}</span>
                  </div>
                  <span className="text-orange-500 font-black">R$ {s.price}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Data e Hora */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-zinc-500 ml-2">Data e Horário</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-4 text-zinc-600" size={20} />
              <input required type="datetime-local" className="w-full bg-zinc-900 border border-zinc-800 p-4 pl-12 rounded-2xl outline-none focus:border-orange-500 text-white" value={dataHora} onChange={e => setDataHora(e.target.value)} />
            </div>
          </div>

          <button disabled={enviando} className="w-full bg-orange-600 hover:bg-orange-500 text-white font-black py-5 rounded-3xl transition-all shadow-xl shadow-orange-900/20 flex items-center justify-center gap-3 uppercase tracking-widest">
            {enviando ? <Loader2 className="animate-spin" /> : "FINALIZAR AGENDAMENTO"}
          </button>
        </form>
      </div>
    </div>
  )
}
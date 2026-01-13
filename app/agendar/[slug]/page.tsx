"use client"

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Calendar, User, Phone, Scissors, CheckCircle2, Loader2 } from 'lucide-react'

export default function PaginaAgendamentoCliente({ params }: { params: { slug: string } }) {
  const [servicos, setServicos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [sucesso, setSucesso] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [estudioId, setEstudioId] = useState('') // Guardaremos o ID real aqui

  const [nome, setNome] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [servicoSelecionado, setServicoSelecionado] = useState('')
  const [dataHora, setDataHora] = useState('')

  useEffect(() => {
    async function carregarPagina() {
      console.log("Iniciando busca para o slug:", params.slug);

      // 1. Busca o estúdio pelo slug da URL
      const { data: estudio, error: erroEstudio } = await supabase
        .from('studios')
        .select('id, name')
        .eq('slug', params.slug)
        .single()

      if (erroEstudio || !estudio) {
        console.error("Estúdio não encontrado no banco:", erroEstudio);
        setLoading(false);
        return;
      }

      setEstudioId(estudio.id);
      console.log("Estúdio encontrado! ID:", estudio.id);

      // 2. Busca serviços usando o ID que acabamos de achar
      const { data: servs, error: erroServs } = await supabase
        .from('services')
        .select('*')
        .eq('studio_id', estudio.id) // Nome da coluna com underscore
        .order('price', { ascending: true })

      if (erroServs) {
        console.error("Erro ao buscar serviços:", erroServs);
      } else {
        console.log("Serviços carregados:", servs?.length);
        setServicos(servs || []);
      }
      
      setLoading(false)
    }
    carregarPagina()
  }, [params.slug])

  async function handleAgendar(e: React.FormEvent) {
    e.preventDefault()
    if (!estudioId) return;
    setEnviando(true)

    const { error } = await supabase.from('appointments').insert([{
      customer_name: nome,
      customer_phone: whatsapp.replace(/\D/g, ''),
      service_id: servicoSelecionado,
      appointment_date: dataHora,
      studio_id: estudioId // Usa o ID dinâmico encontrado
    }])

    if (!error) setSucesso(true)
    else alert("Erro ao agendar: " + error.message)
    setEnviando(false)
  }

  if (loading) return <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white font-sans">Carregando estúdio...</div>

  // Se o estúdio ou serviços não forem carregados, mostra este erro
  if (servicos.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-white p-6 text-center">
        <h1 className="text-2xl font-bold text-orange-500 mb-4">Estúdio não encontrado ou sem serviços.</h1>
        <p className="text-zinc-500">Verifique se o slug "{params.slug}" está correto no banco de dados.</p>
      </div>
    )
  }

  // ... (Restante do seu código de formulário igual ao anterior)
  if (sucesso) return <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">Agendado!</div>

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans p-6">
       {/* Formulário aqui... */}
       <h1 className="text-center text-2xl font-black mb-10 uppercase tracking-tighter text-orange-500">Agendamento Online</h1>
       <form onSubmit={handleAgendar} className="max-w-md mx-auto space-y-4">
          <input required placeholder="Seu Nome" className="w-full bg-zinc-900 p-4 rounded-xl border border-zinc-800" value={nome} onChange={e => setNome(e.target.value)} />
          <input required placeholder="Seu WhatsApp" className="w-full bg-zinc-900 p-4 rounded-xl border border-zinc-800" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />
          
          <div className="grid gap-2">
            {servicos.map(s => (
              <button key={s.id} type="button" onClick={() => setServicoSelecionado(s.id)} className={`p-4 rounded-xl border text-left flex justify-between ${servicoSelecionado === s.id ? 'border-orange-500 bg-orange-500/10' : 'border-zinc-800 bg-zinc-900'}`}>
                <span>{s.name}</span>
                <span className="text-orange-500 font-bold">R$ {s.price}</span>
              </button>
            ))}
          </div>

          <input required type="datetime-local" className="w-full bg-zinc-900 p-4 rounded-xl border border-zinc-800 text-white" value={dataHora} onChange={e => setDataHora(e.target.value)} />
          
          <button disabled={enviando} className="w-full bg-orange-600 p-5 rounded-2xl font-black uppercase tracking-widest">
            {enviando ? "ENVIANDO..." : "FINALIZAR AGENDAMENTO"}
          </button>
       </form>
    </div>
  )
}
"use client"
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AgendamentoPublico() {
  const { slug } = useParams()
  const router = useRouter()
  
  const [studio, setStudio] = useState<any>(null)
  const [servicos, setServicos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Estados do formulário de agendamento
  const [nome, setNome] = useState('')
  const [phone, setPhone] = useState('')
  const [servicoId, setServicoId] = useState('')
  const [dataHora, setDataHora] = useState('')

  useEffect(() => {
    async function carregarDados() {
      // 1. Busca os dados do estúdio pelo slug da URL (ex: cadu-tatto)
      const { data: studioData } = await supabase
        .from('studios')
        .select('*')
        .eq('slug', slug)
        .single()

      if (studioData) {
        setStudio(studioData)
        // 2. Busca os serviços cadastrados para este estúdio
        const { data: servicesData } = await supabase
          .from('services')
          .select('*')
          .eq('studio_id', studioData.id)
        setServicos(servicesData || [])
      }
      setLoading(false)
    }
    carregarDados()
  }, [slug])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    // 3. Salva o agendamento na tabela 'appointments' do Supabase
    const { error } = await supabase.from('appointments').insert([{
      studio_id: studio.id,
      client_name: nome,
      client_phone: phone,
      service_id: servicoId,
      date: dataHora
    }])

    if (!error) {
      // 4. Redireciona para a página de sucesso que você já criou
      router.push(`/agendar/${slug}/sucesso`)
    } else {
      alert("Erro ao realizar agendamento: " + error.message)
    }
  }

  if (loading) return <div className="p-10 text-center font-bold">Carregando estúdio...</div>
  if (!studio) return <div className="p-10 text-center font-bold">Estúdio não encontrado.</div>

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 font-sans text-black">
      <div className="max-w-md mx-auto bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
        <div className="bg-black p-10 text-center text-white">
          <h1 className="text-2xl font-black uppercase tracking-widest">{studio.name}</h1>
          <p className="text-orange-500 font-bold mt-2 text-sm uppercase italic">Reserve seu horário</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-xs font-black uppercase text-gray-400 mb-2">Seu Nome Completo</label>
            <input 
              className="w-full border-2 border-gray-100 p-4 rounded-2xl bg-gray-50 focus:border-orange-500 outline-none transition-all" 
              value={nome} onChange={e => setNome(e.target.value)} required 
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-gray-400 mb-2">WhatsApp (com DDD)</label>
            <input 
              className="w-full border-2 border-gray-100 p-4 rounded-2xl bg-gray-50 focus:border-orange-500 outline-none transition-all" 
              placeholder="Ex: 13991671641"
              value={phone} onChange={e => setPhone(e.target.value)} required 
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-gray-400 mb-2">Escolha a Tattoo</label>
            <select 
              className="w-full border-2 border-gray-100 p-4 rounded-2xl bg-gray-50 focus:border-orange-500 outline-none transition-all"
              value={servicoId} onChange={e => setServicoId(e.target.value)} required
            >
              <option value="">Selecione um serviço...</option>
              {servicos.map(s => (
                <option key={s.id} value={s.id}>{s.name} — R$ {s.price}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-gray-400 mb-2">Data e Horário</label>
            <input 
              type="datetime-local" 
              className="w-full border-2 border-gray-100 p-4 rounded-2xl bg-gray-50 focus:border-orange-500 outline-none transition-all" 
              value={dataHora} onChange={e => setDataHora(e.target.value)} required 
            />
          </div>

          <button className="w-full bg-orange-600 text-white py-5 rounded-2xl font-black text-xl shadow-xl shadow-orange-100 hover:scale-[1.02] active:scale-95 transition-all">
            FINALIZAR AGENDAMENTO
          </button>
        </form>
      </div>
    </div>
  )
}
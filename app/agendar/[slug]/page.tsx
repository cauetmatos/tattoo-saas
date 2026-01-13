"use client"

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

// 1. Definição da Estrutura de Serviços Categorizada
const CATEGORIAS_SERVICOS = [
  {
    titulo: "Por Tamanho",
    itens: [
      { id: "tam_p", nome: "Tatuagem Pequena (até 5cm)", preco: 200 },
      { id: "tam_m", nome: "Tatuagem Média (até 15cm)", preco: 600 },
      { id: "tam_g", nome: "Tatuagem Grande (+15cm)", preco: 1200 },
      { id: "tam_f", nome: "Fechamento Completo", preco: 3000 },
    ]
  },
  {
    titulo: "Por Tempo",
    itens: [
      { id: "time_h", nome: "Valor por Hora", preco: 250 },
      { id: "time_m", nome: "Sessão Mínima", preco: 150 },
      { id: "time_d", nome: "Diária (Full Day)", preco: 1800 },
    ]
  },
  {
    titulo: "Adicionais e Especiais",
    itens: [
      { id: "add_ret", nome: "Retoque", preco: 100 },
      { id: "add_cov", nome: "Cover-up (Cobertura)", preco: 500 },
      { id: "add_ref", nome: "Reforma de Tatuagem", preco: 350 },
      { id: "add_art", nome: "Arte Personalizada", preco: 150 },
      { id: "add_prc", nome: "Piercing (Aplicação + Joia)", preco: 120 },
    ]
  }
]

export default function AgendamentoPublico() {
  const params = useParams()
  const router = useRouter()
  const slug = params?.slug as string

  const [studio, setStudio] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  
  // Estados do Formulário
  const [nome, setNome] = useState('')
  const [phone, setPhone] = useState('')
  const [servicoId, setServicoId] = useState('')
  const [dataHora, setDataHora] = useState('')

  useEffect(() => {
    async function carregarDados() {
      if (!slug) return
      const { data } = await supabase.from('studios').select('*').eq('slug', slug).single()
      if (data) setStudio(data)
      setLoading(false)
    }
    carregarDados()
  }, [slug])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    // Inserção com nomes de colunas corrigidos para o Supabase
    const { error } = await supabase.from('appointments').insert([{
      studio_id: studio.id,
      customer_name: nome,      
      customer_phone: phone,    
      service_id: servicoId,    
      appointment_date: dataHora 
    }])

    if (!error) {
      router.push(`/agendar/${slug}/sucesso`)
    } else {
      alert("Erro ao realizar agendamento: " + error.message)
    }
  }

  if (loading) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Carregando estúdio...</div>
  if (!studio) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Estúdio não encontrado.</div>

  return (
    <main className="min-h-screen bg-zinc-950 text-white flex flex-col items-center p-4 md:p-10">
      <div className="w-full max-w-lg bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl">
        
        {/* Header do Estúdio */}
        <div className="bg-black p-8 text-center border-b-4 border-orange-500">
          <h1 className="text-3xl font-black uppercase tracking-tighter">{studio.name}</h1>
          <p className="text-orange-500 italic font-bold text-sm">RESERVE SEU HORÁRIO</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Nome */}
          <div>
            <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Seu Nome Completo</label>
            <input 
              required
              className="w-full p-4 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-orange-500 transition-all outline-none"
              placeholder="Ex: Maria Souza"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          {/* WhatsApp */}
          <div>
            <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">WhatsApp (Com DDD)</label>
            <input 
              required
              className="w-full p-4 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-orange-500 transition-all outline-none"
              placeholder="Ex: 13991671641"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Seleção de Serviço Categorizada */}
          <div>
            <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Escolha o Serviço</label>
            <select 
              required
              className="w-full p-4 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-orange-500 transition-all outline-none appearance-none"
              value={servicoId}
              onChange={(e) => setServicoId(e.target.value)}
            >
              <option value="">Selecione um serviço...</option>
              {CATEGORIAS_SERVICOS.map((cat) => (
                <optgroup key={cat.titulo} label={cat.titulo} className="bg-zinc-900 text-orange-500">
                  {cat.itens.map((item) => (
                    <option key={item.id} value={item.id} className="text-white">
                      {item.nome} — R$ {item.preco}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          {/* Data e Horário */}
          <div>
            <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Data e Horário</label>
            <input 
              required
              type="datetime-local"
              className="w-full p-4 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-orange-500 transition-all outline-none"
              value={dataHora}
              onChange={(e) => setDataHora(e.target.value)}
            />
          </div>

          <button 
            type="submit"
            className="w-full py-5 bg-orange-600 hover:bg-orange-500 text-white font-black uppercase rounded-2xl transition-all shadow-lg shadow-orange-900/20"
          >
            Finalizar Agendamento
          </button>
        </form>
      </div>
    </main>
  )
}
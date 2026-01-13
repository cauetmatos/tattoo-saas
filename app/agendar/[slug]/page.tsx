"use client"

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

// 1. Definição da Estrutura de Serviços Categorizada
const CATEGORIAS_SERVICOS = [
  {
    titulo: "Por Tamanho",
    itens: [
      { id: "2b3de021-42fe-485e-8b0b-052103a4654f", nome: "Tatuagem Pequena (até 5cm)", preco: 200 },
      { id: "4c4bc0cd-64f1-4367-9cb1-b3001f6f4310", nome: "Tatuagem Média (até 15cm)", preco: 600 },
      { id: "e7e666af-3019-4975-8ef3-3d8e76f8f341", nome: "Tatuagem Grande (+15cm)", preco: 1200 },
      { id: "17c20029-66f8-422e-a905-7e4a756a3170", nome: "Fechamento Completo", preco: 3000 },
    ]
  },
  {
    titulo: "Por Tempo",
    itens: [
      { id: "499b9ce4-0f9f-4f01-b78d-7adb49c86c91", nome: "Valor por Hora", preco: 250 },
      { id: "41a20001-0ebd-43d4-a774-96ad6245340d", nome: "Sessão Mínima", preco: 150 },
      { id: "4459482f-1e21-4744-a2e2-2e68f2ccf2bf", nome: "Diária (Full Day)", preco: 1800 },
    ]
  },
  {
    titulo: "Adicionais e Especiais",
    itens: [
      { id: "8d96b762-c204-4dac-a930-26b9963326b7", nome: "Retoque", preco: 100 },
      { id: "78431516-352f-4c41-8a09-cc6cb9355c0c", nome: "Cover-up (Cobertura)", preco: 500 },
      { id: "3d12d2dc-f87c-4208-a8f3-c1d5f5358ba6", nome: "Reforma de Tatuagem", preco: 350 },
      { id: "5c40784f-6cd2-42fb-b0fa-f2ba5525923e", nome: "Arte Personalizada", preco: 150 },
      { id: "8b6034fd-7240-4416-bad0-4f7c34bef655", nome: "Piercing (Aplicação + Joia)", preco: 120 },
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
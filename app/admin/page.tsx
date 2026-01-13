"use client"
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Trash2, Plus, Scissors } from 'lucide-react'

export default function ConfigurarServicos() {
  const [servicos, setServicos] = useState<any[]>([])
  const [novoServico, setNovoServico] = useState({ name: '', price: '' })

  // Carrega os serviços do banco
  async function carregarServicos() {
    const { data } = await supabase.from('services').select('*').order('price', { ascending: true })
    if (data) setServicos(data)
  }

  useEffect(() => { carregarServicos() }, [])

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <header className="flex items-center gap-4">
        <div className="p-3 bg-orange-500/10 rounded-2xl text-orange-500">
          <Scissors size={32} />
        </div>
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">Meus Serviços</h1>
          <p className="text-zinc-500 font-medium">Gerencie o catálogo e os preços do seu estúdio.</p>
        </div>
      </header>

      {/* Seção de Adicionar Novo Serviço */}
      <section className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800 shadow-xl">
        <div className="flex flex-col md:flex-row gap-4">
          <input 
            placeholder="Nome do serviço (Ex: Fineline)"
            className="flex-1 bg-zinc-950 border border-zinc-800 p-4 rounded-2xl focus:border-orange-500 outline-none transition-all"
            value={novoServico.name}
            onChange={(e) => setNovoServico({...novoServico, name: e.target.value})}
          />
          <input 
            placeholder="Preço (Ex: 250)"
            type="number"
            className="w-full md:w-32 bg-zinc-950 border border-zinc-800 p-4 rounded-2xl focus:border-orange-500 outline-none transition-all"
            value={novoServico.price}
            onChange={(e) => setNovoServico({...novoServico, price: e.target.value})}
          />
          <button className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-8 py-4 rounded-2xl transition-all flex items-center justify-center gap-2">
            <Plus size={20} /> ADICIONAR
          </button>
        </div>
      </section>

      {/* Listagem de Serviços */}
      <div className="grid gap-4">
        {servicos.map((servico) => (
          <div key={servico.id} className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800 flex justify-between items-center group hover:border-zinc-700 transition-all shadow-lg">
            <div>
              <h3 className="text-white font-bold text-lg">{servico.name}</h3>
              <p className="text-orange-500 font-black text-xl">R$ {servico.price.toLocaleString('pt-BR')}</p>
            </div>
            <button className="p-4 text-zinc-600 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all flex items-center gap-2 font-bold text-xs">
              <Trash2 size={20} /> EXCLUIR
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
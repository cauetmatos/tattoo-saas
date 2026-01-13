"use client"
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Trash2, Plus, Scissors, Loader2 } from 'lucide-react'

export default function ConfigurarServicos() {
  const [servicos, setServicos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [enviando, setEnviando] = useState(false)
  
  // Estado para os inputs do novo serviço
  const [nome, setNome] = useState('')
  const [preco, setPreco] = useState('')

  // 1. CARREGAR: Busca serviços do estúdio
  async function carregarServicos() {
    setLoading(true)
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('price', { ascending: true })
    
    if (data) setServicos(data)
    setLoading(false)
  }

  useEffect(() => { carregarServicos() }, [])

  // 2. ADICIONAR: Insere novo serviço no Supabase
  async function adicionarServico(e: React.FormEvent) {
    e.preventDefault()
    if (!nome || !preco) return alert("Preencha todos os campos!")

    setEnviando(true)
    // Usando o ID do estúdio que identificamos nas suas tabelas
    const STUDIO_ID = '6ce31667-7ee3-4a77-b155-b92d7ca668d2' 

    const { data, error } = await supabase
      .from('services')
      .insert([{ 
        name: nome, 
        price: parseFloat(preco), 
        studio_id: STUDIO_ID 
      }])
      .select()

    if (!error) {
      setNome('')
      setPreco('')
      carregarServicos() // Atualiza a lista
    } else {
      alert("Erro ao adicionar: " + error.message)
    }
    setEnviando(false)
  }

  // 3. EXCLUIR: Remove serviço pelo ID (Lógica igual ao agendamento)
  async function excluirServico(id: string) {
    if (!confirm("Deseja realmente excluir este serviço do catálogo?")) return

    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id)

    if (!error) {
      setServicos(servicos.filter(s => s.id !== id)) // Update visual instantâneo
    } else {
      alert("Erro ao excluir: " + error.message)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      <header className="flex items-center gap-4">
        <div className="p-3 bg-orange-500/10 rounded-2xl text-orange-500">
          <Scissors size={32} />
        </div>
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">Meus Serviços</h1>
          <p className="text-zinc-500 font-medium">Gerencie o catálogo do seu estúdio em tempo real.</p>
        </div>
      </header>

      {/* Formulário de Adição */}
      <form onSubmit={adicionarServico} className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800 shadow-xl">
        <div className="flex flex-col md:flex-row gap-4">
          <input 
            placeholder="Nome do serviço (Ex: Fineline)"
            className="flex-1 bg-zinc-950 border border-zinc-800 p-4 rounded-2xl focus:border-orange-500 outline-none transition-all text-white"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input 
            placeholder="R$ Preço"
            type="number"
            className="w-full md:w-32 bg-zinc-950 border border-zinc-800 p-4 rounded-2xl focus:border-orange-500 outline-none transition-all text-white"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
          />
          <button 
            disabled={enviando}
            type="submit"
            className="bg-orange-600 hover:bg-orange-500 disabled:bg-zinc-800 text-white font-bold px-8 py-4 rounded-2xl transition-all flex items-center justify-center gap-2"
          >
            {enviando ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
            ADICIONAR
          </button>
        </div>
      </form>

      {/* Listagem de Serviços */}
      <div className="grid gap-4">
        {loading ? (
          <p className="text-center text-zinc-500">Carregando catálogo...</p>
        ) : servicos.map((servico) => (
          <div key={servico.id} className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800 flex justify-between items-center group hover:border-zinc-700 transition-all">
            <div>
              <h3 className="text-white font-bold text-lg">{servico.name}</h3>
              <p className="text-orange-500 font-black text-xl">R$ {Number(servico.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            </div>
            <button 
              onClick={() => excluirServico(servico.id)}
              className="p-4 text-zinc-600 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all"
            >
              <Trash2 size={24} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
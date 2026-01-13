"use client"
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Trash2, Plus, Scissors, Loader2 } from 'lucide-react'

export default function ConfigurarServicos() {
  const [servicos, setServicos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [enviando, setEnviando] = useState(false)
  const [nome, setNome] = useState('')
  const [preco, setPreco] = useState('')

  const STUDIO_ID = '6ce31667-7ee3-4a77-b155-b92d7ca668d2' // ID do seu estúdio

  async function carregarServicos() {
    setLoading(true)
    const { data } = await supabase.from('services').select('*').order('price', { ascending: true })
    if (data) setServicos(data)
    setLoading(false)
  }

  useEffect(() => { carregarServicos() }, [])

  async function adicionarServico(e: React.FormEvent) {
    e.preventDefault()
    if (!nome || !preco) return alert("Preencha todos os campos!")
    setEnviando(true)
    const { error } = await supabase.from('services').insert([{ name: nome, price: parseFloat(preco), studio_id: STUDIO_ID }])
    if (!error) {
      setNome(''); setPreco(''); carregarServicos()
    } else {
      alert("Erro ao adicionar: " + error.message)
    }
    setEnviando(false)
  }

  async function excluirServico(id: string) {
    if (!confirm("Deseja realmente excluir este serviço?")) return
    const { error } = await supabase.from('services').delete().eq('id', id)
    if (!error) setServicos(servicos.filter(s => s.id !== id))
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      <header className="flex items-center gap-4">
        <div className="p-3 bg-orange-500/10 rounded-2xl text-orange-500"><Scissors size={32} /></div>
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">Meus Serviços</h1>
          <p className="text-zinc-500 font-medium">Gerencie o catálogo do seu estúdio em tempo real.</p>
        </div>
      </header>

      <form onSubmit={adicionarServico} className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800 shadow-xl flex flex-col md:flex-row gap-4">
        <input placeholder="Nome do serviço" className="flex-1 bg-zinc-950 border border-zinc-800 p-4 rounded-2xl outline-none text-white focus:border-orange-500" value={nome} onChange={(e) => setNome(e.target.value)} />
        <input placeholder="Preço" type="number" className="w-full md:w-32 bg-zinc-950 border border-zinc-800 p-4 rounded-2xl outline-none text-white focus:border-orange-500" value={preco} onChange={(e) => setPreco(e.target.value)} />
        <button disabled={enviando} className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-8 py-4 rounded-2xl flex items-center gap-2">
          {enviando ? <Loader2 className="animate-spin" /> : <Plus />} ADICIONAR
        </button>
      </form>

      <div className="grid gap-4">
        {servicos.map((s) => (
          <div key={s.id} className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800 flex justify-between items-center group">
            <div>
              <h3 className="text-white font-bold text-lg">{s.name}</h3>
              <p className="text-orange-500 font-black text-xl text-left">R$ {Number(s.price).toLocaleString('pt-BR')}</p>
            </div>
            <button onClick={() => excluirServico(s.id)} className="p-4 text-zinc-600 hover:text-red-500 transition-colors"><Trash2 size={24} /></button>
          </div>
        ))}
      </div>
    </div>
  )
}
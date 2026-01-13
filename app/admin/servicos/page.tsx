"use client"
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function ServicosAdmin() {
  const [servicos, setServicos] = useState<any[]>([])
  const [nome, setNome] = useState('')
  const [preco, setPreco] = useState('')
  
  // ID extraído da sua tabela 'studios'
  const STUDIO_ID = '6ce31667-7ee3-4a77-b155-b92d7ce69994'

  async function carregarServicos() {
    const { data } = await supabase
      .from('services')
      .select('*')
      .eq('studio_id', STUDIO_ID)
    setServicos(data || [])
  }

  useEffect(() => { carregarServicos() }, [])

  async function handleAddService(e: React.FormEvent) {
    e.preventDefault()
    // Lógica de inserção conforme seu snippet anterior
    const { error } = await supabase.from('services').insert([
      { name: nome, price: parseFloat(preco), studio_id: STUDIO_ID }
    ])

    if (!error) {
      setNome(''); setPreco('');
      carregarServicos()
      alert("Serviço adicionado!")
    }
  }

  async function handleDelete(id: string) {
    if (confirm("Excluir este serviço?")) {
      await supabase.from('services').delete().eq('id', id)
      carregarServicos()
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Configurar Meus Serviços</h1>
      
      <form onSubmit={handleAddService} className="flex gap-4 mb-10 bg-white p-6 rounded-xl shadow-sm border">
        <input 
          placeholder="Nome (Ex: Flash Tattoo)" 
          className="border p-2 rounded flex-1"
          value={nome} onChange={(e) => setNome(e.target.value)} required
        />
        <input 
          placeholder="Preço" type="number" step="0.01"
          className="border p-2 rounded w-32"
          value={preco} onChange={(e) => setPreco(e.target.value)} required
        />
        <button className="bg-black text-white px-6 py-2 rounded-lg font-bold">Adicionar</button>
      </form>

      <div className="grid gap-4">
        {servicos.map(s => (
          <div key={s.id} className="p-4 bg-white border rounded-xl flex justify-between items-center shadow-sm">
            <div>
              <p className="font-bold text-lg">{s.name}</p>
              <p className="text-gray-500 font-medium text-orange-600">R$ {Number(s.price).toFixed(2)}</p>
            </div>
            <button onClick={() => handleDelete(s.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg">
              🗑️ Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
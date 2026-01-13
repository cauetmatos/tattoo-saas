"use client"
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function ServicosAdmin() {
  const [servicos, setServicos] = useState<any[]>([])
  const [nome, setNome] = useState('')
  const [preco, setPreco] = useState('')
  const [editandoId, setEditandoId] = useState<string | null>(null) // 
  
  const STUDIO_ID = '6ce31667-7ee3-4a77-b155-b92d7ce69994' //  ID fix

  async function carregarServicos() {
    const { data } = await supabase
      .from('services')
      .select('*')
      .eq('studio_id', STUDIO_ID)
    setServicos(data || [])
  }

  useEffect(() => { carregarServicos() }, [])

  
  function prepararEdicao(servico: any) {
    setEditandoId(servico.id)
    setNome(servico.name)
    setPreco(servico.price.toString())
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    
    if (editandoId) {

      const { error } = await supabase
        .from('services')
        .update({ name: nome, price: parseFloat(preco) })
        .eq('id', editandoId)

      if (!error) {
        setEditandoId(null)
        alert("Serviço atualizado!")
      }
    } else {
      
      const { error } = await supabase.from('services').insert([
        { name: nome, price: parseFloat(preco), studio_id: STUDIO_ID }
      ])
      if (!error) alert("Serviço adicionado!")
    }

    setNome(''); setPreco('');
    carregarServicos()
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
      
      <form onSubmit={handleSave} className="flex gap-4 mb-10 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <input 
          placeholder="Nome" className="border p-2 rounded flex-1"
          value={nome} onChange={(e) => setNome(e.target.value)} required
        />
        <input 
          placeholder="Preço" type="number" step="0.01"
          className="border p-2 rounded w-32"
          value={preco} onChange={(e) => setPreco(e.target.value)} required
        />
        <button className={`px-6 py-2 rounded-lg font-bold text-white ${editandoId ? 'bg-orange-600' : 'bg-black'}`}>
          {editandoId ? 'Salvar Alterações' : 'Adicionar'}
        </button>
        {editandoId && (
          <button type="button" onClick={() => {setEditandoId(null); setNome(''); setPreco('');}} className="text-gray-500 underline">
            Cancelar
          </button>
        )}
      </form>

      <div className="grid gap-4">
        {servicos.map(s => (
          <div key={s.id} className="p-4 bg-white border rounded-xl flex justify-between items-center shadow-sm">
            <div>
              <p className="font-bold text-lg">{s.name}</p>
              <p className="text-gray-500 font-medium">R$ {s.price.toFixed(2)}</p>
            </div>
            <div className="flex gap-4">
              <button onClick={() => prepararEdicao(s)} className="text-blue-600 font-medium">✏️ Editar</button>
              <button onClick={() => handleDelete(s.id)} className="text-red-500 font-medium">🗑️ Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
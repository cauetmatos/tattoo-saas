"use client"
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function ServicosAdmin() {
  const [servicos, setServicos] = useState<any[]>([])
  const [nome, setNome] = useState('')
  const [preco, setPreco] = useState('')
  
  
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
    const { error } = await supabase.from('services').insert([
      { name: nome, price: parseFloat(preco), studio_id: STUDIO_ID }
    ])

    if (!error) {
      setNome(''); setPreco('');
      carregarServicos()
      alert("Serviço adicionado!")
    }
  }

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Configurar Meus Serviços</h1>
      
      
      <form onSubmit={handleAddService} className="flex gap-4 mb-10">
        <input 
          placeholder="Nome (Ex: Tattoo Pequena)" 
          className="border p-2 rounded flex-1"
          value={nome} onChange={(e) => setNome(e.target.value)}
        />
        <input 
          placeholder="Preço" type="number"
          className="border p-2 rounded w-32"
          value={preco} onChange={(e) => setPreco(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded font-bold">Adicionar</button>
      </form>

      {}
      <div className="space-y-2">
        <h2 className="font-semibold text-lg">Serviços Cadastrados:</h2>
        {servicos.map(s => (
          <div key={s.id} className="p-4 border rounded flex justify-between bg-white shadow-sm">
            <span>{s.name}</span>
            <span className="font-bold">R$ {s.price}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
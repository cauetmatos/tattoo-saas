"use client"

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

// Garante que a página sempre busque dados novos
export const dynamic = 'force-dynamic'

export default function AdminAgendamentos() {
  const [agendamentos, setAgendamentos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // 1. Busca os agendamentos com o nome do serviço
  useEffect(() => {
    async function buscarAgendamentos() {
      try {
        const { data, error } = await supabase
          .from('appointments')
          .select(`
            id,
            customer_name,
            customer_phone,
            appointment_date,
            services ( name )
          `)
          .order('appointment_date', { ascending: true })

        if (error) throw error
        setAgendamentos(data || [])
      } catch (error) {
        console.error('Erro ao carregar agendamentos:', error)
      } finally {
        setLoading(false)
      }
    }

    buscarAgendamentos()
  }, [])

  // 2. Função para cancelar/excluir agendamento
  async function cancelarAgendamento(id: string) {
    if (!confirm("Tem certeza que deseja cancelar este agendamento?")) return

    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', id)

    if (error) {
      alert("Erro ao cancelar: " + error.message)
    } else {
      // Remove da tela instantaneamente
      setAgendamentos(agendamentos.filter(item => item.id !== id))
      alert("Agendamento cancelado com sucesso!")
    }
  }

  if (loading) return <div className="p-10 text-white">Carregando agendamentos...</div>

  return (
    <div className="p-6 md:p-10 bg-zinc-950 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">Próximos Agendamentos</h1>
      
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead className="bg-zinc-800/50 border-b border-zinc-800">
            <tr>
              <th className="p-4 text-zinc-400 text-xs uppercase font-black">Data/Hora</th>
              <th className="p-4 text-zinc-400 text-xs uppercase font-black">Cliente</th>
              <th className="p-4 text-zinc-400 text-xs uppercase font-black">Serviço</th>
              <th className="p-4 text-zinc-400 text-xs uppercase font-black">WhatsApp</th>
              <th className="p-4 text-zinc-400 text-xs uppercase font-black">Ações</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-zinc-800">
            {agendamentos.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-10 text-center text-zinc-500">Nenhum agendamento encontrado.</td>
              </tr>
            ) : (
              agendamentos.map((item) => (
                <tr key={item.id} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="p-4 text-sm">
                    {new Date(item.appointment_date).toLocaleString('pt-BR')}
                  </td>
                  <td className="p-4 font-medium">{item.customer_name}</td>
                  <td className="p-4 text-zinc-400">
                    {item.services?.name || 'Serviço padrão'}
                  </td>
                  <td className="p-4">
                    <a 
                      href={`https://wa.me/${item.customer_phone}`} 
                      target="_blank" 
                      className="text-orange-500 hover:text-orange-400 transition-colors"
                    >
                      {item.customer_phone}
                    </a>
                  </td>
                  <td className="p-4">
                    <button 
                      onClick={() => cancelarAgendamento(item.id)}
                      className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-3 py-1 rounded-lg text-xs font-bold transition-all border border-red-500/20"
                    >
                      EXCLUIR
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
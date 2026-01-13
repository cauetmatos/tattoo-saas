"use client"

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export default function AdminAgendamentos() {
  const [agendamentos, setAgendamentos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // 1. Função de máscara para o telefone
  const formatarTelefone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) return `(${match[1]}) ${match[2]}-${match[3]}`;
    return phone;
  };

  useEffect(() => {
    async function buscarAgendamentos() {
      try {
        const { data, error } = await supabase
          .from('appointments')
          .select('id, customer_name, customer_phone, appointment_date, services ( name )')
          .order('appointment_date', { ascending: true })

        if (error) throw error
        setAgendamentos(data || [])
      } catch (error) {
        console.error('Erro:', error)
      } finally {
        setLoading(false)
      }
    }
    buscarAgendamentos()
  }, [])

  async function cancelarAgendamento(id: string) {
    if (!confirm("Tem certeza que deseja cancelar?")) return
    const { error } = await supabase.from('appointments').delete().eq('id', id)
    if (!error) {
      setAgendamentos(agendamentos.filter(item => item.id !== id))
    }
  }

  if (loading) return <div className="p-10 text-white">Carregando...</div>

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
              <th className="p-4 text-zinc-400 text-xs uppercase font-black text-center">WhatsApp</th>
              <th className="p-4 text-zinc-400 text-xs uppercase font-black text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {agendamentos.map((item) => (
              <tr key={item.id} className="border-b border-zinc-800 hover:bg-zinc-800/30 transition-colors">
                <td className="p-4 text-sm">{new Date(item.appointment_date).toLocaleString('pt-BR')}</td>
                <td className="p-4 font-medium">{item.customer_name}</td>
                <td className="p-4 text-zinc-400">{item.services?.name}</td>
                
                {/* Coluna do WhatsApp com Automação e Máscara */}
                <td className="p-4 text-center">
                  <button 
                    onClick={() => {
                      const msg = encodeURIComponent(`Olá ${item.customer_name}! Confirmamos seu horário de ${item.services?.name} no dia ${new Date(item.appointment_date).toLocaleString('pt-BR')}. Podemos confirmar?`);
                      window.open(`https://wa.me/55${item.customer_phone}?text=${msg}`, '_blank');
                    }}
                    className="bg-green-600/10 hover:bg-green-600 text-green-500 hover:text-white px-3 py-1 rounded-lg text-xs font-black transition-all border border-green-500/20"
                  >
                    {formatarTelefone(item.customer_phone)}
                  </button>
                </td>

                <td className="p-4 text-center">
                  <button
                    onClick={() => cancelarAgendamento(item.id)}
                    className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-3 py-1 rounded-lg text-xs font-bold transition-all border border-red-500/20"
                  >
                    EXCLUIR
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
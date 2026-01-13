"use client"
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export default function AdminAgendamentos() {
  const [agendamentos, setAgendamentos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

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
          `) // Esse 'services ( name )' é o Join que busca o nome do serviço pelo ID
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

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Próximos Agendamentos</h1>
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-bold text-gray-600">Data/Hora</th>
              <th className="p-4 font-bold text-gray-600">Cliente</th>
              <th className="p-4 font-bold text-gray-600">Serviço</th>
              <th className="p-4 font-bold text-gray-600">WhatsApp</th>
            </tr>
          </thead>
          <tbody>
           {agendamentos.map((agendamento) => (
    <tr key={agendamento.id} className="border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors">
      <td className="p-4 text-sm">
        {/* Converte a data do banco para o formato brasileiro */}
        {new Date(agendamento.appointment_date).toLocaleString('pt-BR')}
      </td>
      <td className="p-4 font-medium">{agendamento.customer_name}</td>
      <td className="p-4 text-zinc-400">
        {/* Acessa o nome do serviço vindo do Join */}
        {agendamento.services?.name || 'Serviço não encontrado'}
      </td>
      <td className="p-4">
        <a 
          href={`https://wa.me/${agendamento.customer_phone}`} 
          target="_blank" 
          className="text-orange-500 hover:underline"
        >
          {agendamento.customer_phone}
        </a>
      </td>
    </tr>
  ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
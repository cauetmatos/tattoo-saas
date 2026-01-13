"use client"
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function DashboardAgendamentos() {
  const [agendamentos, setAgendamentos] = useState<any[]>([])

  // Use o ID do seu estúdio que já temos no banco
  const STUDIO_ID = '6ce31667-7ee3-4a77-b155-b92d7ce69994'

  useEffect(() => {
    async function buscarAgendamentos() {
      const { data } = await supabase
        .from('appointments')
        .select(`
          id,
          customer_name,
          customer_phone,
          appointment_date,
          services (name)
        `)
        .eq('studio_id', STUDIO_ID)
        .order('appointment_date', { ascending: true })

      setAgendamentos(data || [])
    }
    buscarAgendamentos()
  }, [])

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Próximos Agendamentos</h1>
      
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4">Cliente</th>
              <th className="p-4">Serviço</th>
              <th className="p-4">Data/Hora</th>
              <th className="p-4">WhatsApp</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {agendamentos.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="p-4 font-medium">{item.customer_name}</td>
                <td className="p-4">{item.services?.name}</td>
                <td className="p-4">{new Date(item.appointment_date).toLocaleString('pt-BR')}</td>
                <td className="p-4">
                  <a 
                    href={`https://wa.me/${item.customer_phone}`} 
                    target="_blank" 
                    className="text-green-600 font-bold"
                  >
                    Conversar
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {agendamentos.length === 0 && (
          <p className="p-10 text-center text-gray-500">Nenhum agendamento encontrado.</p>
        )}
      </div>
    </div>
  )
}
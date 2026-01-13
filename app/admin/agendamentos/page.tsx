"use client"
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AgendamentosAdmin() {
  const [agendamentos, setAgendamentos] = useState<any[]>([])
  const STUDIO_ID = '6ce31667-7ee3-4a77-b155-b92d7ce69994'

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('appointments')
        .select('*, services(name)') 
        .eq('studio_id', STUDIO_ID)
        .order('date', { ascending: true })
      setAgendamentos(data || [])
    }
    load()
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
            {agendamentos.map(ag => (
              <tr key={ag.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{new Date(ag.date).toLocaleString('pt-BR')}</td>
                <td className="p-4 font-medium">{ag.client_name}</td>
                <td className="p-4">{ag.services?.name}</td>
                <td className="p-4 text-blue-600 underline">
                  <a href={`https://wa.me/${ag.client_phone}`} target="_blank">Conversar</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
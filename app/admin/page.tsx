"use client"
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { TrendingUp, Users, DollarSign, CalendarCheck } from 'lucide-react'

export default function DashboardAdmin() {
  const [stats, setStats] = useState({ faturamento: 0, totalAgendamentos: 0 })

  useEffect(() => {
    async function carregarFinancas() {
      // Busca agendamentos trazendo o preço do serviço vinculado
      const { data } = await supabase.from('appointments').select('services(price)')
      if (data) {
        const total = data.reduce((acc, curr: any) => acc + (curr.services?.price || 0), 0)
        setStats({ faturamento: total, totalAgendamentos: data.length })
      }
    }
    carregarFinancas()
  }, [])

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-4xl font-black text-white">Dashboard</h1>
        <p className="text-zinc-500 font-medium">Visão geral financeira do estúdio.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <DollarSign size={100} className="text-orange-500" />
          </div>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">Faturamento Total</p>
          <h2 className="text-5xl font-black text-orange-500">R$ {stats.faturamento.toLocaleString('pt-BR')}</h2>
          <div className="mt-4 flex items-center gap-2 text-green-500 text-xs font-bold">
            <TrendingUp size={14} /> Dados sincronizados com o banco
          </div>
        </div>

        <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 shadow-xl">
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">Total de Agendamentos</p>
          <h2 className="text-5xl font-black text-white">{stats.totalAgendamentos}</h2>
          <div className="mt-4 flex items-center gap-2 text-zinc-500 text-xs">
            <CalendarCheck size={14} /> Histórico completo de sessões
          </div>
        </div>
      </div>
    </div>
  )
}
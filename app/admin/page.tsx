"use client"
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { TrendingUp, Users, DollarSign } from 'lucide-react'

export default function DashboardAdmin() {
  const [stats, setStats] = useState({ faturamento: 0, totalAgendamentos: 0 })

  useEffect(() => {
    async function carregarFinancas() {
      // Busca agendamentos e traz o preço do serviço vinculado
      const { data } = await supabase
        .from('appointments')
        .select('services(price)')

      if (data) {
        // Soma todos os preços dos serviços agendados
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
        <p className="text-zinc-500">Resumo financeiro do seu estúdio.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card de Faturamento */}
        <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 shadow-lg">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-orange-500/10 rounded-2xl text-orange-500"><DollarSign /></div>
            <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">Ganhos Totais</p>
          </div>
          <h2 className="text-5xl font-black text-white">R$ {stats.faturamento.toLocaleString('pt-BR')}</h2>
        </div>

        {/* Card de Agendamentos */}
        <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 shadow-lg">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500"><Users /></div>
            <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">Total de Clientes</p>
          </div>
          <h2 className="text-5xl font-black text-white">{stats.totalAgendamentos}</h2>
        </div>
      </div>
    </div>
  )
}
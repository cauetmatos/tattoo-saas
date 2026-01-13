"use client" // Necessário para hooks e eventos de clique

import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, Calendar, Scissors, LogOut } from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  // Função para deslogar e redirecionar
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      console.error('Erro ao sair:', error.message)
    } else {
      // Redireciona para a página principal (home)
      router.push('/') 
    }
  }

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white font-sans">
      <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col fixed h-full z-10">
        <div className="p-8">
          <h2 className="text-orange-500 font-black text-2xl tracking-tighter uppercase">Admin Tattoo</h2>
          <p className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase mt-1">Painel de Controle</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          {/* ... seus links de navegação (Dashboard, Agendamentos, etc) */}
        </nav>

        {/* Botão Sair do Sistema atualizado */}
        <div className="p-6 border-t border-zinc-800">
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-3 p-3 text-red-500 hover:bg-red-500/10 w-full rounded-xl transition-all font-bold text-sm"
          >
            <LogOut size={18} /> Sair do Sistema
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-10">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
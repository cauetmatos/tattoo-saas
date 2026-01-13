// app/admin/layout.tsx
import Link from 'next/link'
import { LayoutDashboard, Calendar, Scissors, LogOut } from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-zinc-950 text-white font-sans">
      {/* Sidebar Fixa e Proporcional */}
      <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col fixed h-full z-10">
        <div className="p-8">
          <h2 className="text-orange-500 font-black text-2xl tracking-tighter uppercase">Admin Tattoo</h2>
          <p className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase mt-1">Painel de Controle</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-800 transition-all text-zinc-400 hover:text-white group">
            <LayoutDashboard size={20} className="group-hover:text-orange-500" /> Dashboard
          </Link>
          <Link href="/admin/agendamentos" className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-800 transition-all text-zinc-400 hover:text-white group">
            <Calendar size={20} className="group-hover:text-orange-500" /> Agendamentos
          </Link>
          <Link href="/admin/servicos" className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-800 transition-all text-zinc-400 hover:text-white group">
            <Scissors size={20} className="group-hover:text-orange-500" /> Meus Serviços
          </Link>
        </nav>

        <div className="p-6 border-t border-zinc-800">
          <button className="flex items-center gap-3 p-3 text-red-500 hover:bg-red-500/10 w-full rounded-xl transition-all font-bold text-sm">
            <LogOut size={18} /> Sair do Sistema
          </button>
        </div>
      </aside>

      {/* Conteúdo Principal com Margem para a Sidebar */}
      <main className="flex-1 ml-64 p-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-zinc-950">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
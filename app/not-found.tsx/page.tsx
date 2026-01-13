"use client"

import Link from 'next/link'
import { Home, ArrowLeft, Ghost } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 text-center font-sans">
      {/* Ícone Temático */}
      <div className="mb-6 p-6 bg-orange-500/10 rounded-full text-orange-500 animate-pulse">
        <Ghost size={80} />
      </div>

      <h1 className="text-8xl font-black text-white tracking-tighter mb-2">404</h1>
      
      <h2 className="text-2xl font-bold text-zinc-200 mb-4 uppercase tracking-widest">
        Página não encontrada
      </h2>
      
      <p className="text-zinc-500 max-w-md mb-10 font-medium">
        Parece que você tentou acessar um rastro que não existe. 
        O conteúdo pode ter sido removido ou o endereço foi digitado incorretamente.
      </p>

      {/* Botões de Navegação */}
      <div className="flex flex-col md:flex-row gap-4">
        <Link 
          href="/admin" 
          className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-black px-8 py-4 rounded-2xl transition-all shadow-lg shadow-orange-900/20"
        >
          <Home size={20} /> VOLTAR AO PAINEL
        </Link>
        
        <button 
          onClick={() => window.history.back()}
          className="flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white font-bold px-8 py-4 rounded-2xl border border-zinc-800 transition-all"
        >
          <ArrowLeft size={20} /> VOLTAR ANTERIOR
        </button>
      </div>

      <footer className="mt-20">
        <p className="text-zinc-700 text-xs font-bold uppercase tracking-widest">
          &copy; 2026 Admin Tattoo - Sistema de Gestão
        </p>
      </footer>
    </div>
  )
}
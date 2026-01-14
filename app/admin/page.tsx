"use client"

import Link from 'next/link'
import { Zap, Shield, Star, ArrowRight } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-1">
          <span className="text-2xl font-black tracking-tighter uppercase">Tattoo</span>
          <span className="text-2xl font-black tracking-tighter uppercase text-orange-600">Saas</span>
        </div>
        <Link 
          href="/login" 
          className="bg-black text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-zinc-800 transition-all"
        >
          Acessar Painel
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto text-center pt-20 pb-32 px-6">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
          Sua agenda no <br />
          <span className="text-orange-600 underline decoration-orange-600 underline-offset-8">automático.</span>
        </h1>
        
        <p className="text-zinc-500 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-12">
          O sistema de agendamento feito para tatuadores. Link na bio, gestão de flash e aviso no WhatsApp.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Link 
            href="/agendar/cadu-tattoo" 
            className="w-full md:w-auto bg-orange-600 hover:bg-orange-500 text-white font-black px-10 py-5 rounded-2xl transition-all shadow-xl shadow-orange-200 text-lg"
          >
            Ver Demo do Cadu
          </Link>
          <Link 
            href="/login" 
            className="w-full md:w-auto bg-white border-2 border-zinc-900 text-black font-black px-10 py-5 rounded-2xl hover:bg-zinc-50 transition-all text-lg"
          >
            Começar Grátis
          </Link>
        </div>
      </main>

      {/* Features Section (A parte preta inferior) */}
      <section className="bg-black text-white py-24 rounded-t-[60px]">
        <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="text-center space-y-4">
            <div className="flex justify-center text-orange-500"><Zap size={40} fill="currentColor" /></div>
            <h3 className="text-xl font-black uppercase italic tracking-tighter">Agilidade</h3>
            <p className="text-zinc-500 text-sm font-medium">O cliente agenda em menos de 30 segundos.</p>
          </div>

          <div className="text-center space-y-4">
            <div className="flex justify-center text-orange-500"><Star size={40} fill="currentColor" /></div>
            <h3 className="text-xl font-black uppercase italic tracking-tighter">Profissionalismo</h3>
            <p className="text-zinc-500 text-sm font-medium">Mostre seus preços de forma clara.</p>
          </div>

          <div className="text-center space-y-4">
            <div className="flex justify-center text-orange-500"><Shield size={40} fill="currentColor" /></div>
            <h3 className="text-xl font-black uppercase italic tracking-tighter">Segurança</h3>
            <p className="text-zinc-500 text-sm font-medium">Painel exclusivo com login seguro.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
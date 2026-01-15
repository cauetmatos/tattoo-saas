"use client"

import { useState } from 'react'
import { Clock, CheckCircle2, User, Smartphone, LayoutGrid, Paintbrush, Syringe } from 'lucide-react'

// Dados completos com Categorias
const allServices = [
  { id: 1, category: 'Piercing', name: 'Aplicação de Piercing (+ Joia)', price: 120, duration: '30 min', description: 'Inclui joia básica de titânio e assepsia completa.' },
  { id: 2, category: 'Tattoo', name: 'Cover-up (Cobertura)', price: 500, duration: '180 min', description: 'Avaliação técnica para cobrir tatuagens antigas.' },
  { id: 3, category: 'Tattoo', name: 'Criação de Arte Personalizada', price: 150, duration: '60 min', description: 'Reunião para desenvolvimento de desenho exclusivo.' },
  { id: 4, category: 'Tattoo', name: 'Diária (Full Day)', price: 1800, duration: '480 min', description: 'Sessão exclusiva para grandes projetos.' },
  { id: 5, category: 'Tattoo', name: 'Fechamento Completo', price: 3000, duration: '600 min', description: 'Projeto de fechamento de braço ou perna.' },
  { id: 6, category: 'Outros', name: 'Avaliação Presencial', price: 0, duration: '20 min', description: 'Conversa para tirar dúvidas e orçamentos.' },
]

export default function AgendamentoPage() {
  const [selectedService, setSelectedService] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState('Todos')

  // Lógica de filtragem
  const filteredServices = activeCategory === 'Todos' 
    ? allServices 
    : allServices.filter(s => s.category === activeCategory)

  const categories = ['Todos', 'Tattoo', 'Piercing', 'Outros']

  return (
    <div className="min-h-screen bg-black text-zinc-100 p-6">
      <header className="max-w-2xl mx-auto text-center mb-8">
        <h1 className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-2">Agendamento Online</h1>
        <h2 className="text-3xl font-extrabold tracking-tight">Escolha o seu serviço</h2>
      </header>

      <main className="max-w-2xl mx-auto space-y-6">
        
        {/* BARRA DE CATEGORIAS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full border text-sm font-medium transition-all whitespace-nowrap
                ${activeCategory === cat 
                  ? 'bg-orange-500 border-orange-500 text-white' 
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-600'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* IDENTIFICAÇÃO */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800/50">
          <div className="relative">
            <User className="absolute left-3 top-3 text-zinc-500 size-4" />
            <input type="text" placeholder="Nome completo" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-2.5 pl-9 pr-4 text-sm focus:border-orange-500 outline-none" />
          </div>
          <div className="relative">
            <Smartphone className="absolute left-3 top-3 text-zinc-500 size-4" />
            <input type="text" placeholder="WhatsApp" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-2.5 pl-9 pr-4 text-sm focus:border-orange-500 outline-none" />
          </div>
        </section>

        {/* LISTA DINÂMICA */}
        <section className="space-y-3">
          {filteredServices.map((service) => (
            <div 
              key={service.id}
              onClick={() => setSelectedService(service.id)}
              className={`relative cursor-pointer p-4 rounded-xl border transition-all duration-200
                ${selectedService === service.id 
                  ? 'border-orange-500 bg-orange-500/5 shadow-lg shadow-orange-500/10' 
                  : 'border-zinc-800 bg-zinc-900 hover:border-zinc-700'}`}
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 font-bold">
                      {service.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-base">{service.name}</h3>
                  <p className="text-zinc-500 text-xs mt-1 line-clamp-2">{service.description}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="block text-orange-500 font-bold text-base">
                    {service.price === 0 ? 'Grátis' : `R$ ${service.price}`}
                  </span>
                  <div className="flex items-center text-zinc-500 text-[10px] mt-1 justify-end">
                    <Clock className="size-3 mr-1" />
                    {service.duration}
                  </div>
                </div>
              </div>

              {selectedService === service.id && (
                <CheckCircle2 className="absolute -top-2 -right-2 text-orange-500 bg-black rounded-full size-5" />
              )}
            </div>
          ))}

          {filteredServices.length === 0 && (
            <div className="text-center py-10 text-zinc-500 italic">
              Nenhum serviço encontrado nesta categoria.
            </div>
          )}
        </section>

        {/* BOTÃO FIXO/RODAPÉ */}
        <div className="pt-4">
          <button 
            disabled={!selectedService}
            className={`w-full py-4 rounded-xl font-bold text-base transition-all
              ${selectedService 
                ? 'bg-orange-500 text-white hover:bg-orange-600' 
                : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'}`}
          >
            {selectedService ? 'Ver horários disponíveis' : 'Selecione um serviço'}
          </button>
        </div>
      </main>
    </div>
  )
}
"use client"

import { useState } from 'react'
import { Clock, CheckCircle2, User, Smartphone } from 'lucide-react'

// Exemplo de dados - futuramente virão do seu Supabase
const services = [
  { id: 1, name: 'Aplicação de Piercing (+ Joia)', price: 120, duration: '30 min', description: 'Inclui joia básica de titânio e assepsia completa.' },
  { id: 2, name: 'Cover-up (Cobertura)', price: 500, duration: '180 min', description: 'Avaliação técnica para cobrir tatuagens antigas. Valor inicial.' },
  { id: 3, name: 'Criação de Arte Personalizada', price: 150, duration: '60 min', description: 'Reunião para desenvolvimento de desenho exclusivo.' },
  { id: 4, name: 'Diária (Full Day)', price: 1800, duration: '480 min', description: 'Sessão exclusiva para grandes projetos (costas, fechamentos).' },
]

export default function AgendamentoPage() {
  const [selectedService, setSelectedService] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-black text-zinc-100 p-6">
      {/* Header */}
      <header className="max-w-2xl mx-auto text-center mb-10">
        <h1 className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-2">Agendamento Online</h1>
        <h2 className="text-3xl font-extrabold tracking-tight">Escolha o seu serviço</h2>
        <p className="text-zinc-400 mt-2 text-sm">Selecione o procedimento desejado para ver os horários disponíveis.</p>
      </header>

      <main className="max-w-2xl mx-auto space-y-8">
        
        {/* Identificação */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <User className="absolute left-3 top-3.5 text-zinc-500 size-5" />
            <input 
              type="text" 
              placeholder="Seu nome completo" 
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-orange-500 transition-all"
            />
          </div>
          <div className="relative">
            <Smartphone className="absolute left-3 top-3.5 text-zinc-500 size-5" />
            <input 
              type="text" 
              placeholder="Seu WhatsApp" 
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-orange-500 transition-all"
            />
          </div>
        </section>

        {/* Lista de Serviços */}
        <section className="space-y-3">
          {services.map((service) => (
            <div 
              key={service.id}
              onClick={() => setSelectedService(service.id)}
              className={`
                relative cursor-pointer p-5 rounded-xl border-2 transition-all duration-200
                ${selectedService === service.id 
                  ? 'border-orange-500 bg-orange-500/5 shadow-[0_0_20px_rgba(249,115,22,0.1)]' 
                  : 'border-zinc-800 bg-zinc-900 hover:border-zinc-700'}
              `}
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-bold text-lg">{service.name}</h3>
                  <p className="text-zinc-400 text-sm max-w-[80%]">{service.description}</p>
                </div>
                <div className="text-right">
                  <span className="block text-orange-500 font-bold text-lg">R$ {service.price}</span>
                  <div className="flex items-center text-zinc-500 text-xs mt-1 justify-end">
                    <Clock className="size-3 mr-1" />
                    {service.duration}
                  </div>
                </div>
              </div>

              {selectedService === service.id && (
                <CheckCircle2 className="absolute -top-2 -right-2 text-orange-500 bg-black rounded-full size-6" />
              )}
            </div>
          ))}
        </section>

        {/* Botão de Próximo Passo */}
        <button 
          disabled={!selectedService}
          className={`
            w-full py-4 rounded-xl font-bold text-lg transition-all
            ${selectedService 
              ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/20' 
              : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'}
          `}
        >
          {selectedService ? 'Ver horários disponíveis' : 'Selecione um serviço'}
        </button>

      </main>
    </div>
  )
}
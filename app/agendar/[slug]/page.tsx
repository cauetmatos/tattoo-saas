"use client"

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { Clock, CheckCircle2 } from 'lucide-react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface Service {
  id: string
  name: string
  price: number
  duration_minutes: number
  category: string | null
}

export default function AgendamentoPage() {
  const router = useRouter()
  const params = useParams()
  const [services, setServices] = useState<Service[]>([])
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchServices() {
      setLoading(true)
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('name', { ascending: true })

      if (!error) setServices(data || [])
      setLoading(false)
    }
    fetchServices()
  }, [])

  const handleNextStep = () => {
    if (selectedService) {
      router.push(`/agendar/${params.slug}/horarios?serviceId=${selectedService}`)
    }
  }

  const categories = ['Todos', ...Array.from(new Set(services.map(s => s.category || 'Geral')))]
  const filteredServices = activeCategory === 'Todos' 
    ? services 
    : services.filter(s => (s.category || 'Geral') === activeCategory)

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-orange-500">Carregando serviços...</div>

  return (
    <div className="min-h-screen bg-black text-zinc-100 p-6">
      <header className="max-w-2xl mx-auto text-center mb-8">
        <h1 className="text-orange-500 font-bold text-xs uppercase tracking-widest mb-2">Agendamento Online</h1>
        <h2 className="text-3xl font-extrabold">Escolha o seu serviço</h2>
      </header>

      <main className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full border text-sm font-medium transition-all ${activeCategory === cat ? 'bg-orange-500 border-orange-500 text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-400'}`}>
              {cat}
            </button>
          ))}
        </div>

        <section className="space-y-3">
          {filteredServices.map((service) => (
            <div key={service.id} onClick={() => setSelectedService(service.id)}
              className={`relative cursor-pointer p-4 rounded-xl border transition-all ${selectedService === service.id ? 'border-orange-500 bg-orange-500/5' : 'border-zinc-800 bg-zinc-900'}`}>
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 font-bold mb-1 inline-block">{service.category || 'Geral'}</span>
                  <h3 className="font-bold text-base">{service.name}</h3>
                </div>
                <div className="text-right">
                  <span className="block text-orange-500 font-bold text-base">R$ {service.price}</span>
                  <div className="flex items-center text-zinc-500 text-[10px] mt-1 justify-end"><Clock className="size-3 mr-1" />{service.duration_minutes} min</div>
                </div>
              </div>
              {selectedService === service.id && <CheckCircle2 className="absolute -top-2 -right-2 text-orange-500 bg-black rounded-full size-5" />}
            </div>
          ))}
        </section>

        <button disabled={!selectedService} onClick={handleNextStep}
          className={`w-full py-4 rounded-xl font-bold text-base transition-all ${selectedService ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'bg-zinc-800 text-zinc-600'}`}>
          {selectedService ? 'Ver horários disponíveis' : 'Selecione um serviço'}
        </button>
      </main>
    </div>
  )
}
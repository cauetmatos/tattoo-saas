"use client"

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter, useParams } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { ChevronLeft, Calendar as CalendarIcon, Clock, User, Phone } from 'lucide-react'
import { format, addDays, startOfDay, isSameDay } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Definição dos horários fixos do estúdio
const WORKING_HOURS = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]

export default function HorariosPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = useParams()
  
  const serviceId = searchParams.get('serviceId')
  const studioSlug = params.slug

  const [selectedDate, setSelectedDate] = useState<Date>(startOfDay(new Date()))
  const [bookedSlots, setBookedSlots] = useState<string[]>([])
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  
  const [clientName, setClientName] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Busca horários já agendados para evitar duplicidade
  useEffect(() => {
    async function fetchBookedSlots() {
      if (!serviceId) return
      setLoading(true)
      
      const startOfSelectedDay = startOfDay(selectedDate).toISOString()
      const endOfSelectedDay = addDays(startOfDay(selectedDate), 1).toISOString()

      const { data } = await supabase
        .from('appointments')
        .select('appointment_date')
        .gte('appointment_date', startOfSelectedDay)
        .lt('appointment_date', endOfSelectedDay)
        .eq('status', 'confirmed')

      if (data) {
        // Mapeia os horários ocupados para o formato HH:mm
        const times = data.map(app => format(new Date(app.appointment_date), "HH:mm"))
        setBookedSlots(times)
      }
      setLoading(false)
    }
    fetchBookedSlots()
  }, [selectedDate, serviceId])

  const handleConfirmAgendamento = async () => {
    if (!selectedTime || !clientName || !clientPhone) return

    setIsSubmitting(true)
    const [hours, minutes] = selectedTime.split(':')
    const finalDate = new Date(selectedDate)
    finalDate.setHours(parseInt(hours), parseInt(minutes), 0, 0)

    const { error } = await supabase
      .from('appointments')
      .insert([
        {
          service_id: serviceId,
          client_name: clientName,
          client_phone: clientPhone,
          appointment_date: finalDate.toISOString(),
          status: 'confirmed'
        }
      ])

    if (error) {
      alert("Erro ao agendar: " + error.message)
    } else {
      // Redireciona para uma página de sucesso (crie este arquivo depois)
      router.push(`/agendar/${studioSlug}/sucesso`)
    }
    setIsSubmitting(false)
  }

  const nextDays = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i))

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-20">
      <header className="max-w-md mx-auto mb-8 flex items-center gap-4">
        <button onClick={() => router.back()} className="p-2 hover:bg-zinc-900 rounded-full">
          <ChevronLeft />
        </button>
        <h1 className="text-xl font-bold text-orange-500">Agendamento</h1>
      </header>

      <main className="max-w-md mx-auto space-y-8">
        <section>
          <div className="flex items-center gap-2 mb-4">
            <CalendarIcon size={18} className="text-orange-500" />
            <span className="font-semibold text-sm">Escolha o dia</span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
            {nextDays.map((date) => (
              <button
                key={date.toISOString()}
                onClick={() => { setSelectedDate(date); setSelectedTime(null); }}
                className={`flex flex-col items-center min-w-[70px] p-4 rounded-2xl border transition-all
                  ${isSameDay(selectedDate, date) 
                    ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20' 
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'}`}
              >
                <span className="text-[10px] uppercase font-bold mb-1">
                  {format(date, 'EEE', { locale: ptBR })}
                </span>
                <span className="text-lg font-bold">{format(date, 'dd')}</span>
              </button>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <Clock size={18} className="text-orange-500" />
            <span className="font-semibold text-sm">Horários disponíveis</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {WORKING_HOURS.map((time) => {
              const isBooked = bookedSlots.includes(time)
              return (
                <button
                  key={time}
                  disabled={isBooked}
                  onClick={() => setSelectedTime(time)}
                  className={`py-3 rounded-xl border font-medium transition-all
                    ${isBooked 
                      ? 'bg-zinc-950 border-zinc-900 text-zinc-700 cursor-not-allowed line-through' 
                      : selectedTime === time 
                        ? 'bg-orange-500 border-orange-500 text-white' 
                        : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'}`}
                >
                  {time}
                </button>
              )
            })}
          </div>
        </section>

        <section className="space-y-4 pt-4 border-t border-zinc-800">
          <div className="flex items-center gap-2 mb-2">
            <User size={18} className="text-orange-500" />
            <span className="font-semibold text-sm">Seus dados</span>
          </div>
          <input 
            type="text" 
            placeholder="Nome Completo"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-4 px-4 focus:border-orange-500 outline-none transition-all text-white"
          />
          <input 
            type="tel" 
            placeholder="WhatsApp"
            value={clientPhone}
            onChange={(e) => setClientPhone(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-4 px-4 focus:border-orange-500 outline-none transition-all text-white"
          />
        </section>

        <button
          disabled={!selectedTime || !clientName || !clientPhone || isSubmitting}
          onClick={handleConfirmAgendamento}
          className={`w-full py-4 rounded-2xl font-bold text-lg transition-all
            ${(!selectedTime || !clientName || !clientPhone || isSubmitting)
              ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
              : 'bg-orange-500 text-white hover:bg-orange-600 shadow-xl shadow-orange-500/30'}`}
        >
          {isSubmitting ? 'Agendando...' : 'Confirmar e Finalizar'}
        </button>
      </main>
    </div>
  )
}
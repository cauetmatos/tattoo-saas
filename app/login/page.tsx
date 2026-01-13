"use client"
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Autenticação usando o Supabase Auth
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert("Erro ao entrar: " + error.message)
    } else {
      // Se der certo, envia para o Dashboard de agendamentos
      router.push('/admin/agendamentos')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-lg max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Login Admin</h1>
        
        <div className="space-y-4">
          <input 
            type="email" placeholder="Seu E-mail" required
            className="w-full border p-3 rounded-lg"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" placeholder="Sua Senha" required
            className="w-full border p-3 rounded-lg"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-800">
            Entrar no Painel
          </button>
        </div>
      </form>
    </div>
  )
}
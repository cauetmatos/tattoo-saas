"use client"
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { Lock, Mail, Loader2 } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert("Erro ao entrar: " + error.message)
    } else {
      router.push('/admin') // Redireciona para o dashboard após o login
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-3xl border border-zinc-800 shadow-2xl">
        <header className="text-center mb-10">
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Admin Tattoo</h1>
          <p className="text-zinc-500 font-medium">Faça login para gerenciar seu estúdio</p>
        </header>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-4 top-4 text-zinc-500" size={20} />
            <input 
              type="email"
              placeholder="E-mail"
              required
              className="w-full bg-zinc-950 border border-zinc-800 p-4 pl-12 rounded-2xl outline-none text-white focus:border-orange-500 transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-4 text-zinc-500" size={20} />
            <input 
              type="password"
              placeholder="Senha"
              required
              className="w-full bg-zinc-950 border border-zinc-800 p-4 pl-12 rounded-2xl outline-none text-white focus:border-orange-500 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-900/20"
          >
            {loading ? <Loader2 className="animate-spin" /> : "ENTRAR NO PAINEL"}
          </button>
        </form>
      </div>
    </div>
  )
}
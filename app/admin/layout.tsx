"use client" // Adicione isto na linha 1

import { useEffect } from 'react' // Novo
import { useRouter } from 'next/navigation' 
import { supabase } from '@/lib/supabase' 
import Link from 'next/link'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter() 

  
  useEffect(() => {
    async function checkUser() {
      const { data: { session } } = await supabase.auth.getSession()
      
      
      if (!session) {
        router.push('/login')
      }
    }
    checkUser()
  }, [router])

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Fixa */}
      <aside className="w-64 bg-black text-white p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-10 text-orange-500">Admin Tattoo</h2>
        
        <nav className="flex flex-col gap-4">
          <Link 
            href="/admin/agendamentos" 
            className="hover:text-orange-400 transition-colors font-medium"
          >
            🗓️ Agendamentos
          </Link>
          <Link 
            href="/admin/servicos" 
            className="hover:text-orange-400 transition-colors font-medium"
          >
            💰 Meus Serviços
          </Link>
        </nav>

        {}
        <button 
          onClick={() => supabase.auth.signOut().then(() => router.push('/login'))}
          className="mt-auto text-left text-red-400 hover:text-red-300 text-sm font-medium"
        >
          🚪 Sair do Sistema
        </button>
      </aside>

      {}
      <main className="flex-1 p-10">
        {children}
      </main>
    </div>
  )
}
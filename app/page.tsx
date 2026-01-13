"use client"
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [studios, setStudios] = useState<any[]>([])

  useEffect(() => {
    async function fetchStudios() {
      // Isso é como um "SELECT * FROM studios" no seu Java/SQL
      const { data, error } = await supabase.from('studios').select('*')
      if (error) {
        console.error('Erro ao buscar:', error)
      } else {
        setStudios(data || [])
      }
    }
    fetchStudios()
  }, [])

  return (
    <main className="p-10 font-sans">
      <h1 className="text-3xl font-bold mb-6">Status da Conexão</h1>
      
      <div className="p-4 border rounded-lg bg-gray-50">
        <h2 className="font-semibold mb-2">Dados da tabela 'studios':</h2>
        {studios.length > 0 ? (
          <pre className="bg-white p-4 rounded border text-sm">
            {JSON.stringify(studios, null, 2)}
          </pre>
        ) : (
          <p className="text-orange-600">
            Conectado, mas a tabela está vazia. 
            Vá ao painel do Supabase e insira uma linha em 'studios' para ver aqui!
          </p>
        )}
      </div>
    </main>
  )
}
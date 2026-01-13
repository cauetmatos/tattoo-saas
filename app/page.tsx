import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <header className="p-6 flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="text-2xl font-black tracking-tighter">TATTOO<span className="text-orange-600">SAAS</span></h1>
        <Link href="/login" className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-all text-sm">
          Acessar Painel
        </Link>
      </header>

      <section className="py-24 px-6 text-center max-w-5xl mx-auto">
        <h2 className="text-6xl md:text-8xl font-black mb-8 leading-none tracking-tight">
          Sua agenda no <br/><span className="text-orange-600 underline">automático.</span>
        </h2>
        <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto font-medium">
          O sistema de agendamento feito para tatuadores. Link na bio, gestão de flash e aviso no WhatsApp.
        </p>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <Link href="/agendar/cadu-tatto" className="bg-orange-600 text-white px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-transform shadow-xl shadow-orange-200">
            Ver Demo do Cadu
          </Link>
          <button className="bg-white border-4 border-black px-12 py-5 rounded-2xl font-black text-xl hover:bg-gray-50 transition-all">
            Começar Grátis
          </button>
        </div>
      </section>

      <section className="bg-black text-white py-24 px-6 rounded-[3rem] mx-4 mb-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="flex flex-col items-center">
            <span className="text-5xl mb-6">⚡</span>
            <h3 className="font-black text-2xl mb-4 text-orange-500 uppercase italic">Agilidade</h3>
            <p className="text-gray-400 text-center font-medium">O cliente agenda em menos de 30 segundos.</p>
          </div>
          <div className="flex flex-col items-center border-y md:border-y-0 md:border-x border-gray-800 py-10 md:py-0">
            <span className="text-5xl mb-6">💰</span>
            <h3 className="font-black text-2xl mb-4 text-orange-500 uppercase italic">Profissionalismo</h3>
            <p className="text-gray-400 text-center font-medium">Mostre seus preços de forma clara.</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-5xl mb-6">🔒</span>
            <h3 className="font-black text-2xl mb-4 text-orange-500 uppercase italic">Segurança</h3>
            <p className="text-gray-400 text-center font-medium">Painel exclusivo com login seguro.</p>
          </div>
        </div>
      </section>

      <footer className="py-12 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">
        Desenvolvido por Cauê Matos • 2026
      </footer>
    </div>
  )
}
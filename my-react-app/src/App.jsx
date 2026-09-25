import { useState } from 'react'

function App() {
  const [selectedType, setSelectedType] = useState('')

  function getMatchup(type) {
  // API CALL WILL GO HERE, AND WE WILL RETURN THE RESPONSE
  return `Fake API response: You are fighting a ${type}-type Pokémon.`;
}

function handleTypeClick(type) {
  const response = getMatchup(type);
  setSelectedType(response);
}

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl items-center justify-center px-5 py-12">
      <section className="w-full rounded-3xl border border-stone-200 bg-white p-7 shadow-sm sm:p-10">
        <div className="mb-8 flex items-center gap-3">
          <span aria-hidden="true" className="relative block h-9 w-9 rounded-full border-[3px] border-slate-800 bg-gradient-to-b from-pokeball from-50% to-white to-50% after:absolute after:left-1/2 after:top-1/2 after:h-3 after:w-3 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:border-[3px] after:border-slate-800 after:bg-white after:content-['']" />
          <span className="text-sm font-extrabold tracking-wide text-leaf">TRAINER TOOLKIT</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Pokémon Battle Assistant</h1>
        <p className="mt-3 text-base leading-7 text-slate-600">What type of Pokémon are you fighting?</p>
        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ['Fire', '🔥', 'border-orange-200 bg-orange-50 text-orange-800'],
            ['Water', '💧', 'border-sky-200 bg-sky-50 text-sky-800'],
            ['Grass', '🌿', 'border-green-200 bg-green-50 text-green-800'],
            ['Ground', '🪨', 'border-amber-200 bg-amber-50 text-amber-900'],
          ].map(([type, icon, styles]) => (
            <button key={type} 
            onClick={() => handleTypeClick(type.name)} 
            className={`rounded-2xl border px-4 py-4 text-sm font-bold transition hover:-translate-y-0.5 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf ${styles}`}>
              <span className="mb-1 block text-xl" aria-hidden="true">{icon}</span>
              {type}
            </button>
          ))}
        </div>
        {selectedType && <p className="mt-6 text-center text-slate-700">You selected: {selectedType}</p>}
      </section>
    </main>
  )
}

export default App

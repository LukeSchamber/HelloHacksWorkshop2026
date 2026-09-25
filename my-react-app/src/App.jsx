import { useState } from 'react'

function formatTypeNames(types) {
  const names = types.map((type) => `${type[0].toUpperCase()}${type.slice(1)}`)

  if (names.length < 2) return names[0] || 'no types'
  if (names.length === 2) return `${names[0]} and ${names[1]}`
  return `${names.slice(0, -1).join(', ')}, and ${names.at(-1)}`
}

function App() {
  const [selectedType, setSelectedType] = useState('')
  const [matchup, setMatchup] = useState(null)
  const [loading, setLoading] = useState(false)

  async function getMatchup(type) {
    try {
      const response = await fetch(
        `http://localhost:5001/api/type/${encodeURIComponent(type.toLowerCase())}`,
      )

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Could not get matchup data:', error)
      return { error: 'Could not load matchup data. Check that the backend is running.' }
    }
  }

  async function handleTypeClick(type) {
    setSelectedType(type)
    setLoading(true)
    setMatchup(null)

    const response = await getMatchup(type)
    setMatchup(response)
    setLoading(false)
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
            onClick={() => handleTypeClick(type)}
            className={`rounded-2xl border px-4 py-4 text-sm font-bold transition hover:-translate-y-0.5 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf ${styles}`}>
              <span className="mb-1 block text-xl" aria-hidden="true">{icon}</span>
              {type}
            </button>
          ))}
        </div>
        {selectedType && (
          <div className="mt-6 text-center text-slate-700">
            <p>You selected: {selectedType}</p>
            {loading && <p className="mt-2 text-sm">Loading matchup...</p>}
            {matchup?.error && <p className="mt-2 text-sm text-pokeball">{matchup.error}</p>}
            {matchup && !matchup.error && (
              <div className="mt-3 space-y-2 text-sm">
                <p>
                  {selectedType}-type moves deal half damage to{' '}
                  Pokémon of the {formatTypeNames(matchup.half_damage_to)} types.
                </p>
                <p>
                  {selectedType}-type Pokémon take double damage from{' '}
                  moves of the {formatTypeNames(matchup.double_damage_from)} types.
                </p>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  )
}

export default App

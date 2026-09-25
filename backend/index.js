const cors = require("cors")
const express = require('express')

const app = express()
const port = process.env.PORT || 5001

app.use(cors())

// Example: http://localhost:5001/api/type/fire or /api/type/10
app.get('/api/type/:idOrName', async (req, res) => {
  const { idOrName } = req.params

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/type/${encodeURIComponent(idOrName)}/`,
    )
    const data = await response.json()

    if (!response.ok) {
      // Keep PokéAPI's status code and error response for unknown types.
      return res.status(response.status).json(data)
    }

    const { half_damage_to, double_damage_from } = data.damage_relations

    res.json({
      half_damage_to: half_damage_to.map(({ name }) => name),
      double_damage_from: double_damage_from.map(({ name }) => name),
    })
  } catch (error) {
    console.error('Failed to fetch Pokémon type:', error)
    res.status(502).json({ error: 'Could not retrieve Pokémon type data.' })
  }
})

app.listen(port, () => {
  console.log(`Backend server listening on http://localhost:${port}`)
})

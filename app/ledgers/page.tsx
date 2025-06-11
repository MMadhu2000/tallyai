import supabase from '@/supabaseClient'
import { useState } from 'react'

async function getLedgers() {
  const { data, error } = await supabase
    .from('ledgers')
    .select('*')

  if (error) {
    console.error("Error fetching ledgers:", error)
    return []
  }

  return data
}

export default async function Ledgers() {
  const [ledgers, setLedgers] = useState(await getLedgers())
  const [editingLedger, setEditingLedger] = useState(null)

  const handleEdit = (ledger) => {
    setEditingLedger(ledger)
  }

  return (
    <div>
      <h1>Ledger Management</h1>
      <ul>
        {ledgers.map((ledger) => (
          <li key={ledger.id}>
            {ledger.name}
            <button onClick={() => handleEdit(ledger)}>Edit</button>
          </li>
        ))}
      </ul>

      {editingLedger && (
        <form>
          <label>Name:</label>
          <input type="text" value={editingLedger.name} />
          <button type="submit">Update</button>
        </form>
      )}
    </div>
  )
}
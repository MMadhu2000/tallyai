"use client";

import { useState, useEffect } from 'react';
import supabase from '../supabaseClient';

interface Ledger {
  id: string;
  name: string;
  type: string;
  group_name: string | null;
}

export default function LedgerManagement() {
  const [ledgers, setLedgers] = useState<Ledger[]>([]);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [group_name, setGroupName] = useState('');

  useEffect(() => {
    fetchLedgers();
  }, []);

  async function fetchLedgers() {
    const { data, error } = await supabase
      .from('ledgers')
      .select('*');

    if (error) {
      console.error('Error fetching ledgers:', error);
    }

    if (data) {
      setLedgers(data as Ledger[]);
    }
  }

  async function createLedger() {
    const { data, error } = await supabase
      .from('ledgers')
      .insert([{
        name: name,
        type: type,
        group_name: group_name
      }]);

    if (error) {
      console.error('Error creating ledger:', error);
    }

    if (data) {
      console.log('Ledger created successfully!');
      fetchLedgers(); // Refresh the ledger list
      setName(''); // Clear the input fields
      setType('');
      setGroupName('');
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Ledger Management</h1>

      {/* Create Ledger Form */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Create New Ledger</h2>
        <input
          type="text"
          placeholder="Ledger Name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Select Type</option>
          <option value="Asset">Asset</option>
          <option value="Liability">Liability</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
        <input
          type="text"
          placeholder="Group Name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          value={group_name}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={createLedger}
        >
          Create Ledger
        </button>
      </div>

      {/* Ledger List */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Ledger List</h2>
        {ledgers.length > 0 ? (
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Group Name</th>
              </tr>
            </thead>
            <tbody>
              {ledgers.map((ledger) => (
                <tr key={ledger.id}>
                  <td className="border px-4 py-2">{ledger.name}</td>
                  <td className="border px-4 py-2">{ledger.type}</td>
                  <td className="border px-4 py-2">{ledger.group_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No ledgers found.</p>
        )}
      </div>
    </div>
  );
}

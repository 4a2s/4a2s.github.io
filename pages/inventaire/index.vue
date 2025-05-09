<template>
    <div class="p-4">
      <h1 class="text-3xl font-bold mb-6 text-primary">Inventaire</h1>
  
      <!-- Filtres -->
      <div class="mb-4 flex flex-wrap gap-4">
        <input
          type="text"
          v-model="search"
          placeholder="🔍 Rechercher un objet..."
          class="input"
        />
        <select v-model="selectedLieu" class="input">
          <option value="">📍 Tous les lieux</option>
          <option v-for="lieu in lieux" :key="lieu" :value="lieu">{{ lieu }}</option>
        </select>
        <select v-model="selectedKit" class="input">
          <option value="">🧰 Tous les kits</option>
          <option v-for="kit in kits" :key="kit" :value="kit">{{ kit }}</option>
        </select>
        <select v-model="selectedCategorie" class="input">
          <option value="">📦 Toutes les catégories</option>
          <option v-for="categorie in categories" :key="categorie" :value="categorie">
            {{ categorie }}
          </option>
        </select>
      </div>
  
      <!-- Tableau -->
      <table class="table">
        <thead>
          <tr>
            <th>Objet</th>
            <th>Quantité</th>
            <th>Lieu</th>
            <th>Kit</th>
            <th>Catégorie</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in filteredData" :key="row.Objet">
            <td>{{ row.Objet }}</td>
            <td>{{ row.Quantité }}</td>
            <td>{{ row.Lieu }}</td>
            <td>{{ row.Kit }}</td>
            <td>{{ row.Catégorie }}</td>
            <td>{{ row.Note }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  
  const csvUrl = 'https://docs.google.com/spreadsheets/d/1jbjMIfJrWoY691Ye_7QGzbqvucMtZEzb/gviz/tq?tqx=out:csv'
  
  const data = ref([])
  const search = ref('')
  const selectedLieu = ref('')
  const selectedKit = ref('')
  const selectedCategorie = ref('')
  
  const lieux = ref([])
  const kits = ref([])
  const categories = ref([])
  
  const fetchCSV = async () => {
    try {
      const res = await fetch(csvUrl)
      const text = await res.text()
      data.value = parseCSV(text)
  
      // Populate filters
      lieux.value = Array.from(new Set(data.value.map((item) => item.Lieu))).sort()
      kits.value = Array.from(new Set(data.value.map((item) => item.Kit))).sort()
      categories.value = Array.from(
        new Set(data.value.map((item) => item.Catégorie))
      ).sort()
    } catch (err) {
      alert('Erreur lors du chargement des données : ' + err)
      console.error(err)
    }
  }
  
  const parseCSV = (text) => {
    const rows = text
      .trim()
      .split('\n')
      .map((r) => r.split(',').map((cell) => cell.replace(/^"|"$/g, '').trim()))
    const headers = rows[0]
    return rows.slice(1).map((row) => {
      const obj = {}
      headers.forEach((header, i) => {
        obj[header] = row[i] || ''
      })
      return obj
    })
  }
  
  const filteredData = computed(() => {
    return data.value.filter((item) => {
      return (
        (!selectedLieu.value || item.Lieu === selectedLieu.value) &&
        (!selectedKit.value || item.Kit === selectedKit.value) &&
        (!selectedCategorie.value || item.Catégorie === selectedCategorie.value) &&
        item.Objet.toLowerCase().includes(search.value.toLowerCase())
      )
    })
  })
  
  onMounted(fetchCSV)
  </script>
  
  <style scoped>
  :root {
    --primary-color: #4f46e5;
    --bg-light: #f9fafb;
    --bg-table: #ffffff;
    --text-color: #1f2937;
    --border-color: #e5e7eb;
    --radius: 8px;
  }
  
  body {
    font-family: 'Segoe UI', sans-serif;
    background-color: var(--bg-light);
    color: var(--text-color);
  }
  
  h1 {
    color: var(--primary-color);
  }
  
  .input {
    padding: 0.6em 1em;
    margin: 0.5em 0;
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    font-size: 1em;
    background-color: #ffffff04;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    transition: all 0.2s ease;
  }
  
  .input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
  }
  
  .table {
    width: 100%;
    border-collapse: collapse;
    background-color: var(--bg-table);
    border-radius: var(--radius);
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }
  
  th,
  td {
    padding: 1em;
    border-bottom: 1px solid var(--border-color);
    text-align: left;
  }
  
  th {
    background-color: #f3f4f6;
    font-weight: 600;
    font-size: 0.95em;
    text-transform: uppercase;
    color: #374151;
  }
  
  tr:hover {
    background-color: #f9fafb;
  }
  </style>
<template>
  <div class="max-w-4xl mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Emission à venir</h1>

    <div v-if="loading" class="text-center text-gray-500">Chargement...</div>

    <div v-else-if="events.length === 0" class="text-center text-gray-500">Aucun événement trouvé.</div>

    <div class="space-y-4">
      <div
        v-for="event in events"
        :key="event.id"
        class="input"
      >
        <h2 class="text-xl font-semibold">{{ event.summary }}</h2>
        <p class="text-gray-600">
          📅 {{ formatDate(event.start.date || event.start.dateTime) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const events = ref([])
const loading = ref(true)

const fetchEvents = async () => {
  try {
    const res = await fetch('/events.json') // Charger les événements statiques
    events.value = await res.json()
  } catch (err) {
    console.error('Erreur lors du chargement des événements', err)
  } finally {
    loading.value = false
  }
}

const formatDate = (iso) => {
  const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
  return new Date(iso).toLocaleDateString('fr-CH', options)
}

onMounted(fetchEvents)
</script>

<style scoped>
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
</style>
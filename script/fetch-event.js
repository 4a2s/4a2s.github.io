import { writeFileSync } from 'fs'
import fetch from 'node-fetch'

const API_KEY = process.env.GOOGLE_API_KEY 
const CALENDAR_ID = '10bc7f6ed091d6683aae3cead8fc68f1876d78565b61e5ae7069d4e3afd391cf@group.calendar.google.com'

const fetchEvents = async () => {
  const timeMin = new Date().toISOString()
  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
    CALENDAR_ID
  )}/events?key=${API_KEY}&timeMin=${timeMin}&singleEvents=true&orderBy=startTime`

  try {
    const res = await fetch(url)
    const data = await res.json()
    writeFileSync('./public/events.json', JSON.stringify(data.items || [], null, 2))
    console.log('Événements récupérés et enregistrés dans public/events.json')
  } catch (err) {
    console.error('Erreur lors du chargement des événements', err)
  }
}

fetchEvents()
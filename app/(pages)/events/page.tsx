'use client'
// Import necessary modules
import Axios from '@/app/api/axios'
import { useEffect, useState } from 'react'
import useAxiosPrivate from '@/app/hooks/useAxiosPrivate'

// Define the interface for the Event object
interface Event {
    event_id: string // Assuming Uuid is a string type
    user_id: string | null // Assuming Uuid is a string type
    event_name: string
    event_date: Date // Assuming NaiveDate is replaced with Date
    event_location: string | null // Assuming Option<String> is a string type
    event_description: string | null // Assuming Option<String> is a string type
    event_status: boolean
}

const Events = () => {
    // Initialize events state with an empty array
    const [events, setEvents] = useState<Event[]>([])
    // const axios = useAxiosPrivate()
    useEffect(() => {
        // Define an async function to fetch events data
        const fetchEvents = async () => {
            try {
                // Send a GET request to fetch events data from the server
                const response = await Axios.get('/events')
                // Update the events state with the fetched data
                setEvents(response.data.data)
            } catch (error) {
                console.error('Error fetching events:', error)
            }
        }

        // Call the fetchEvents function when the component mounts
        fetchEvents()
    }, []) // Provide an empty dependency array to run the effect only once when the component mounts

    return (
        <section className="container mx-auto px-4">
            <h1 className="mb-8 text-3xl font-bold">Your Events</h1>
            {/* Map over the events array to render each event */}
            {events.map((event) => (
                <div
                    key={event.event_id}
                    className="mb-4 rounded bg-gray-100 p-4 shadow"
                >
                    <h2 className="mb-2 text-xl font-bold">
                        {event.event_name}
                    </h2>
                    <p className="mb-2 text-gray-600">
                        {new Date(event.event_date).toLocaleDateString()}
                    </p>
                    <p className="mb-2 text-gray-600">
                        {event.event_location || 'No location specified'}
                    </p>
                    <p className="mb-2 text-gray-600">
                        {event.event_description || 'No description available'}
                    </p>
                    <p
                        className={`text-sm font-bold ${event.event_status ? 'text-green-600' : 'text-red-600'}`}
                    >
                        {event.event_status ? 'Active' : 'Inactive'}
                    </p>
                </div>
            ))}
        </section>
    )
}

export default Events

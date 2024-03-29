'use client'
// Import necessary modules
import Axios, { AxiosPrivate } from '@/app/api/axios'
import { useEffect, useState } from 'react'

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

interface Ticket {
    ticket_id: string
    ticket_type: string
    price: number
    availability: number
    event_id: string // Added event_id property
}

const YourEvents = () => {
    // Initialize events state with an empty array
    const [events, setEvents] = useState<Event[]>([])
    const [tickets, setTickets] = useState<Ticket[]>([])
    // const axios = useAxiosPrivate()
    useEffect(() => {
        // Define an async function to fetch events data
        const fetchEvents = async () => {
            try {
                // Send a GET request to fetch events data from the server
                const response = await AxiosPrivate.get('/userevents')
                // Update the events state with the fetched data
                setEvents(response.data.data)
            } catch (error) {
                console.error('Error fetching events:', error)
            }
        }

        // Call the fetchEvents function when the component mounts
        fetchEvents()
    }, [])

    const handleTicket = async (event_id: string) => {
        try {
            const res = await Axios.get('/get_ticket/' + event_id)
            setTickets(res.data.data)
            console.log(res.data) // Log the response data
        } catch (error) {
            console.error('Error fetching tickets:', error)
        }
    }

    return (
        <section className="container mx-auto flex-col px-4">
            <h1 className="mb-8 text-3xl font-bold">Your Events</h1>

            <div className="flex flex-col gap-2 px-4">
                {events.map((event) => (
                    <button
                        onClick={() => handleTicket(event.event_id)}
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
                            {event.event_description ||
                                'No description available'}
                        </p>
                        <p
                            className={`text-sm font-bold ${!event.event_status ? 'text-green-600' : 'text-red-600'}`}
                        >
                            {!event.event_status ? 'Active' : 'Inactive'}
                        </p>
                        <div className="flex flex-col text-3xl text-black">
                            {tickets.length > 0 &&
                                tickets.map(
                                    (ticket) =>
                                        ticket.event_id === event.event_id && (
                                            <div key={ticket.ticket_id}>
                                                {ticket.ticket_id}
                                            </div>
                                        )
                                )}
                        </div>
                    </button>
                ))}
            </div>
        </section>
    )
}

export default YourEvents

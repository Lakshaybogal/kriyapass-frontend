'use client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Axios from '@/app/api/axios'

interface Ticket {
    ticket_id: string
    ticket_type: string
    price: number
    availability: number
    event_id: string
}

const EventPage = ({ params }) => {
    const [tickets, setTickets] = useState<Ticket[]>([])
    const eventId = params.id[0]

    useEffect(() => {
        const handleTicket = async (eventId: string) => {
            try {
                const response = await Axios.get(`/get_ticket/${eventId}`)
                setTickets(response.data.data)
                console.log(response.data) // Log the response data
            } catch (error) {
                console.error('Error fetching tickets:', error)
            }
        }

        if (eventId) {
            handleTicket(eventId) // Call handleTicket function if eventId exists
        }
    }, [eventId]) // Add eventId to the dependency array

    return (
        <div className="flex flex-col text-xl text-white">
            {tickets.length > 0 &&
                tickets.map((ticket) => (
                    <div key={ticket.ticket_id}>{ticket.ticket_id}</div>
                ))}
        </div>
    )
}

export default EventPage

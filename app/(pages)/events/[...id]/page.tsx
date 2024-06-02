'use client'
import Axios from '@/app/api/axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { Event } from '../page'

interface Ticket {
    ticket_id: string
    ticket_type: string
    price: number
    availability: number
    event_id: string
    event_name: string
}

const EventPage: React.FC<{ params: { id: string[] } }> = ({ params }) => {
    const [tickets, setTickets] = useState<Ticket[]>([])
    const [event, setEvent] = useState<Event>()
    const router = useRouter()
    const eventId = params.id[0]
    const searchParams = useSearchParams()
    const event_name = searchParams.get('event_name')
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)
            return params.toString()
        },
        [searchParams]
    )

    useEffect(() => {
        const handleTicket = async (eventId: string) => {
            try {
                const resEvent = await Axios.get(`/event/${eventId}`)
                setEvent(resEvent.data.data)
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
        <div className="flex flex-col p-4 text-xl text-white">
            <h1 className="mb-4 text-3xl font-bold">{event_name}</h1>
            <h1 className="mb-2">{event?.event_id}</h1>
            <h1 className="mb-2">{event?.event_date}</h1>
            {tickets.length > 0 &&
                tickets.map((ticket) => (
                    <div
                        key={ticket.ticket_id}
                        className="mb-4 rounded-lg bg-gray-800 p-4 shadow-md"
                    >
                        <h2 className="mb-2 text-xl font-bold">
                            {ticket.ticket_id}
                        </h2>
                        <p className="mb-2">Price: ${ticket.price}</p>
                        <p className="mb-2">
                            Availability: {ticket.availability}
                        </p>
                        <button
                            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                            onClick={() => {
                                // <pathname>?sort=asc
                                router.push(
                                    '/bookings/book-ticket' +
                                        '?' +
                                        createQueryString(
                                            'event_name',
                                            `${ticket.event_name}`
                                        ) +
                                        '&' +
                                        createQueryString(
                                            'ticket_id',
                                            `${ticket.ticket_id}`
                                        ) +
                                        '&' +
                                        createQueryString(
                                            'price',
                                            `${ticket.price}`
                                        )
                                )
                            }}
                        >
                            Click
                        </button>
                    </div>
                ))}
        </div>
    )
}

export default EventPage

'use client'
import React, { useState } from 'react'
import { AxiosPrivate } from '@/app/api/axios'
import useAuth from '@/app/hooks/useAuthContext'

interface Ticket {
    ticket_type: string
    price: number
    availability: number
}

interface Event {
    event_name: string
    event_date: string
    event_location: string
    event_description: string
}

const CreateEvent: React.FC = () => {
    const { auth } = useAuth()
    const [event, setEvent] = useState<Event>({
        event_name: '',
        event_date: '',
        event_location: '',
        event_description: '',
    })

    const [ticketData, setTicketData] = useState<Ticket[]>([])

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setEvent({
            ...event,
            [e.target.name]: e.target.value,
        })
    }

    const handleTicketChange = (
        index: number,
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const updatedTickets = [...ticketData]
        updatedTickets[index] = {
            ...updatedTickets[index],
            [e.target.name]: e.target.value,
        }
        setTicketData(updatedTickets)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (ticketData.length < 1) {
            console.error(
                'At least one ticket with all fields filled is required to add an event'
            )
            return
        }

        try {
            const response = await AxiosPrivate.post('/events/add_event', event)

            console.log('Event created:', response.data)
            for (let i = 0; i < ticketData.length; i++) {
                const ticketResponse = await AxiosPrivate.post(
                    '/create_ticket',
                    {
                        email: auth?.user?.email,
                        event_id: response.data.data.event_id,
                        event_name: response.data.data.event_name,
                        ...ticketData[i],
                    }
                )

                console.log(ticketResponse)
            }
        } catch (error) {
            console.error('Error creating event:', error)
        }
    }

    const addTicket = () => {
        setTicketData([
            ...ticketData,
            {
                ticket_type: '',
                price: 0,
                availability: 0,
            },
        ])
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="mx-auto my-8 max-w-md text-black"
            >
                <input
                    type="text"
                    name="event_name"
                    value={event.event_name}
                    onChange={handleChange}
                    placeholder="Event Name"
                    className="mb-4 w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
                />
                <input
                    type="date"
                    name="event_date"
                    value={event.event_date}
                    onChange={handleChange}
                    placeholder="Event Date"
                    className="mb-4 w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
                />
                <input
                    type="text"
                    name="event_location"
                    value={event.event_location}
                    onChange={handleChange}
                    placeholder="Event Location"
                    className="mb-4 w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
                />
                <textarea
                    name="event_description"
                    value={event.event_description}
                    onChange={handleChange}
                    placeholder="Event Description"
                    className="mb-4 w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
                ></textarea>
                <button
                    type="submit"
                    className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none"
                >
                    Submit
                </button>
            </form>
            <div>
                {ticketData.map((ticket, index) => (
                    <div
                        key={index}
                        className="mx-auto my-8 max-w-md text-black"
                    >
                        <input
                            type="text"
                            name="ticket_type"
                            value={ticket.ticket_type}
                            onChange={(e) => handleTicketChange(index, e)}
                            placeholder="Ticket Type"
                            className="mb-4 w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
                        />
                        <input
                            type="number"
                            name="price"
                            value={ticket.price}
                            onChange={(e) => handleTicketChange(index, e)}
                            placeholder="Price"
                            className="mb-4 w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
                        />
                        <input
                            type="number"
                            name="availability"
                            value={ticket.availability}
                            onChange={(e) => handleTicketChange(index, e)}
                            placeholder="Availability"
                            className="mb-4 w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                ))}
                <div>
                    <button
                        onClick={addTicket}
                        className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none"
                    >
                        Add Ticket
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateEvent

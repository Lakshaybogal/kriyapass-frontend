'use client'
import Axios, { AxiosPrivate } from '@/app/api/axios'
import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

export interface Event {
    event_id: string
    user_id: string | null
    event_name: string
    event_date: string
    event_location: string | null
    event_description: string | null
    event_status: boolean
}

const Events = () => {
    const [events, setEvents] = useState<Event[]>([])

    const router = useRouter()
    const searchParams = useSearchParams()
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await AxiosPrivate.get('/events')
                setEvents(response.data.data)
            } catch (error) {
                console.error('Error fetching events:', error)
            }
        }

        fetchEvents()
    }, [])
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)
            return params.toString()
        },
        [searchParams]
    )

    return (
        <section className="container mx-auto flex-col px-4">
            <h1 className="mb-8 text-3xl font-bold">Events</h1>

            <div className="flex flex-col gap-2 px-4">
                {events.map((event) => (
                    <div
                        key={event.event_id}
                        className="mb-4 rounded bg-gray-100 p-4 shadow"
                    >
                        <button
                            className="w-full"
                            onClick={() =>
                                router.push(
                                    `/events/${event.event_id}` +
                                        '?' +
                                        createQueryString(
                                            'event_name',
                                            `${event.event_name}`
                                        )
                                )
                            }
                        >
                            <h2 className="mb-2 text-xl font-bold text-black">
                                {event.event_name}
                            </h2>
                            <p className="mb-2 text-gray-600">
                                {new Date(
                                    event.event_date
                                ).toLocaleDateString()}
                            </p>
                            <p className="mb-2 text-gray-600">
                                {event.event_location ||
                                    'No location specified'}
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
                        </button>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Events

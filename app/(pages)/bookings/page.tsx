'use client'
import { useState, useEffect } from 'react'
import { AxiosPrivate } from '@/app/api/axios'
export interface Booking {
    booking_id: string
    user_id: string | null
    event_name: string | null
    ticket_id: string | null
    quantity: string
    total_price: string
    booking_date: string | null // Assuming the date is a string in ISO 8601 format
    verified: boolean
}

const Bookings: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AxiosPrivate.get('/bookings')
                console.log(response)
                setBookings(response.data.data)
            } catch (error) {
                console.error('Error fetching bookings:', error)
            }
        }

        fetchData()
    }, [])

    return (
        <div className="container mx-auto mt-8 text-black">
            <h1 className="mb-4 text-3xl font-bold">Your Bookings</h1>
            <div className="grid grid-cols-1 gap-4">
                {bookings.map((booking) => (
                    <div
                        key={booking.booking_id}
                        className="rounded bg-gray-100 p-4 shadow-md"
                    >
                        <h2 className="mb-2 text-xl font-bold">
                            {booking.event_name}
                        </h2>
                        <p>Ticket ID: {booking.ticket_id}</p>
                        <p>Quantity: {booking.quantity}</p>
                        <p>Total Price: {booking.total_price}</p>
                        <p>
                            Booking Date:{' '}
                            {new Date(
                                booking.booking_date!
                            ).toLocaleDateString()}
                        </p>
                        <p>Verified: {booking.verified ? 'Yes' : 'No'}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Bookings

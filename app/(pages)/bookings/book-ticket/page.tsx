'use client'
import { AxiosPrivate } from '@/app/api/axios'
import useAuth from '@/app/hooks/useAuthContext'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

const BookTicket: React.FC = () => {
    const searchParams = useSearchParams()
    const event_name = searchParams.get('event_name')
    const price = searchParams.get('price')
    const ticket_id = searchParams.get('ticket_id')

    const [quantity, setQuantity] = useState<string>('0') // Corrected typo in variable name and state setter
    const { auth } = useAuth()
    const handleSubmit = async () => {
        const res = await AxiosPrivate.post('/book_ticket', {
            user_id: auth?.user?.user_id,
            event_name,
            price,
            ticket_id,
            quantity, // Corrected variable name to match state variable
        })
        console.log(res.data)
    }

    return (
        <div className="flex flex-col gap-10">
            <h1 className="text-xl font-bold">Search Results</h1>
            <h1 className="text-2xl font-bold">{event_name}</h1>
            <input
                type="text"
                value={quantity} // Corrected variable name for input value
                onChange={(e) => setQuantity(e.target.value)} // Update quantity state on input change
                className="rounded-md border border-gray-300 p-2 text-black focus:border-blue-500 focus:outline-none"
            />
            <button
                onClick={handleSubmit}
                className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none"
            >
                Submit
            </button>{' '}
            {/* Added a button to trigger handleSubmit */}
        </div>
    )
}

export default BookTicket

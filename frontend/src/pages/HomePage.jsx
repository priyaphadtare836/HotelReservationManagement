import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import api from '../lib/axios'
import toast from 'react-hot-toast'
import ReservationCard from '../components/ReservationCard'
import ReservationNotFound from '../components/ReservationNotFound'

const HomePage = () => {
   const [reservations, setReservations] = useState([])
   const [loading, setLoading] = useState(true)
   const [search, setSearch] = useState("")
   const [roomFilter, setRoomFilter] = useState("All")
   const [paymentFilter, setPaymentFilter] = useState("All")

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const res = await api.get('/reservations')
                console.log(res.data)
                let data = res.data

                 const today = new Date()
                data = data.map((reservation) => {
                    const checkIn = new Date(reservation.checkIn)
                    const checkOut = new Date(reservation.checkOut)
                    let status = "Upcoming"
                    if (today >= checkIn && today <= checkOut) status = "Ongoing"
                    if (today > checkOut) status = "Completed"
                    return { ...reservation, status }
                })
                data.sort((a, b) => {
                    if (a.paymentStatus === 'Pending' && b.paymentStatus !== 'Pending') return -1
                    if (a.paymentStatus !== 'Pending' && b.paymentStatus === 'Pending') return 1
                    return 0
                })
                setReservations(data)
            } catch (error) {
                console.log("Error fetching reservations", error)
                toast.error("Failed to load reservations")
            } finally {
                setLoading(false)
            }
        }
        fetchReservations()
    }, [])
    const filteredReservations = reservations.filter((r) => {
        const matchesSearch = search.trim() === "" ||
            r.guestName.toLowerCase().includes(search.toLowerCase().trim()) ||
            r.contactNumber.includes(search.trim())
        const matchesRoom = roomFilter === "All" || r.roomType === roomFilter
        const matchesPayment = paymentFilter === "All" || r.paymentStatus === paymentFilter
        return matchesSearch && matchesRoom && matchesPayment
    })
    return (
        <div className='min-h-screen'>
            <Navbar />
            <div className='max-w-7xl mx-auto p-4 mt-6'>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <input type="text" 
                    placeholder="Search by Guest Name or Contact Number" 
                    className="input input-bordered w-full md:w-1/3"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}/>
                    <select
                        className="select select-bordered w-full md:w-1/4"
                        value={roomFilter}
                        onChange={(e) => setRoomFilter(e.target.value)}>
                        <option value="All">All Room Types</option>
                        <option value="Single">Single</option>
                        <option value="Double">Double</option>
                        <option value="Deluxe">Deluxe</option>
                    </select>
                    <select
                        className="select select-bordered w-full md:w-1/4"
                        value={paymentFilter}
                        onChange={(e) => setPaymentFilter(e.target.value)}>
                        <option value="All">All Payment Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                    </select>
                </div>
                {loading && (
                    <div className='text-center text-primary py-10'>
                        Loading reservations...
                    </div>
                )}
                {!loading && filteredReservations.length === 0 && (
                    <ReservationNotFound />
                )}
                {!loading && filteredReservations.length > 0 && (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {filteredReservations.map((reservation) => (
                            <ReservationCard
                                key={reservation._id}
                                reservation={reservation}
                                setReservations={setReservations}/>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
export default HomePage
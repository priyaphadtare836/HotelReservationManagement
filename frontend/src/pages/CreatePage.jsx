import api from '../lib/axios'
import { ArrowLeftIcon } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router'

const CreatePage = () => {
    const [guestName, setGuestName] = useState('')
    const [membersCount, setMembersCount] = useState('')
    const [roomType, setRoomType] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [paymentStatus, setPaymentStatus] = useState('Pending')
    const [contactNumber, setContactNumber] = useState('')
    const [remarks, setRemarks] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            await api.post('/reservations', {
                guestName,
                membersCount: Number(membersCount),
                roomType,
                checkIn,
                checkOut,
                paymentStatus,
                contactNumber,
                remarks
            })
            toast.success('Reservation created successfully!')
            navigate('/')
        } catch (error) {
            console.log('Error creating reservation', error)
            toast.error('Failed to create reservation.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen bg-base-200'>
            <div className='container mx-auto px-4 py-8'>
                <div className='max-w-2xl mx-auto'>
                    <Link to={'/'} className='btn btn-ghost mb-6'>
                        <ArrowLeftIcon className='size-5' /> Back to Reservations
                    </Link>
                    <div className='card bg-base-100'>
                        <div className='card-body'>
                            <h2 className='card-title text-2xl mb-4'> Create New Reservation </h2>
                            <form onSubmit={handleSubmit}>
                                <div className='form-control mb-4'>
                                    <label className='label'><span className='label-text'> Guest Name </span></label>
                                    <input type="text" placeholder='Guest Name' className='input input-bordered' value={guestName} onChange={(e) => setGuestName(e.target.value)} required />
                                </div>
                                <div className='form-control mb-4'>
                                    <label className='label'><span className='label-text'> Members Count </span></label>
                                    <input type="number" placeholder='e.g. 2' className='input input-bordered' value={membersCount} onChange={(e) => setMembersCount(e.target.value)} min="1" step="1" required />
                                </div>
                                <div className='form-control mb-4'>
                                    <label className='label'><span className='label-text'> Room Type </span></label>
                                    <input type="text" placeholder='Single / Double / Deluxe' className='input input-bordered' value={roomType} onChange={(e) => setRoomType(e.target.value)} required />
                                </div>
                                <div className='form-control mb-4'>
                                    <label className='label'><span className='label-text'> Check-in </span></label>
                                    <input type="date" className='input input-bordered' value={checkIn} onChange={(e) => setCheckIn(e.target.value)} required />
                                </div>
                                <div className='form-control mb-4'>
                                    <label className='label'><span className='label-text'> Check-out </span></label>
                                    <input type="date" className='input input-bordered' value={checkOut} onChange={(e) => setCheckOut(e.target.value)} required />
                                </div>
                                <div className='form-control mb-4'>
                                    <label className='label'><span className='label-text'> Payment Status </span></label>
                                    <select className='select select-bordered' value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)}>
                                        <option>Pending</option>
                                        <option>Paid</option>
                                    </select>
                                </div>
                                <div className='form-control mb-4'>
                                    <label className='label'><span className='label-text'> Contact Number </span></label>
                                    <input type="tel" placeholder='Phone number' className='input input-bordered' value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required />
                                </div>
                                <div className='form-control mb-4'>
                                    <label className='label'><span className='label-text'> Remarks </span></label>
                                    <textarea className='textarea textarea-bordered' placeholder='Any notes...' value={remarks} onChange={(e) => setRemarks(e.target.value)}></textarea>
                                </div>
                                <div className='card-actions justify-end'>
                                    <button type='submit' className='btn btn-primary' disabled={loading}>
                                        {loading ? "Creating ..." : "Create Reservation"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CreatePage
import React, { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from 'react-router'
import api from "../lib/axios"
import toast from "react-hot-toast"
import { LoaderIcon, Trash2Icon, ArrowLeftIcon } from "lucide-react"

const ReservationDetailPage = () => {
    const [reservation, setReservation] = useState(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams()
    
    useEffect(() => {
        const fetchReservation = async () => {
            try {
                const res = await api.get(`/reservations/${id}`)
                setReservation(res.data)
            } catch (error) {
                console.error("Error fetching reservation", error)
                toast.error("Failed to fetch the reservation")
            } finally {
                setLoading(false)
            }
        }
        fetchReservation()
    }, [id])
    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this reservation?")) return
        try {
            await api.delete(`/reservations/${id}`)
            toast.success("Reservation deleted successfully")
            navigate("/")
        } catch (error) {
            console.error("Error deleting reservation", error)
            toast.error("Failed to delete reservation")
        }
    }
    const handleSave = async () => {
        if (!reservation.guestName.trim()) {
            toast.error("Please add guest name")
            return
        }
        setSaving(true)
        try {
            await api.put(`/reservations/${id}`, {
                guestName: reservation.guestName,
                membersCount: Number(reservation.membersCount),
                roomType: reservation.roomType,
                checkIn: reservation.checkIn,
                checkOut: reservation.checkOut,
                paymentStatus: reservation.paymentStatus,
                contactNumber: reservation.contactNumber,
                remarks: reservation.remarks
            })
            toast.success("Reservation updated successfully")
            navigate("/")
        } catch (error) {
            console.error("Error updating reservation", error)
            toast.error("Failed to update reservation")
        } finally {
            setSaving(false)
        }
    }
    if (loading) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <LoaderIcon className="animate-spin size-10" />
            </div>
        )
    }
    return (
        <div className="min-h-screen bg-base-200">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <Link to="/" className="btn btn-ghost">
                            <ArrowLeftIcon className="h-5 w-5" />Back to Reservations
                        </Link>
                        <button onClick={handleDelete} className="btn btn-error btn-outline">
                            <Trash2Icon className="h-5 w-5" /> Delete Reservation
                        </button>
                    </div>
                    <div className="card bg-base-100 shadow-lg">
                        <div className="card-body">
                            <div className="form-control mb-4">
                                <label className="label">
                                <span className="label-text">Guest Name</span> </label>
                                <input type="text" placeholder="Guest name" className="input input-bordered" value={reservation.guestName} onChange={(e) => setReservation({ ...reservation, guestName: e.target.value })} />
                            </div>
                            <div className="form-control mb-4">
                                <label className="label">
                                <span className="label-text">Members Count</span> </label>
                                <input type="number" placeholder="Members count" className="input input-bordered" value={reservation.membersCount} onChange={(e) => setReservation({ ...reservation, membersCount: e.target.value })} />
                            </div>
                            <div className="form-control mb-4">
                                <label className="label">
                                <span className="label-text">Room Type</span> </label>
                                <input type="text" placeholder="Room type" className="input input-bordered" value={reservation.roomType} onChange={(e) => setReservation({ ...reservation, roomType: e.target.value })} />
                            </div>
                            <div className="form-control mb-4">
                                <label className="label">
                                <span className="label-text">Check In</span> </label>
                                <input type="date" className="input input-bordered" value={reservation.checkIn ? reservation.checkIn.slice(0,10) : ''} onChange={(e) => setReservation({ ...reservation, checkIn: e.target.value })} />
                            </div>
                            <div className="form-control mb-4">
                                <label className="label">
                                <span className="label-text">Check Out</span> </label>
                                <input type="date" className="input input-bordered" value={reservation.checkOut ? reservation.checkOut.slice(0,10) : ''} onChange={(e) => setReservation({ ...reservation, checkOut: e.target.value })} />
                            </div>
                            <div className="form-control mb-4">
                                <label className="label">
                                <span className="label-text">Payment Status</span> </label>
                                <select className="select select-bordered" value={reservation.paymentStatus} onChange={(e) => setReservation({ ...reservation, paymentStatus: e.target.value })}>
                                    <option>Pending</option>
                                    <option>Paid</option>
                                </select>
                            </div>
                            <div className="form-control mb-4">
                                <label className="label">
                                <span className="label-text">Contact Number</span> </label>
                                <input type="tel" placeholder="Contact number" className="input input-bordered" value={reservation.contactNumber} onChange={(e) => setReservation({ ...reservation, contactNumber: e.target.value })} />
                            </div>
                            <div className="form-control mb-6">
                                <label className="label">
                                <span className="label-text">Remarks</span> </label>
                                <textarea placeholder="Remarks" className="textarea textarea-bordered" value={reservation.remarks} onChange={(e) => setReservation({ ...reservation, remarks: e.target.value })} />
                            </div>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                                    {saving ? "Saving ..." : "Save Changes"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>            
        </div>
    )
}
export default ReservationDetailPage
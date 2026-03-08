import { Link, useLocation } from "react-router"
import { Hotel, Users, Calendar, DollarSign, Edit2, Trash2 } from "lucide-react"
import { formatDate } from "../lib/utils"
import api from "../lib/axios"
import toast from "react-hot-toast"
import { useState } from "react"

const ReservationCard = ({ reservation, setReservations }) => {
    const [showModal, setShowModal] = useState(false)
    const location = useLocation()
    const isActive = location.pathname === `/reservation/${reservation._id}`
    const handleDelete = async () => {
        try {
            await api.delete(`/reservations/${reservation._id}`)
            setReservations((prev) => prev.filter((b) => b._id !== reservation._id))
            toast.success("Reservation deleted successfully")
        } catch {
            toast.error("Failed to delete reservation")
        } finally {
            setShowModal(false)
        }
    }
    const status = reservation.status || "Upcoming"
    const statusColor = status === "Ongoing" ? "badge-accent" : status === "Completed" ? "badge-secondary" : "badge-primary"
    const paymentColor = reservation.paymentStatus === "Pending" ? "badge-warning" : "badge-success"
    return (
        <>
           <Link to={`/reservation/${reservation._id}`} className={`relative block rounded-xl bg-base-100 p-4 border transition-all duration-200 ${isActive ? "border-primary shadow-lg": "border-base-300"} hover:border-primary hover:shadow-xl`}>
                <div className="flex justify-between items-start">
                 <p className="text-xs text-base-content/60 truncate"> {reservation._id} </p>
                 <span className={`badge ${statusColor}`}> {status} </span>
                 </div>
                <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2">
                        <Hotel className="size-4 text-primary" />
                        <p className="font-medium text-base-content line-clamp-1"> {reservation.guestName} </p>
                    </div>
                    <div className="flex items-center gap-2 text-base-content/70">
                        <Users className="size-4 text-primary" />
                        <p className="text-sm line-clamp-1"> Members: {reservation.membersCount} </p>
                    </div>
                    <div className="flex items-center gap-2 text-base-content/70">
                        <Hotel className="size-4 text-primary" />
                        <p className="text-sm line-clamp-1"> {reservation.roomType} </p>
                    </div>
                    <div className="flex items-center gap-2 text-base-content/70">
                        <Calendar className="size-4 text-primary" />
                        <p className="text-sm">
                        {formatDate(new Date(reservation.checkIn))} - {formatDate(new Date(reservation.checkOut))} </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <DollarSign className="size-4 text-primary" />
                        <span className={`badge ${paymentColor}`}>{reservation.paymentStatus}</span>
                    </div>
                </div>
                <div className="mt-6 flex justify-between items-center">
                    <span className="text-xs text-base-content/60">
                        {formatDate(new Date(reservation.createdAt))}
                    </span>
                    <div className="flex items-center gap-4">
                        <div className="tooltip tooltip-warning" data-tip="Edit reservation">
                            <Edit2 className="size-4 text-warning hover:scale-110 transition" />
                        </div>
                        <div className="tooltip tooltip-error" data-tip="Delete reservation">
                            <button onClick={(e) => {
                                e.preventDefault()
                                setShowModal(true)
                            }} className="text-error hover:scale-110 transition">
                                <Trash2 className="size-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </Link>
            {showModal && (
                <dialog className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg text-error flex items-center gap-2">
                            <Trash2 className="size-5" /> Delete Reservation
                        </h3>
                        <p className="py-4 text-base-content/70">
                            Are you sure you want to delete <span className="font-semibold text-base-content">"{reservation.guestName}"</span>?<br />
                            This action cannot be undone.
                        </p>
                        <div className="modal-action">
                            <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="btn btn-error flex items-center gap-2" onClick={handleDelete}>
                                <Trash2 className="size-4" /> Delete
                            </button>
                        </div>
                    </div>
                </dialog>
            )}
        </>
    )
}
export default ReservationCard
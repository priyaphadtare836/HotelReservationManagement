import Reservation from "../models/reservationModels.js"

export async function getAllReservations(_, res) {
    try {
        const reservations = await Reservation.find().sort({ createdAt: -1 })
        res.status(200).json(reservations)
    } catch (error) {
        console.error("Error in getAllReservations controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function getReservationByID(req, res) {
    try {
        const reservation = await Reservation.findById(req.params.id)
        if (!reservation) return res.status(404).json({ message: "Reservation not found" })
        res.status(200).json(reservation)
    } catch (error) {
        console.error("Error in getReservationById controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function createReservation(req, res) {
    try {
        const {guestName, membersCount, roomType, checkIn, checkOut, paymentStatus, contactNumber, remarks} = req.body
        if (!guestName ||!membersCount ||!roomType ||!checkIn ||!checkOut ||!paymentStatus ||
            !contactNumber ||!remarks){
            return res.status(404).json({ message: "All fields are required" })
        }
        const reservation = new Reservation({guestName, membersCount, roomType, checkIn, checkOut, paymentStatus, contactNumber, remarks})
        const savedReservation = await reservation.save()
        res.status(201).json(savedReservation)
    } catch (error) {
        console.error("Error in createReservation controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function updateReservation(req, res) {
    try {
        const {guestName, membersCount, roomType, checkIn, checkOut, paymentStatus, contactNumber, remarks} = req.body
        const updatedReservation = await Reservation.findByIdAndUpdate(req.params.id,
            {guestName, membersCount, roomType, checkIn, checkOut, paymentStatus,
                contactNumber, remarks},
            { new: true })
        if (!updatedReservation) return res.status(404).json({ message: "Reservation not found" })
        res.status(200).json(updatedReservation)
    } catch (error) {
        console.error("Error in updateReservation controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function deleteReservation(req, res) {
    try {
        const deletedReservation = await Reservation.findByIdAndDelete(req.params.id)
        if (!deletedReservation) return res.status(404).json({ message: "Reservation not found" })
        res.status(200).json({ message: "Reservation deleted successfully " })
    } catch (error) {
        console.error("Error in deleteReservation controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

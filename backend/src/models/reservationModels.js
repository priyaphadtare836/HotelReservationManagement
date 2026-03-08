import mongoose from "mongoose";
const reservationSchema = new mongoose.Schema(
  {
    guestName: {
      type: String,
      required: true,
    },
    membersCount: {
      type: Number,
      required: true,
      min: 1,
    },
    roomType: {
      type: String,
      enum: ["Single","Double","Deluxe"],
      required: true,
    },
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending","Paid"],
      default: "Pending",
    },
    contactNumber: {
      type: String,
      required: true,
    },
    remarks: {
      type: String,
      required: true,
    },
  },
  { timestamps: true });

const Reservation = mongoose.model("Reservation", reservationSchema);
export default Reservation;

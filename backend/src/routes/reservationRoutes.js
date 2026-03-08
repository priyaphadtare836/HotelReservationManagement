import express from "express";
import {createReservation, deleteReservation, getAllReservations, getReservationByID, updateReservation} 
from "../controllers/reservationController.js";

const router = express.Router();

router.get("/", getAllReservations);
router.get("/:id", getReservationByID);
router.post("/", createReservation);
router.put("/:id", updateReservation);
router.delete("/:id", deleteReservation);

export default router;

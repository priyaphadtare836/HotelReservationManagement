import { Hotel } from 'lucide-react'
import { Link } from 'react-router'

const ReservationNotFound = () => {
    return (
        <div className='flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center'>
            <div className='bg-primary/10 rounded-full p-8'>
                <Hotel className='size-10 text-primary' />
            </div>
            <h3 className='text-2xl font-bold'> No reservations yet</h3>
            <p className='text-base-content/70'>
                Ready to add reservations? Add first reservation.
            </p>
            <Link to='/create' className='btn btn-primary'>
                Add First Reservation
            </Link>
        </div>
    )
}
export default ReservationNotFound
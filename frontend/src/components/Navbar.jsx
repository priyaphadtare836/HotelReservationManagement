import { Link } from 'react-router'
import { PlusIcon } from "lucide-react"
const Navbar = () => {
    return (
        <header className='bg-blue-600 border-b border-base-content/10'>
            <div className='ms-auto max-w-6xl p-4'>
                <div className='flex items-center justify-between'>
                    <h1 className='text-3xl font-bold text-white font-mono tracking-tight'>
                        HOTEL RESERVATIONS MANAGEMENT SYSTEM
                    </h1>
                    <div className='flex items-center gap-4'>
                        <Link to={"/create"} className="btn btn-primary">
                            <PlusIcon className='size-5' /> <span> New Reservation</span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default Navbar
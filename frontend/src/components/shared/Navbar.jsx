import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className="bg-white border-b shadow-sm">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">

                {/* LEFT SECTION */}
                <div className="flex items-center gap-10">

                    {/* Logo */}
                    <h1 className="text-2xl font-bold">
                        Job<span className="text-[#F83002]">Portal</span>
                    </h1>

                    {/* Navigation Links */}
                    <ul className="flex items-center gap-6 font-medium text-gray-600">
                        {
                            user && user.role === "recruiter" ? (
                                <>
                                    <li>
                                        <Link className="hover:text-[#6A38C2] transition duration-200" to="/admin/companies">
                                            Companies
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="hover:text-[#6A38C2] transition duration-200" to="/admin/jobs">
                                            Jobs
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link
                                            className="px-3 py-1.5 rounded-md hover:bg-gray-100 hover:text-[#6A38C2] transition duration-200"
                                            to="/"
                                        >
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="px-3 py-1.5 rounded-md hover:bg-gray-100 hover:text-[#6A38C2] transition duration-200"
                                            to="/jobs"
                                        >
                                            Jobs
                                        </Link>
                                    </li>
                                </>
                            )
                        }
                    </ul>
                </div>

                {/* RIGHT SECTION */}
                <div className="flex items-center gap-4">
                    {
                        !user ? (
                            <>
                                <Link to="/login">
                                    <Button variant="outline">Login</Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                                        Signup
                                    </Button>
                                </Link>
                            </>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.profile?.profilePhoto} />
                                    </Avatar>
                                </PopoverTrigger>

                                <PopoverContent className="w-80">
                                    <div>
                                        <div className="flex gap-3 items-center">
                                            <Avatar>
                                                <AvatarImage src={user?.profile?.profilePhoto} />
                                            </Avatar>
                                            <div>
                                                <h4 className="font-medium">{user?.fullname}</h4>
                                                <p className="text-sm text-gray-500">
                                                    {user?.profile?.bio}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col mt-4 text-gray-600 gap-2">
                                            {
                                                user.role === "student" && (
                                                    <Link
                                                        to="/profile"
                                                        className="flex items-center gap-2 hover:text-[#6A38C2]"
                                                    >
                                                        <User2 size={18} />
                                                        View Profile
                                                    </Link>
                                                )
                                            }

                                            <button
                                                onClick={logoutHandler}
                                                className="flex items-center gap-2 hover:text-red-500"
                                            >
                                                <LogOut size={18} />
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>
        </div>

    )
}

export default Navbar
import { Home, LogOut, MessageCircle, PlusSquare } from 'lucide-react';
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { toast } from 'sonner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '@/redux/authSlice';
import CreatePost from './CreatePost';
import { setPosts, setSelectedPost } from '@/redux/postSlice';

const LeftSidebar = () => {
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/v1/user/logout', { withCredentials: true });
            if (res.data.success) {
                dispatch(setAuthUser(null));
                dispatch(setSelectedPost(null));
                dispatch(setPosts([]));
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const sidebarHandler = (textType) => {
        if (textType === 'Logout') {
            logoutHandler();
        } else if (textType === "Create") {
            setOpen(true);
        } else if (textType === "Profile") {
            navigate(`/profile/${user?._id}`);
        } else if (textType === "Home") {
            navigate("/");
        } else if (textType === 'Messages') {
            navigate("/chat");
        }
    }

    const sidebarItems = [
        { icon: <Home />, text: "Home" },
        { icon: <MessageCircle />, text: "Messages" },
        { icon: <PlusSquare />, text: "Create" },
        {
            icon: (
                <Avatar className='w-6 h-6'>
                    <AvatarImage src={user?.profilePicture} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            ),
            text: "Profile"
        },
        { icon: <LogOut />, text: "Logout" },
    ];

    return (
        <div className='fixed top-0 left-0 w-[20%] h-full border-r border-gray-300 bg-white z-10'>
            <div className='flex flex-col h-full'>
                <h1 className='my-8 pl-3 font-bold text-xl'>LOGO</h1>
                <div>
                    {
                        sidebarItems.map((item, index) => (
                            <div 
                                onClick={() => sidebarHandler(item.text)} 
                                key={index} 
                                className='flex items-center gap-3 hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3'
                            >
                                {item.icon}
                                <span>{item.text}</span>
                            </div>
                        ))
                    }
                </div>
            </div>

            <CreatePost open={open} setOpen={setOpen} />
        </div>
    );
}

export default LeftSidebar;

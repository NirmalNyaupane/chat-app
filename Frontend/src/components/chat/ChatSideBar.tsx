'use client'
import React from 'react'
import { Input } from '../ui/input';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import "../../style/customscrollbar.css"
import Link from 'next/link';

const ChatSideBar = () => {
    return (
        <div className='w-[300px] space-y-3 h-[100vh] px-3'>
            <h1 className='text-2xl font-bold ml-2'>Chats</h1>
            <div className={cn(`flex items-center rounded-md px-3 border py-0 h-fit ml-2`)}>
                <Search className={`mr-2 h-4 w-4 shrink-0}`}/>
                <Input
                    placeholder="search user"
                    className="flex w-full bg-transparent text-sm outline-none border-none focus:outline-none 
                               focus:border-none focus-visible:ring-0 py-0"
                />
            </div>


            <div className='space-y-5 h-[90vh] overflow-y-auto'>
                {
                    Array(10).fill(0).map((_, ind) => {
                        return <Link href={`/chat/${(ind + 34) * 3}`} className='side-nav-items flex gap-2 items-center p-2 rounded-md cursor-pointer hover:bg-gray-200' key={(ind + 34) * 3}>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className='flex justify-between'>
                                    <h2 className='font-bold'>Nirmal Neupane</h2>
                                    <span className='text-gray-500'>2 days</span>
                                </div>
                                <p className="line-clamp-1 text-gray-500">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit vitae impedit mollitia architecto ipsam. Totam quod distinctio officia voluptas corporis aut tempora inventore
                                    sit doloremque placeat aperiam, quasi, eligendi eum!</p>
                            </div>
                        </Link>
                    })
                }

            </div>
        </div>
    )
}

export default ChatSideBar;
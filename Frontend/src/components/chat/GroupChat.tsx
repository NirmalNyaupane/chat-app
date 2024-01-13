"use client"
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuCheckboxItem } from '../ui/dropdown-menu';
import React, { useState } from 'react'
import { BsPeople } from 'react-icons/bs'
import { InputField } from '../common/InputField'
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { Input } from '../ui/input';

const GroupChat = () => {
    const [isFoucs, setFocus] = useState(false);
    return (
        <div><DropdownMenu>
            <DropdownMenuTrigger><span><BsPeople /></span></DropdownMenuTrigger>
            <DropdownMenuContent className='px-4 space-y-2'>
                <h2 className='text-lg font-bold'>New Group</h2>
                <div
                    className={cn(`flex items-center rounded-2xl px-3 border`, { "bg-white": isFoucs })}
                >
                    <Search
                        className={`mr-2 h-4 w-4 shrink-0`}
                    />
                    <Input
                        placeholder="search name or email"
                        className="flex w-full rounded-md bg-transparent text-sm outline-none border-none 
            focus:outline-none focus:border-none focus-visible:ring-0"
                        onFocus={() => setFocus((prev) => !prev)}
                        onBlur={() => setFocus((prev) => !prev)}
                    />
                </div>
                <div className='flex justify-between gap-1'>
                    <button className='w-[50%] bg-green-500 py-1 text-white rounded-md hover:bg-green-400'>Next</button>
                    <button className='w-[50%] bg-white py-1 text-black border rounded-md'>Cancel</button>
                </div>


                {/* users name field */}
                <div>
                    <DropdownMenuItem className='flex gap-4'>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p className=' font-medium '>Nirmal Neupane</p>
                        <DropdownMenuCheckboxItem checked={true} />
                    </DropdownMenuItem>

                    <DropdownMenuItem className='flex gap-4'>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p className=' font-medium '>Nirmal Neupane</p>
                        <DropdownMenuCheckboxItem checked={true} />
                    </DropdownMenuItem>

                    <DropdownMenuItem className='flex gap-4'>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p className=' font-medium '>Nirmal Neupane</p>
                        <DropdownMenuCheckboxItem checked={true} />
                    </DropdownMenuItem>

                    <DropdownMenuItem className='flex gap-4'>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p className=' font-medium '>Nirmal Neupane</p>
                        <DropdownMenuCheckboxItem checked={true} />
                    </DropdownMenuItem>

                    <DropdownMenuItem className='flex gap-4'>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p className=' font-medium '>Nirmal Neupane</p>
                        <DropdownMenuCheckboxItem checked={true} />
                    </DropdownMenuItem>

                    <DropdownMenuItem className='flex gap-4'>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p className=' font-medium '>Nirmal Neupane</p>
                        <DropdownMenuCheckboxItem checked={true} />
                    </DropdownMenuItem>


                </div>
            </DropdownMenuContent>
        </DropdownMenu></div>
    )
}

export default GroupChat
'use client'
import { cn } from '@/lib/utils';
import { getAllChats } from '@/service/chat/chat.service';
import { findDifferenceTime } from '@/utils/helper';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import "../../style/customscrollbar.css";
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Input } from '../ui/input';
import GroupChat from './GroupChat';
const ChatSideBar = () => {
    const pathname = usePathname();
    const url = pathname.split("/");

    const {
        isFetchingNextPage,
        isFetchingPreviousPage,
        isFetching,
        data,
    } = useInfiniteQuery({
        queryKey: ["get-all-chats"],
        queryFn: ({ pageParam }) => getAllChats({ page: pageParam, limit: 10 }),
        initialPageParam: 1,
        refetchOnMount: false,
        getNextPageParam: (lastPage) => {
            return lastPage.data.lastPage
        },
        getPreviousPageParam: (firstPage) =>
            firstPage.data.prevPage
    })

    if (isFetching || isFetchingNextPage || isFetchingPreviousPage) {
        return <p>Loading.......</p>
    }

    return (
        <div className='w-[300px] space-y-3 h-[100vh] px-3'>
            <div className='flex items-center justify-between'>
                <h1 className='text-2xl font-bold ml-2'>Chats</h1>
                <GroupChat />
            </div>
            <div className={cn(`flex items-center rounded-md px-3 border py-0 h-fit ml-2`)}>
                <Search className={`mr-2 h-4 w-4 shrink-0}`} />
                <Input
                    placeholder="search user"
                    className="flex w-full bg-transparent text-sm outline-none border-none focus:outline-none 
                               focus:border-none focus-visible:ring-0 py-0"
                />
            </div>


            <div className='space-y-5 h-[90vh] overflow-y-auto'>
                {
                    data?.pages?.map((page): React.ReactNode => {
                        return page.data.data.map((chat) => {
                            return <Link href={`/chat/${chat.id}`} className={cn('side-nav-items flex gap-2 items-center p-2 w-full rounded-md cursor-pointer hover:bg-gray-200', {
                                "bg-gray-200": url.includes(chat.id)
                            })} key={chat.id}>
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className='flex justify-between'>
                                        <h2 className='font-bold w-fit gap-2'>{chat?.name}</h2>
                                        {/* todo: calculate the date */}
                                        {
                                            chat?.lastMessage?.createdAt &&
                                            <div className='text-gray-500'>{findDifferenceTime(chat.lastMessage.createdAt)}</div>
                                        }
                                    </div>
                                    <p className="line-clamp-1 text-gray-500">{chat?.lastMessage?.content ?? "Now you are join on chat tak"}</p>
                                </div>
                            </Link>
                        })
                    })
                }

            </div>
        </div>
    )
}

export default ChatSideBar;
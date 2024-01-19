'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import useCustomToast from '@/hooks/useToast';
import { cn } from '@/lib/utils';
import { getChatMessage, sendMessageApi } from '@/service/message/message.service';
import { showError } from '@/utils/helper';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Image as ImageIcon, Info, Mic, Phone, SendHorizontal, Smile, Video } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState, KeyboardEvent } from 'react';
import { useForm } from 'react-hook-form';
const MessagePage = () => {
    const [isInfoOpen, setInfoOpen] = useState(false);
    const { currentUser } = useAuth();
    const { id: chatId } = useParams();
    const { register, getValues, setValue, reset } = useForm({
        defaultValues: {
            content: ""
        }
    });

    const toast = useCustomToast();

    const {
        isFetchingNextPage,
        isFetchingPreviousPage,
        isFetching,
        data,
    } = useInfiniteQuery({
        queryKey: ["get-all-chats-message", chatId],
        queryFn: ({ pageParam }) => getChatMessage({ page: pageParam, limit: 10, chatId: chatId as string }),
        initialPageParam: 1,
        refetchOnMount: false,
        getNextPageParam: (lastPage) => {
            return lastPage.data.lastPage
        },
        getPreviousPageParam: (firstPage) =>
            firstPage.data.prevPage
    })


    const { mutate, isPending } = useMutation({
        mutationFn: async (data: string) => {
            return sendMessageApi({
                chatId: chatId as string,
                content: data
            })
        },
        onSuccess: () => {
            reset();
        },
        onError(error: AxiosError<any, any>) {
            toast.error(showError(error))
        },
    })


    const handleOnSend = () => {
        const content = getValues("content");
        if (!content) return;
        mutate(content);
    }


    const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleOnSend()
        }
    }

    if (isFetching || isFetchingNextPage || isFetchingPreviousPage) {
        return <p>Loading.......</p>
    }



    return (
        <>
            {/* Chat container */}
            <div className='h-[100vh] overflow-y-hidden mr-2 flex-1'>

                {/* Chat top section includig profile picture, voice-video call and info */}
                <div className='gap-3 items-center flex border-b py-1 relative'>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span className='h-[10px] w-[10px] bg-green-500 rounded-full absolute left-[30px] top-[29px]'></span>
                    <h2 className='text-bold'>Nirmal Neupane</h2>

                    <div className='text-green-500 flex gap-5 ml-auto'>
                        <Phone />
                        <Video />
                        <Info className={cn(`cursor-pointer transition-all delay-75`, {
                            "fill-green-500 text-white": isInfoOpen
                        })} onClick={() => setInfoOpen(!isInfoOpen)} />
                    </div>
                </div>

                {/* Only message section */}
                <div className='h-[83dvh] w-[100%] flex flex-col-reverse overflow-y-auto main-page pr-2 mt-3'>
                    {
                        data?.pages?.map((page): React.ReactNode => {
                            return page.data.data.map((message) => {
                                if (message?.sender?.id === currentUser?.id) {
                                    return (
                                        <div key={message.id} className='flex justify-end my-1'>
                                            <div className='side-nav-items w-fit py-3 px-3 max-w-[40%] bg-green-200 rounded-lg text-sm'>{message.content}</div>
                                        </div>

                                    )
                                } else {
                                    return (
                                        <div key={message.id} className='flex items-center gap-1 my-1'>

                                            <div className='relative'>

                                                <Avatar role="img" className='h-[30px] w-[30px] '>
                                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                                    <AvatarFallback>CN</AvatarFallback>
                                                </Avatar>
                                                <span className='h-[10px] w-[10px] bg-green-500 rounded-full absolute left-[22px] top-[17px]'></span>
                                            </div>

                                            <div className='side-nav-items w-fit py-3 px-3 max-w-[40%] bg-gray-200 rounded-lg text-sm'>{message.content}</div>
                                        </div>
                                    )

                                }
                            })
                        })
                    }
                </div>

                {/* Chat input section (buttom of chat) */}
                <div className='gap-3 items-center flex py-2'>
                    <ImageIcon className='text-green-500 text-2xl' />
                    <Mic className='text-green-500 text-2xl' />
                    <Smile className='text-green-500 text-2xl' />
                    {/* <EmojiPicker /> */}
                    <Input className='w-[80%]' {...register("content")} onKeyDown={handleEnter} />
                    <Button className='bg-transparent hover:bg-transparent' disabled={isPending}><SendHorizontal className='text-green-500 ml-auto' onClick={handleOnSend} /></Button>
                </div>
            </div>

            {/* Drawer open only when user clicks on info button */}
            <div className={cn(`w-[20%] flex flex-col items-center my-2 max-w-0 overflow-x-hidden transition-all delay-75`, {
                "max-w-[20%]": isInfoOpen
            })}>
                <div className='flex flex-col items-center gap-2'>
                    <Image src={"https://github.com/shadcn.png"} alt='profile' width={100} height={100} className='rounded-full' />
                    <h2 className='font-bold text-2xl'>Nirmal Neupane</h2>
                </div>
            </div>
        </>

    )
}

export default MessagePage
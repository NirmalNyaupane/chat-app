'use client';
import { InputField } from '@/components/common/InputField'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils';
import { Image as ImageIcon, Info, Mic, Phone, SendHorizontal, Smile, Video } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react';

const messageSample = [
    {
        message: "Hello",
        isSelf: true,
    },
    {
        message: "Hello oejr owoiejr owroie eojreor jweojweoijr weor ewiorjwe or",
        isSelf: false,
        avatar: "https://github.com/shadcn.png"
    },
    {
        message: "Hello",
        isSelf: true,
    },
    {
        message: "Hello oejr owoiejr owroie eojreor jweojweoijr weor ewiorjwe or",
        isSelf: false,
        avatar: "https://github.com/shadcn.png"
    },
    {
        message: "Hello",
        isSelf: true,
    },
    {
        message: "Hello oejr owoiejr owroie eojreor jweojweoijr weor ewiorjwe or owierjw erjw owrwoirwo worjw rjwor worworjs",
        isSelf: false,
        avatar: "https://github.com/shadcn.png"
    },
    {
        message: "Hello",
        isSelf: true,
    },
    {
        message: "Hello oejr owoiejr owroie eojreor jweojweoijr weor ewiorjwe or",
        isSelf: false,
        avatar: "https://github.com/shadcn.png"
    },
    {
        message: "Hello",
        isSelf: true,
    },
    {
        message: "Hello oejr owoiejr owroie eojreor jweojweoijr weor ewiorjwe or",
        isSelf: false,
        avatar: "https://github.com/shadcn.png"
    },
    {
        message: "Hello",
        isSelf: true,
    },
    {
        message: "Hello oejr owoiejr owroie eojreor jweojweoijr weor ewiorjwe or",
        isSelf: false,
        avatar: "https://github.com/shadcn.png"
    },
    {
        message: "Hello",
        isSelf: true,
    },
    {
        message: "Hello oejr owoiejr owroie eojreor jweojweoijr weor ewiorjwe or",
        isSelf: true,
        avatar: "https://github.com/shadcn.png"
    },
    {
        message: "Hello pojo ire ewroe oiewj rwo jwew rjewiorrewo rwoirw oriwj owowierjw ofoiwejrr",
        isSelf: false,
    },
    {
        message: "Hello oejr owoiejr owroie eojreor jweojweoijr weor ewiorjwe or",
        isSelf: false,
        avatar: "https://github.com/shadcn.png"
    }
]

const MessagePage = () => {
    const [isInfoOpen, setInfoOpen] = useState(false);
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
                <div className='h-[83dvh] w-[100%] flex flex-col-reverse overflow-y-auto main-page pr-2 space-y-1 mt-3'>
                    {
                        messageSample.map((message, index) => {
                            if (message.isSelf) {
                                return (
                                    <div key={(index + 10) * 10} className='flex justify-end'>
                                        <div className='side-nav-items w-fit py-3 px-3 max-w-[40%] bg-green-200 rounded-lg text-sm'>{message.message}</div>
                                    </div>

                                )
                            } else {
                                return (
                                    <div key={(index + 10) * 10} className='flex items-center gap-1'>

                                        <div className='relative'>

                                            <Avatar role="img" className='h-[30px] w-[30px] '>
                                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                            <span className='h-[10px] w-[10px] bg-green-500 rounded-full absolute left-[22px] top-[17px]'></span>
                                        </div>

                                        <div className='side-nav-items w-fit py-3 px-3 max-w-[40%] bg-gray-200 rounded-lg text-sm'>{message.message}</div>
                                    </div>
                                )

                            }
                        })
                    }
                </div>

                {/* Chat input section (buttom of chat) */}
                <div className='gap-3 items-center flex py-2'>
                    <ImageIcon className='text-green-500 text-2xl' />
                    <Mic className='text-green-500 text-2xl' />
                    <Smile className='text-green-500 text-2xl' />
                    <Input className='w-[80%]' />
                    <SendHorizontal className='text-green-500 ml-auto' />
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
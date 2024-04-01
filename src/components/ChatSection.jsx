import React from 'react'

const ChatSection = () => {
    return (
        <div className='bg-white h-full rounded-xl shadow-md p-5 md:p-10'>
            <h2 className="mb-10 text-3xl font-inter font-semibold text-black">
                Chats
            </h2>
            <div className='flex  gap-5'>
                <div className=''>
                    <img src="/src/images/user/user-01.png" alt="" width={50} height={50} />
                </div>
                <div className='flex flex-col w-full gap-3'>
                    <div className='w-full'>
                        <input className='h-10 w-full  border border-black text-black px-5 rounded-xl' type="text" placeholder='Add Comment' />
                    </div>
                    <div className='flex gap-3'>
                        <button className='bg-[#0C356A] text-base text-white px-5 py-2 rounded-md'>Comment</button>
                        <button className='bg-[#0C356A] text-base text-white px-5 py-2 rounded-md'>Cancel</button>
                    </div>

                </div>
            </div>
            <div className='flex flex-col rounded-md h-100 mt-8 gap-3 overflow-scroll overflow-x-hidden '>
                <div className='flex gap-5'>
                    <div className=''>
                        <img src="/src/images/user/user-01.png" alt="" width={50} height={50} />
                    </div>
                    <div className='flex-col w-full gap-2'>
                        <h2 className='text-base text-black font-semibold'>@username</h2>
                        <h2 className='text-base text-black '>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</h2>
                    </div>
                </div>
                <div className='flex gap-5'>
                    <div className=''>
                        <img src="/src/images/user/user-01.png" alt="" width={50} height={50} />
                    </div>
                    <div className='flex-col w-full gap-2'>
                        <h2 className='text-base text-black font-semibold'>@username</h2>
                        <h2 className='text-base text-black '>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</h2>
                    </div>
                </div>
                <div className='flex gap-5'>
                    <div className=''>
                        <img src="/src/images/user/user-01.png" alt="" width={50} height={50} />
                    </div>
                    <div className='flex-col w-full gap-2'>
                        <h2 className='text-base text-black font-semibold'>@username</h2>
                        <h2 className='text-base text-black '>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</h2>
                    </div>
                </div>
                <div className='flex gap-5'>
                    <div className=''>
                        <img src="/src/images/user/user-01.png" alt="" width={50} height={50} />
                    </div>
                    <div className='flex-col w-full gap-2'>
                        <h2 className='text-base text-black font-semibold'>@username</h2>
                        <h2 className='text-base text-black '>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</h2>
                    </div>
                </div>
                <div className='flex gap-5'>
                    <div className=''>
                        <img src="/src/images/user/user-01.png" alt="" width={50} height={50} />
                    </div>
                    <div className='flex-col w-full gap-2'>
                        <h2 className='text-base text-black font-semibold'>@username</h2>
                        <h2 className='text-base text-black '>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatSection

import React, { useState, useEffect, useRef } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IoMdRefreshCircle } from 'react-icons/io';

import { BASEURL } from '../Api';
import axios from 'axios';
import { MdDelete } from 'react-icons/md';

const ChatSection = () => {
  const { id } = useParams();
  const groupId = id;
  const [chatDes, setChatDes] = useState('');
  const [chat, setChat] = useState([]);
  const currentUser = useSelector((state) => state.user);
  const chatContainerRef = useRef(null);

  const handleChange = (e) => {
    setChatDes(e.target.value);
  };

  const handleSubmitMsg = async (e) => {
    e.preventDefault();
    try {
      const chatMessage = {
        description: chatDes,
        senderEmail: currentUser.userData.email,
        senderName: currentUser.userData.name,
        groupId: groupId,
      };

      const chatMsgResponse = await axios.post(
        `${BASEURL}/chat/add/groupId`,
        chatMessage
      );

      console.log('Chat Added Successfully', chatMsgResponse.data);
      fetchChat();
      setChatDes('');
      scrollToBottom();
    } catch (error) {
      console.error('Error adding chat:', error);
      throw error;
    }
  };

  const fetchChat = async () => {
    try {
      const response = await axios.get(
        `${BASEURL}/chat/get/groupId/${groupId}`
      );
      console.log(response.data.data);
      setChat(response.data.data);
    } catch (error) {
      console.log('Error fetching Project', error);
    }
  };

  const handleRefreshChat = () => {
    fetchChat(); // Call fetchChat to refresh the chats
  };

  const handleChatDelete = async (chatId, senderEmail) => {
    try {
      if (currentUser.userData.email !== senderEmail) {
        Toastify({
          text: 'You are not authorized',
          duration: 1800,
          gravity: 'top',
          position: 'right',
          stopOnFocus: true,
          style: {
            background: 'linear-gradient(to right, #FF6B6B, #FF6B6B)',
            padding: '10px 50px',
          },
        }).showToast();
        return;
      }

      const response = await axios.delete(`${BASEURL}/chat/del/${chatId}`);
      if (response.status === 200) {
        Toastify({
          text: 'Chat Deleted',
          duration: 1800,
          gravity: 'top',
          position: 'right',
          stopOnFocus: true,
          style: {
            background: 'linear-gradient(to right, #3C50E0, #3C50E0',
            padding: '10px 50px',
          },
        }).showToast();
        fetchChat(); // Fetch chat again after deleting
      } else {
        throw new Error('Failed to delete chat');
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
      Toastify({
        text: 'Error deleting chat',
        duration: 1800,
        gravity: 'top',
        position: 'right',
        stopOnFocus: true,
        style: {
          background: 'linear-gradient(to right, #FF6B6B, #FF6B6B)',
          padding: '10px 50px',
        },
      }).showToast();
    }
  };

  const scrollToBottom = () => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  useEffect(() => {
    if (groupId) {
      fetchChat();
    }
  }, [groupId]);

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  return (
    <div className="h-full gap-2 rounded-xl bg-white p-5 shadow-md  dark:bg-boxdark ">
      <div className="">
        <div className="flex  gap-5">
          <div className="">
            <img
              src="/src/images/user/user-01.png"
              alt=""
              width={50}
              height={50}
            />
          </div>
          <div className="flex w-full flex-col gap-3 md:flex-row">
            <div className="w-full ">
              <input
                className="h-10 w-full  rounded-xl border border-black px-5 text-black  "
                type="text"
                onChange={handleChange}
                name="description"
                value={chatDes}
                placeholder="Add Comment"
              />
            </div>
            <div className="flex items-center gap-2">
              <div>
                <button
                  className="rounded-md bg-[#0C356A] px-3 py-2  text-base text-white hover:bg-[#0C356A]/90  "
                  onClick={handleSubmitMsg}
                >
                  Comment
                </button>
              </div>
              <div>
                {' '}
                <button
                  className="rounded-md bg-[#0C356A] px-3 py-1 text-base text-white hover:bg-[#0C356A]/90"
                  onClick={handleRefreshChat}
                >
                  <IoMdRefreshCircle className="text-3xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        ref={chatContainerRef}
        className={`mt-8 flex h-100 flex-col gap-1 overflow-scroll overflow-x-hidden rounded-md ${
          chat.length > 0 && 'mx-15` pb-[13rem]' // Applying paddingBottom if chat array is not empty
        }`}
      >
        {chat.map((data, index) => (
          <div key={index} className="m-3 flex gap-5 bg-black/10 p-4 dark:border dark:border-white/20 dark:shadow-lg dark:shadow-white/20">
            <div className="">
              <img src="/user-01.png" alt="" width={50} height={50} />
            </div>
            <div className="w-full flex-col gap-2">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-black hover:cursor-pointer dark:text-white">
                  @{data.senderName}
                </h2>
                <span className="text-gray-500 text-sm">
                  {`${new Date(data.createdAt).toLocaleDateString(
                    'en-GB'
                  )} ${new Date(data.createdAt).getHours()}:${new Date(
                    data.createdAt
                  ).getMinutes()}`}
                </span>
              </div>
              <div>
                <h2 className="text-base text-black dark:text-white ">
                  {data.description}
                </h2>
                <div className="flex items-center justify-end">
                  <button
                    className="rounded bg-[#0C356A] p-1 text-base text-white hover:bg-[#0C356A]/80"
                    onClick={() => handleChatDelete(data._id, data.senderEmail)}
                  >
                    <MdDelete className="text-lg" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSection;

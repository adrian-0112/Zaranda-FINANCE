
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';
import { UserIcon } from './icons/UserIcon';

type Message = {
    sender: 'user' | 'bot';
    text: string;
};

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
    const isBot = message.sender === 'bot';

    return (
        <div className={`flex items-start gap-3 w-full ${!isBot && 'justify-end'}`}>
             {isBot && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-green-500">
                    <SparklesIcon className="w-5 h-5 text-white" />
                </div>
            )}
            <div className={`p-3 rounded-2xl max-w-[80%] text-white ${isBot ? 'bg-gray-700 rounded-bl-none' : 'bg-blue-600 rounded-br-none'}`}>
                <p className="text-sm leading-relaxed">{message.text}</p>
            </div>
             {!isBot && (
                 <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-500">
                    <UserIcon className="w-5 h-5 text-white" />
                </div>
            )}
        </div>
    );
};

export default ChatMessage;

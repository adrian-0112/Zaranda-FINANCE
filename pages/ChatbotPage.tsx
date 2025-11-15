import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Modality } from "@google/genai";
import { CloseIcon } from '../components/icons/CloseIcon';
import { PaperAirplaneIcon } from '../components/icons/PaperAirplaneIcon';
import ChatMessage from '../components/ChatMessage';

interface ChatbotPageProps {
  onBack: () => void;
}

type Message = {
    sender: 'user' | 'bot';
    text: string;
};

// Audio decoding helpers
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}


const LoadingIndicator: React.FC = () => (
    <div className="flex items-center space-x-1.5">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
    </div>
);


const ChatbotPage: React.FC<ChatbotPageProps> = ({ onBack }) => {
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'bot', text: "Hello! I'm Zaranda's AI assistant. I can help you with questions about how to send money, check your balance, or use any feature. How can I help you today?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const audioContextRef = useRef<AudioContext | null>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const playAudio = async (text: string) => {
        try {
            if (!audioContextRef.current) {
                // FIX: Cast window to `any` to access `webkitAudioContext` for broader browser compatibility.
                const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
                if (AudioContext) {
                    audioContextRef.current = new AudioContext({ sampleRate: 24000 });
                } else {
                    console.error("AudioContext is not supported in this browser.");
                    return;
                }
            }
            const outputAudioContext = audioContextRef.current;
            if (!outputAudioContext) return;
            
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash-preview-tts",
                contents: [{ parts: [{ text: text }] }],
                config: {
                    responseModalities: [Modality.AUDIO],
                    speechConfig: {
                        voiceConfig: {
                            prebuiltVoiceConfig: { voiceName: 'Kore' },
                        },
                    },
                },
            });
            
            const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
            if (base64Audio) {
                const audioBuffer = await decodeAudioData(
                    decode(base64Audio),
                    outputAudioContext,
                    24000,
                    1,
                );
                const source = outputAudioContext.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(outputAudioContext.destination);
                source.start();
            }
        } catch (error) {
            console.error("Error generating or playing audio:", error);
        }
    };

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim() || isLoading) return;

        const newUserMessage: Message = { sender: 'user', text: input };
        const updatedMessages = [...messages, newUserMessage];
        setMessages(updatedMessages);
        setInput('');
        setIsLoading(true);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            const systemInstruction = "You are a helpful and friendly AI assistant for the Zaranda dApp. Zaranda is a non-custodial, low-cost, and instantaneous remittance channel between the US and Mexico. Your goal is to guide users on how to use the app's features. Be concise and provide clear, step-by-step instructions. Do not invent features that don't exist. Key features you should know about:\n- Sending money: Users tap the large green 'Send' button in the bottom navigation bar, then select 'Send'.\n- Receiving/Adding funds: Users tap the large green 'Send' button in the bottom navigation bar, then select 'Receive'. Options include USDT transfer, U.S. dollar transfer (ACH/Wire), and SPEI transfer.\n- Swapping currencies (USDT <> MXNB): Users can tap the 'Swap' button on the homepage, below their balance.\n- Viewing transactions: Users can tap the 'Transactions' button on the homepage.\n- Viewing account details: Users can tap their user icon/avatar in the top-left of the homepage.\n- Viewing exchange rate history: Users can tap the exchange rate card on the homepage.";

            const history = updatedMessages.slice(1).map(msg => ({
                role: msg.sender === 'user' ? 'user' : 'model',
                parts: [{ text: msg.text }]
            }));

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: history,
                config: {
                    systemInstruction: systemInstruction,
                },
            });

            const botResponseText = response.text;
            const botResponse: Message = { sender: 'bot', text: botResponseText };
            setMessages(prev => [...prev, botResponse]);

            await playAudio(botResponseText);

        } catch (error) {
            console.error("Error calling Gemini API:", error);
            const errorMessage: Message = { sender: 'bot', text: "Sorry, I'm having trouble connecting right now. Please try again later." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-gray-900 text-white">
            <header className="flex-shrink-0 p-4 flex items-center justify-center relative border-b border-white/10">
                <h1 className="font-bold text-lg">Support Chat</h1>
                <button 
                  onClick={onBack} 
                  className="p-2 text-gray-400 hover:bg-white/10 rounded-full absolute right-4" 
                  aria-label="Close"
                >
                    <CloseIcon className="w-6 h-6" />
                </button>
            </header>
            
            <main className="flex-1 overflow-y-auto no-scrollbar p-4">
                <div className="space-y-6">
                    {messages.map((msg, index) => (
                        <div key={index}>
                           <ChatMessage message={msg} />
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-start gap-3">
                             <div className="p-3 rounded-2xl bg-gray-700 rounded-bl-none">
                                <LoadingIndicator />
                             </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>
            </main>

            <footer className="p-4 bg-gray-900">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 bg-gray-700 text-white placeholder-gray-400 px-4 py-3 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                        autoComplete="off"
                        disabled={isLoading}
                    />
                    <button 
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className={`w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center transition-colors ${
                            input.trim() && !isLoading ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-500'
                        }`}
                        aria-label="Send message"
                    >
                        <PaperAirplaneIcon className="w-5 h-5" />
                    </button>
                </form>
            </footer>
        </div>
    );
};

export default ChatbotPage;
"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useAuthToken } from "@convex-dev/auth/react";
import { Bot, Expand, Minimize, Send, Trash, X } from "lucide-react";
import { useRef, useState } from "react";
import { useChat } from '@ai-sdk/react';
import {
    DefaultChatTransport,
} from 'ai';

const convexSiteURL = process.env.NEXT_PUBLIC_CONVEX_URL?.replace(/.cloud$/, ".site");

interface AIChatBoxProps {
    open: boolean;
    onClose: () => void;
}

function AIChatBox({ open, onClose }: AIChatBoxProps) {
    const [inputMessage, setInputMessage] = useState<string>("");
    const [isExpanded, setIsExpanded] = useState(false);

    const token = useAuthToken();

    const {sendMessage, messages} = useChat({
        transport: new DefaultChatTransport({
            api: `${convexSiteURL}/api/chat`,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    })

    const messagesEndRef = useRef<HTMLDivElement>(null);
    function onSubmitHandle(e: React.FormEvent) {
        e.preventDefault();
        if (inputMessage.trim()) {
            sendMessage({ text: inputMessage });
            setInputMessage("");
        }
    }

    if (!open) return null;

    return (
        <div
            className={cn(
                "animate-in slide-in-from-bottom-10 bg-card fixed right-4 bottom-4 z-50 flex flex-col rounded-lg border shadow-lg duration-300 2xl:right-16",
                isExpanded
                    ? "h-[650px] max-h-[90vh] w-[550px]"
                    : "h-[500px] max-h-[80vh] w-80 sm:w-96"
            )}
        >
            <div className="bg-primary text-primary-foreground flex items-center justify-between rounded-t-lg border-b p-3">
                <div className="flex items-center gap-2">
                    <Bot size={18} />
                    <h3 className="font-medium">Notes Assistant</h3>
                </div>
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-primary-foreground hover:bg-primary/90 h-8 w-8"
                        title={isExpanded ? "Minimize" : "Expand"}
                    >
                        {isExpanded ? <Minimize /> : <Expand />}
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => { }}
                        className="text-primary-foreground hover:bg-primary/90 h-8 w-8"
                        title="Clear chat"
                    >
                        <Trash />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="text-primary-foreground hover:bg-primary/90 h-8 w-8"
                    >
                        <X className="size-4" />
                    </Button>
                </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-3">
                {messages.map((message) => {
                    return (
                        <p key={message.id}>{JSON.stringify(message)}</p>
                    )
                })}
                {/* TODO: Render messages here */}
                <div ref={messagesEndRef} />
            </div>

            <form className="flex gap-2 border-t p-3" onSubmit={onSubmitHandle}>
                <Textarea
                    value={inputMessage}
                    onChange={e => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="max-h-[120px] min-h-10 resize-none overflow-y-auto"
                    maxLength={1000}
                    autoFocus
                />
                <Button type="submit" size="icon">
                    <Send className="size-4" />
                </Button>
            </form>
        </div>
    );
}

export default AIChatBox;
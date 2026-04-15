// src/components/aiAssistant.tsx
import React, { useState } from "react";

interface Message {
    sender: "user" | "ai";
    text: string;
}

export const AIAssistant: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [input, setInput] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([
        {
            sender: "ai",
            text: "Hello! I can help you generate SEO meta tags, optimize keyword densities, or write backlink outreach emails. What are we optimizing today?",
        },
    ]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg: Message = { sender: "user", text: input };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");

        // Simulate AI optimization response processing pipeline
        setTimeout(() => {
            const aiMsg: Message = {
                sender: "ai",
                text: `Here is a structural recommendation for your prompt "${userMsg.text}": Ensure your primary keyword is placed in the H1 tag, within the first 100 words of text, and inside your meta description to maximize visibility.`,
            };
            setMessages((prev) => [...prev, aiMsg]);
        }, 800);
    };

    return (
        <>
            {/* Floating Toggle Button Trigger */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-600 text-white shadow-2xl transition-transform hover:scale-105 active:scale-95 dark:bg-cyan-500 dark:text-slate-950">
                {isOpen ? (
                    <span className="text-xl">✕</span>
                ) : (
                    <span className="text-xl">✨</span>
                )}
            </button>

            {/* Slide-out Drawer Panel Canvas */}
            <div
                className={`fixed bottom-24 right-6 z-50 flex h-125 w-80 flex-col rounded-2xl border border-slate-200 bg-white shadow-2xl transition-all duration-300 dark:border-slate-800 dark:bg-slate-800 ${
                    isOpen
                        ? "translate-y-0 opacity-100"
                        : "translate-y-12 opacity-0 pointer-events-none"
                }`}>
                {/* Panel Drawer Header */}
                <div className="flex items-center space-x-2 border-b border-slate-100 p-4 dark:border-slate-700">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-cyan-500 text-xs font-bold text-slate-950">
                        AI
                    </div>
                    <h3 className="text-sm font-bold tracking-tight">
                        Optimization Copilot
                    </h3>
                </div>

                {/* Scrollable Message History Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex flex-col ${
                                msg.sender === "user"
                                    ? "items-end"
                                    : "items-start"
                            }`}>
                            <div
                                className={`max-w-[85%] rounded-xl px-3.5 py-2 text-xs leading-relaxed ${
                                    msg.sender === "user"
                                        ? "bg-cyan-600 text-white dark:bg-cyan-500 dark:text-slate-950"
                                        : "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-300"
                                }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Chat Control Input Bar */}
                <form
                    onSubmit={handleSendMessage}
                    className="border-t border-slate-100 p-3 dark:border-slate-700 flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask AI Copilot for advice..."
                        className="flex-1 rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-900"
                    />
                    <button
                        type="submit"
                        className="rounded-lg bg-slate-900 px-3 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200">
                        Send
                    </button>
                </form>
            </div>
        </>
    );
};

export default AIAssistant;

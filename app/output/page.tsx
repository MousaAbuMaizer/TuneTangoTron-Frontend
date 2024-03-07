'use client';
import { useState } from 'react';
import Image from 'next/image';
import { LuFileJson } from "react-icons/lu";

export default function Output() {
    return (
        <div className="relative h-screen overflow-hidden bg-primary flex justify-center items-center">
            <div className="absolute top-0 left-0 right-0 bg-white py-4 px-6">
                <div className="max-w-screen-xl mx-auto flex items-center">
                    <Image
                        src="/PricewaterhouseCoopers_Logo.png"
                        alt="PwC Logo"
                        width={100}
                        height={50}
                        className="mr-4"
                    />
                </div>
            </div>
            <div className="bg-white/10 p-6 rounded-lg shadow-xl w-96 flex flex-col items-center justify-center space-y-4"> {/* Set width to 96 (24rem) */}
                <h2 className="text-white text-2xl font-bold text-center">Your File Is Ready</h2>
                <button className="bg-secondary text-white rounded-md p-4 text-lg flex items-center justify-center hover:bg-accent">
                    <LuFileJson className="mr-2 text-2xl" /> Click To Download
                </button>
            </div>
        </div>
    );    
}

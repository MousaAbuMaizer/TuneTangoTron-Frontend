'use client';
import { squircle } from 'ldrs'
import { useState } from 'react';
import Image from 'next/image';

squircle.register()

export default function Loading() {
    return (
        <div className="relative h-screen overflow-hidden bg-primary flex justify-center items-center">
            {/* Header */}
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
            {/* Loader */}
            <div className="bg-white/10 p-6 rounded-lg shadow-xl w-96"> {/* Set width to 96 (24rem) */}
            <h2 className="text-white text-2xl font-bold mb-6 text-center">Generating The Data</h2>
            <div className="flex justify-center items-center">
                <l-squircle
                    size="37"
                    stroke="5"
                    stroke-length="0.15"
                    bg-opacity="0.1"
                    speed="0.9"
                    color="white">
                </l-squircle>
            </div>
            </div>
        </div>
    );    
}

'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { useRouter } from 'next/navigation'
import { squircle } from 'ldrs'

squircle.register()

export default function Main() {
    const [inputValue, setInputValue] = useState('');
    const [selectValue, setSelectValue] = useState('');
    const [rangeValue, setRangeValue] = useState(100);
    const [loading, setLoading] = useState(false);
    const [previewData, setPreviewData] = useState('');
    const [showPreview, setShowPreview] = useState(false);

    const router = useRouter()


    const handlePreview = async () => {
        setLoading(true);
        setShowPreview(true); 
    
        try {
            const response = await fetch('/api/preview', {
                method: 'POST',
                body: JSON.stringify({ inputValue, selectValue }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                const data = await response.json();
                setPreviewData(data);
            } else {
                throw new Error('Preview failed');
            }
        } catch (error) {
            console.error('There was an issue fetching the preview:', error);
        }
    
        setLoading(false);
    };

    const handleGenerate = async () => {
        // Navigate to the loading page first
        router.push('/loading');
    
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                body: JSON.stringify({ inputValue, selectValue, rangeValue }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error('Generate request failed');
            }
    
            // Handle the response if needed
            const data = await response.json();
    
            // Convert the data object to a query string
            const queryString = new URLSearchParams({ data: JSON.stringify(data) }).toString();
    
            // Navigate to the /output page after receiving the response
            router.push(`/output?${queryString}`);
        } catch (error) {
            console.error('There was an issue with the generate request:', error);
            // Handle error
        }
    };    
    
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
            {/* Main Content */}
            <div className={`flex ${showPreview ? 'flex-row' : 'flex-col'} pt-24 justify-center items-stretch gap-10`}>
                {/* Form */}
                <div className="bg-white/10 p-6 rounded-lg shadow-xl w-96"> {/* Set width to 96 (24rem) */}
                    <h2 className="text-white text-2xl font-bold mb-6 text-center">Choose Your Options</h2>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-400 mb-2">Topic</label>
                        <input
                            type="text"
                            id="username"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Historical Event..."
                            className="w-full px-4 py-2 border border-transparent rounded-md bg-primary text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="select" className="block text-gray-400 mb-2">Format</label>
                        <select
                            id="select"
                            value={selectValue}
                            onChange={(e) => setSelectValue(e.target.value)}
                            className="w-full px-4 py-2 border border-transparent rounded-md bg-primary text-white focus:outline-none focus:ring-2 focus:ring-secondary"
                        >
                            <option value="">Select An Option</option>
                            <option value="langchain">Default (LangChain Format)</option>
                            <option value="gpt">OpenAI GPT</option>
                        </select>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="slider" className="block text-gray-400 mb-2">Number Of Records</label>
                        <input
                            id="slider"
                            type="range"
                            min="5"
                            max="50"
                            step="5"
                            value={rangeValue}
                            onChange={(e) => setRangeValue(Number(e.target.value))}
                            className="w-full h-2 rounded-md cursor-pointer focus:outline-none"
                        />
                        <div className="text-white text-center mt-2">{rangeValue}</div>
                    </div>
                    <div className="gap-4  mb-4 ">
                    {/* <Link href="/loading" onClick={handleGenerate}> */}
                        <button onClick={handleGenerate} className="w-1/2 py-2 bg-secondary text-white rounded-md focus:outline-none hover:bg-accent">
                        Generate
                        </button>
                    {/* </Link> */}
                    <button onClick={handlePreview} className="w-2/4 py-2 bg-secondary text-white rounded-md focus:outline-none hover:bg-accent">
                        Preview
                    </button>
                    </div>
                </div>
                {showPreview && (
                <div className="bg-white/10 p-6 rounded-lg shadow-xl w-96">
                    <h2 className="text-white text-2xl font-bold mb-6 text-center">Preview</h2>
                    {loading ? (
                        <div className="flex justify-center items-center h-full">
                            <l-squircle
                                size="37"
                                stroke="5"
                                stroke-length="0.15"
                                bg-opacity="0.1"
                                speed="0.9" 
                                color="white" 
                            ></l-squircle>
                        </div>
                    ) : (
                        <div className="overflow-auto h-64">
                            <pre className="text-sm font-mono text-white">
                                {previewData}
                            </pre>
                        </div>
                    )}
                </div>
            )}
            </div>
        </div>
    );    
}    
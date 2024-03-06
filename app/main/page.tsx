'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function Main() {
    const [inputValue, setInputValue] = useState('');
    const [selectValue, setSelectValue] = useState('');
    const [rangeValue, setRangeValue] = useState(100);
    const [loading, setLoading] = useState(false);
    const [previewData, setPreviewData] = useState('');
    const [showPreview, setShowPreview] = useState(false);

    const handlePreview = async () => {
        setLoading(true);
        setShowPreview(true); // Show the preview area immediately
    
        try {
          // Simulate an API call
          const response = await fetch('/api/preview', {
            method: 'POST',
            body: JSON.stringify({ inputValue, selectValue, rangeValue }),
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
            <div className={`flex flex-row ${showPreview ? 'space-x-4' : ''} pt-24 justify-center`}>
                {/* Form */}
                <div className="bg-white/10 p-6 rounded-lg shadow-xl max-w-md w-full">
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
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </select>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="slider" className="block text-gray-400 mb-2">Number Of Records</label>
                        <input
                            id="slider"
                            type="range"
                            min="100"
                            max="1000"
                            step="100"
                            value={rangeValue}
                            onChange={(e) => setRangeValue(Number(e.target.value))}
                            className="w-full h-2 rounded-md cursor-pointer focus:outline-none"
                        />
                        <div className="text-white text-center mt-2">{rangeValue}</div>
                    </div>
                    <div className="flex gap-4 mb-4">
                        <button className="w-1/2 py-2 bg-secondary text-white rounded-md focus:outline-none hover:bg-accent">
                            Generate
                        </button>
                        <button onClick={handlePreview} className="w-1/2 py-2 bg-secondary text-white rounded-md focus:outline-none hover:bg-accent">
                            Preview
                        </button>
                    </div>
                </div>
                {showPreview && (
                    <div className="bg-white/10 p-6 rounded-lg shadow-xl max-w-md w-full transition-all duration-300">
                        <h2 className="text-white text-2xl font-bold mb-6 text-center">Preview</h2>
                        {loading ? (
                            <div className="flex justify-center items-center h-full">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
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

'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { squircle } from 'ldrs'
import useStore from '../../store/store';
import InputField from '../../components/InputField';

export default function Main() {
    const [inputValue, setInputValue] = useState<string>('');
    const [selectValue, setSelectValue] = useState<string>('');
    const [rangeValue, setRangeValue] = useState<number>(25);
    const [loading, setLoading] = useState<boolean>(false);
    const [previewData, setPreviewData] = useState<any>(''); 
    const [showPreview, setShowPreview] = useState<boolean>(false);
    const setDownloadLink = useStore((state: any) => state.setDownloadLink); 
    const [selectedOption, setSelectedOption] = useState<string>("langchain");
    const router = useRouter();
    
    const options = [
        { value: "langchain", label: "Default (LangChain Format)" },
        { value: "gpt", label: "OpenAI GPT" },
    ];
    const widthPercentage = 100 / options.length;

    useEffect(() => {
        if (typeof window !== "undefined") {
            import('ldrs').then(({ squircle }) => {
                squircle.register();
            });
        }
        }, []);
    

    const handlePreview = async () => {
        setLoading(true); 
    
        try {
            const response = await fetch('http://localhost:8000/api/v2/generate_data', {
                method: 'POST',
                body: JSON.stringify({ topic: inputValue }), 
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
        router.push('/loading');

        try {
            const response = await fetch('http://localhost:8000/api/v2/generate_data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ topic: inputValue, number_records: rangeValue }),
            });

            if (!response.ok) {
                throw new Error('Generate request failed');
            }

            const result = await response.json();
            const downloadLink = result.url;
            setDownloadLink(downloadLink);
            router.push(`/output`);
        } catch (error) {
            console.error('There was an issue with the generate request:', error);
        }
    };

    return (            
        <div className="flex flex-row min-h-screen">
            <div className="flex flex-col w-1/2 h-screen overflow-auto p-6">
                <h2 className="text-white text-2xl font-bold mb-6 text-center">Choose Your Options</h2>
                <InputField
                    id="topic"
                    label="Topic"
                    value={inputValue}
                    placeholder="Historical Event..."
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <InputField
                    id="instructions"
                    label="Instructions"
                    value={inputValue}
                    placeholder="..."
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <InputField
                    id="prefix"
                    label="Prefix"
                    value={inputValue}
                    placeholder="..."
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <div className="mb-4">
                    <label htmlFor="select" className="block text-gray-400 mb-2">Format</label>
                    <div className="flex justify-center items-center mb-4">
                        <div className="relative bg-gray-800 rounded-lg p-1 inline-flex">
                        <div
                            className={`absolute bg-gray-700 rounded-lg transition-transform duration-300 ease-in-out ${
                            selectedOption === "create" ? "translate-x-0" : "translate-x-full"
                            }`}
                            style={{ width: '50%', height: '100%' }}
                        ></div>
                        {["create", "configure"].map((option) => (
                            <button
                            key={option}
                            onClick={() => setSelectedOption(option)}
                            className={`px-6 py-2 text-sm font-medium uppercase text-white focus:outline-none ${
                                selectedOption === option ? "" : "opacity-50"
                            }`}
                            style={{ transition: 'opacity 0.3s' }}
                            >
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                            </button>
                        ))}
                        </div>
                    </div>
                </div>
                <InputField
                    id="examples"
                    label="Examples"
                    value={inputValue}
                    placeholder="..."
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <div className="mb-6">
                    <label htmlFor="slider" className="block text-gray-400 mb-2">Number Of Records</label>
                    <input
                        id="slider"
                        type="range"
                        min="5"
                        max="25"
                        step="1"
                        value={rangeValue}
                        onChange={(e) => setRangeValue(Number(e.target.value))}
                        className="w-full h-2 rounded-md cursor-pointer focus:outline-none"
                    />
                    <div className="text-white text-center mt-2">{rangeValue}</div>
                </div>
                <div className="flex gap-4 mt-4 mb-4">
                    <button onClick={handleGenerate} className="w-1/2 py-2 bg-secondary text-white rounded-md focus:outline-none hover:bg-accent">
                        Generate
                    </button>
                    <button onClick={handlePreview} className="w-1/2 py-2 bg-secondary text-white rounded-md focus:outline-none hover:bg-accent">
                        Preview
                    </button>
                </div>
            </div>
            <div className="w-1/2 p-6 bg-white/10 rounded-lg shadow-xl overflow-auto">
            <h2 className="text-white text-2xl font-bold mb-6 text-center">Preview</h2>
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <l-squircle size="37" stroke="5" stroke-length="0.15" bg-opacity="0.1" speed="0.9" color="white"></l-squircle>
                    </div>
                ) : (
                    <div className="overflow-auto">
                        <pre className="text-sm font-mono text-white">
                            {JSON.stringify(previewData, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );    
}    
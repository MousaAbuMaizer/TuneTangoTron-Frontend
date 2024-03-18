'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useStore from '../../store/store';

export default function Main() {
    const [topicValue, setTopicValue] = useState('');
    const [instructionsValue, setInstructionsValue] = useState('');
    const [prefixValue, setPrefixValue] = useState('');
    const [examplesValue, setExamplesValue] = useState('');
    const [rangeValue, setRangeValue] = useState(25);
    const [loading, setLoading] = useState(false);
    const [previewData, setPreviewData] = useState(''); 
    const [formatChoice, setFormatChoice] = useState('LangChainSchema'); 
    const [customFormat, setCustomFormat] = useState('{}');

    const setDownloadLink = useStore((state) => state.setDownloadLink); 
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            import('ldrs').then(({ squircle }) => {
                squircle.register();
            });
        }
    }, []);

    const handlePreview = async () => {
        setLoading(true);
    
        // Prepare the body data with all fields
        const bodyData = {
            topic: topicValue,
            instructions: instructionsValue,
            prefix: prefixValue,
            examples: examplesValue,
            number_records: 5,
            formatChoice:formatChoice,
            customFormat: formatChoice === 'custom' ? JSON.parse(customFormat) : undefined,
        };
    
        try {
            const response = await fetch('http://localhost:8000/api/v2/generate_data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyData),
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
    
        // Prepare the body data with all fields
        const bodyData = {
            topic: topicValue,
            instructions: instructionsValue,
            prefix: prefixValue,
            examples: examplesValue,
            number_records: rangeValue, // Use rangeValue for the number of records
            formatChoice:formatChoice,
            customFormat: formatChoice === 'custom' ? JSON.parse(customFormat) : undefined,
        };
    
        try {
            const response = await fetch('http://localhost:8000/api/v2/generate_data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyData),
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
                <div className="mb-4">
                    <label htmlFor="topic" className="block text-gray-400 mb-2">Topic</label>
                    <textarea
                        id="topic"
                        className="bg-gray-800 text-white rounded-lg p-2 w-full"
                        value={topicValue}
                        onChange={(e) => setTopicValue(e.target.value)}
                        placeholder="Historical Event..."
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="instructions" className="block text-gray-400 mb-2">Instructions</label>
                    <textarea
                        id="instructions"
                        className="bg-gray-800 text-white rounded-lg p-2 w-full"
                        value={instructionsValue}
                        onChange={(e) => setInstructionsValue(e.target.value)}
                        placeholder="Detailed instructions..."
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="prefix" className="block text-gray-400 mb-2">Prefix</label>
                    <textarea
                        id="prefix"
                        className="bg-gray-800 text-white rounded-lg p-2 w-full"
                        value={prefixValue}
                        onChange={(e) => setPrefixValue(e.target.value)}
                        placeholder="Starting prefix..."
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="examples" className="block text-gray-400 mb-2">Examples</label>
                    <textarea
                        id="examples"
                        className="bg-gray-800 text-white rounded-lg p-2 w-full"
                        value={examplesValue}
                        onChange={(e) => setExamplesValue(e.target.value)}
                        placeholder="Example inputs..."
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-400 mb-2">Format</label>
                    <div className="flex gap-2">
                        <select
                            className="bg-gray-800 text-white rounded-lg p-3"
                            value={formatChoice}
                            onChange={(e) => setFormatChoice(e.target.value)}
                        >
                            <option value="LangChainSchema">Langchain Format</option>
                            <option value="ChatgptSchema">Chatgpt Format</option>
                            <option value="SharegptSchema">Sharegpt Format</option>
                            <option value="custom">Custom Format (JSON)</option>
                        </select>
                        {formatChoice === 'custom' && (
                            <p className="text-red-500 text-sm italic mt-2">
                                important: Ensure your custom schema matches the provided example above.
                            </p>
                        )}
                    </div>
                </div>
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

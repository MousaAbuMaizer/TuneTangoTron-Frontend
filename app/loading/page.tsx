'use client';
import { FC } from 'react'; 
import { squircle } from 'ldrs';

squircle.register();

const Loading: FC = () => {
    return (
    <div className="flex justify-center items-center h-screen"> 
        <div className="bg-white/10 p-6 rounded-lg shadow-xl w-96 flex flex-col justify-center items-center"> 
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
};

export default Loading;

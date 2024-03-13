'use client';
import { LuFileJson } from "react-icons/lu";
import useStore from "../../store/store";

export default function Output() {
    const downloadLink = useStore((state) => state.downloadLink);
    console.log('Download link:', downloadLink);

    return (
        <div className="h-screen w-full flex items-center justify-center">
            <div className="bg-white/10 p-6 rounded-lg shadow-xl w-96 flex flex-col items-center justify-center space-y-4">
                <h2 className="text-white text-2xl font-bold text-center">Your File Is Ready</h2>
                <a href={downloadLink} download className="bg-secondary text-white rounded-md p-4 text-lg flex items-center justify-center hover:bg-accent w-full text-center">
                    <LuFileJson className="mr-2 text-2xl" /> Click To Download
                </a>
            </div>
        </div>
    );
}

import {create} from 'zustand';

interface DownloadLinkState {
    downloadLink: string;
    setDownloadLink: (link: string) => void;
}

const useStore = create<DownloadLinkState>((set) => ({
    downloadLink: '',
    setDownloadLink: (link: string) => set({ downloadLink: link }),
}));

export default useStore;

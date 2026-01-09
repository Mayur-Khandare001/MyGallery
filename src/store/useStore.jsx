import { create } from 'zustand';

export const useStore = create((set) => ({
    selectedImage: null,
    setSelectedImage: (image) => set({ selectedImage: image }),
}))

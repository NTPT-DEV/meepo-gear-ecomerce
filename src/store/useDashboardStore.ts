import { create } from "zustand";

interface DashBoardStore {
    selectedMenu : string | null 
    setSelectedMenu : (menu : string | null) => void
}

export const useDashBoradStore = create<DashBoardStore>((set) => ({
    selectedMenu : null ,
    setSelectedMenu : (menu) => set(()=> ({selectedMenu : menu})),
}))
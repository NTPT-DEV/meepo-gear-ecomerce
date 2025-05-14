import { create } from "zustand";

interface DashBoardStore {
    selectedMenu : string | null 
    setSelectedMenu : (menu : string | null) => void
}

export const useDashBoradStore = create<DashBoardStore>((set) => ({
    selectedMenu : "Import Product" ,
    setSelectedMenu : (menu) => set(()=> ({selectedMenu : menu})),
}))
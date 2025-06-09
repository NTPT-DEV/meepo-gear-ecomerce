import { create } from "zustand";

interface ZMenuDashBoradStoreStore {
    selectedMenu : string | null 
    setSelectedMenu : (menu : string | null) => void
}

export const useMenuDashBoradStore = create<ZMenuDashBoradStoreStore>((set) => ({
    selectedMenu : "Orders" ,
    setSelectedMenu : (menu) => set(()=> ({selectedMenu : menu})),
}))
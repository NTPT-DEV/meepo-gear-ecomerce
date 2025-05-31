
import { create } from 'zustand'


type menuCartTypeStore = { 
    menuCart : boolean 
    toggleMenuCart : () => void
    manualMenuCart : () => void 
}

export const useMenuCartStore = create<menuCartTypeStore>((set) => ({
    menuCart : false , 
    
    toggleMenuCart : () => 
    set((state) => ({ 
    menuCart : !state.menuCart 
    })) ,

    manualMenuCart : () => {
     set(() => ({
        menuCart : true
     }))
    }
}))




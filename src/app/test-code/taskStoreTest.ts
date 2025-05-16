import { create } from 'zustand'

// pratcice example 

export  interface Task { 
    id : string 
    title : string 
    complete : boolean 
}

interface TaskStore {
    tasks : Task[] ;
    addTask : (item : Task ) => void  ; 
    removeTask : (id : string ) => void ;
    toggleTask : (id : string ) => void ;
}

export const useTaskStore = create<TaskStore>((set) => ({
    tasks : [] , 
    
    addTask : (item) => set((state) => ({
        tasks : [...state.tasks , item]
    })),

    removeTask : (id) => set((state) => ({
        tasks : state.tasks.filter((t) => t.id !== id )
    })),

    toggleTask : (id) => set((state) => ({
        tasks : state.tasks.map((t) => t.id === id ? ({...t , complete : !t.complete}) : t)
    }))
}))
    




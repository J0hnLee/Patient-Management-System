import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useNotesStore = create(
  persist(
    (set) => ({
      notes: [],
      addNote: () => set((state) => ({ 
        notes: [...state.notes, ''] 
      })),
      updateNote: (index, content) => set((state) => {
        const newNotes = [...state.notes]
        newNotes[index] = content
        return { notes: newNotes }
      }),
      deleteNote: (index) => set((state) => ({
        notes: state.notes.filter((_, i) => i !== index)
      })),
    }),
    {
      name: 'notes-storage', // localStorage 的键名
    }
  )
)

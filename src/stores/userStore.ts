import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { UserRole } from '@/lib/users'

// User interface based on the existing user data structure
export interface User {
  id: string
  name: string
  email: string
  avatar: string
  role: UserRole
}

interface UserState {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User) => void
  clearUser: () => void
}

// Create user store with persistence
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: true }),
      clearUser: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'user-storage', // name of the item in storage
      storage: createJSONStorage(() => localStorage),
    }
  )
) 
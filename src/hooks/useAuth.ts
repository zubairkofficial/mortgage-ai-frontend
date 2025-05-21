import { useUser } from '@/stores/userStore';

export const useAuth = () => {
    const user = useUser(state => state.user);
    return { user };
}; 
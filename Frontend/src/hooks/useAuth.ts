import { IUser } from '@/types/user/userType'
import { createContext, useContext } from 'react';

interface IAuthContext {
    currentUser: IUser | null;
    setCurrentUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

const AuthContext = createContext<IAuthContext | null>(null)

const useAuth = () => {
    const auth = useContext(AuthContext);
    return { currentUser: auth?.currentUser }
}


export { AuthContext, useAuth }
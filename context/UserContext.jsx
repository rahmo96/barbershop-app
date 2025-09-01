// context/UserContext.jsx
import { ID } from "react-native-appwrite";
import { createContext, useContext, useEffect, useState } from "react";
import { account } from "@/utils/appwrite";
import { toast } from "@/lib/toast";

const UserContext = createContext();

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider(props) {
    const [current, setCurrent] = useState(undefined); // undefined = loading, null = not logged in, object = logged in
    const [loading, setLoading] = useState(true);
    const [authChecked, setAuthChecked] = useState(false);

    async function login(email, password) {
        try {
            setLoading(true);
            await account.createEmailPasswordSession(email, password);
            // After session creation, get the user data
            const loggedInUser = await account.get();
            setCurrent(loggedInUser);
            toast('Welcome back. You are logged in');
            console.log(loggedInUser);
            return loggedInUser;
        } catch (err) {
            console.error("Login error:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    async function logout() {
        try {
            setLoading(true);
            await account.deleteSession("current");
            setCurrent(null);
            toast('Logged out');
        } catch (err) {
            console.error("Logout error:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    async function register(email, password, name) {
        try {
            setLoading(true);
            // Create the user
            const user = await account.create(ID.unique(), email, password, name);

            // Login after registration
            await login(email, password);

            toast('Account created successfully');
            return user;
        } catch (err) {
            console.error("Registration error:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    async function updateProfile(name) {
        try {
            setLoading(true);
            const updated = await account.updateName(name);
            setCurrent(updated); // תעדכן גם את הסטייט המקומי
            toast('Profile updated successfully');
            return updated;
        } catch (err) {
            console.error("Update profile error:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    async function init() {
        try {
            setLoading(true);
            const loggedIn = await account.get();
            setCurrent(loggedIn);
            toast('Welcome back. You are logged in');
        } catch (err) {
            // Not logged in
            setCurrent(null);
        } finally {
            setLoading(false);
            setAuthChecked(true);
        }
    }

    useEffect(() => {
        init();
    }, []);

    return (
        <UserContext.Provider value={{
            current,
            loading,
            authChecked,
            login,
            logout,
            register,
            toast,
            updateProfile,
        }}>
            {props.children}
        </UserContext.Provider>
    );
}
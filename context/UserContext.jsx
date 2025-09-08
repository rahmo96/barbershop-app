// context/UserContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    onAuthStateChanged
} from 'firebase/auth';
import { auth } from "@/utils/firebase";
import { toast } from "@/lib/toast";
import { createUser } from "@/services/users";
import { doc, setDoc } from "firebase/firestore";
import { updateUser } from "@/services/users";
import {db} from "@/utils/firebase";


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
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setCurrent(userCredential.user);
            toast('Welcome back. You are logged in');
            return userCredential.user;
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
            await signOut(auth);
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
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Update the user profile with name
            await updateProfile(userCredential.user, { displayName: name });
            await createUser(userCredential.user.uid, {
                displayName: name,
                email: userCredential.user.email,
                role: "customer",
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            // Update local state
            setCurrent(userCredential.user);

            toast('Account created successfully');
            return userCredential.user;
        } catch (err) {
            console.error("Registration error:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    }
    async function updateUserProfile(name) { // Renamed function
        try {
            setLoading(true);
            await updateProfile(auth.currentUser, { displayName: name });
            await updateUser(auth.currentUser.uid, { displayName: name , email: auth.currentUser.email, role: "customer", createdAt: new Date()});
            setCurrent({...auth.currentUser});
            toast('Profile updated successfully');
            return auth.currentUser;
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrent(user);
            setLoading(false);
            setAuthChecked(true);
        });

        // Cleanup subscription
        return () => unsubscribe();
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
            updateUserProfile


        }}>
            {props.children}
        </UserContext.Provider>
    );
}
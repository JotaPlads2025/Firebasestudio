
'use client';

import React, { createContext, useContext, ReactNode, useMemo, useState, useEffect } from 'react';
import { FirebaseApp } from 'firebase/app';
import { Firestore } from 'firebase/firestore';
import { Auth, User, onAuthStateChanged } from 'firebase/auth';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';
import { initializeFirebase } from '@/firebase';

interface FirebaseProviderProps {
  children: ReactNode;
}

// Internal state for user authentication
interface UserAuthState {
  user: User | null;
  isUserLoading: boolean;
  userError: Error | null;
}

// Combined state for the Firebase context
export interface FirebaseContextState {
  areServicesAvailable: boolean; // True if core services (app, firestore, auth instance) are provided
  firebaseApp: FirebaseApp | null;
  firestore: Firestore | null;
  auth: Auth | null; // The Auth service instance
}

// React Context
export const FirebaseContext = createContext<FirebaseContextState | undefined>(undefined);

const USE_FIREBASE = process.env.NEXT_PUBLIC_USE_FIREBASE === 'true';

/**
 * FirebaseProvider manages and provides Firebase services and user authentication state.
 */
export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({
  children
}) => {
   const firebaseServices = useMemo(() => {
    if (typeof window === 'undefined' || !USE_FIREBASE) {
      return { firebaseApp: null, auth: null, firestore: null };
    }
    // Initialize Firebase on the client side, once per component mount.
    return initializeFirebase();
  }, []);

  const [userAuthState, setUserAuthState] = useState<UserAuthState>({
    user: null,
    isUserLoading: true, // Start loading until first auth event
    userError: null,
  });

  // Effect to subscribe to Firebase auth state changes
  useEffect(() => {
    if (!firebaseServices.auth) { // If no Auth service instance, cannot determine user state
      setUserAuthState({ user: null, isUserLoading: false, userError: USE_FIREBASE ? new Error("Auth service not provided.") : null });
      return;
    }

    setUserAuthState({ user: null, isUserLoading: true, userError: null }); // Reset on auth instance change

    const unsubscribe = onAuthStateChanged(
      firebaseServices.auth,
      (firebaseUser) => { // Auth state determined
        setUserAuthState({ user: firebaseUser, isUserLoading: false, userError: null });
      },
      (error) => { // Auth listener error
        console.error("FirebaseProvider: onAuthStateChanged error:", error);
        setUserAuthState({ user: null, isUserLoading: false, userError: error });
      }
    );
    return () => unsubscribe(); // Cleanup
  }, [firebaseServices.auth]); // Depends on the auth instance

  // Memoize the context value
  const contextValue = useMemo((): FirebaseContextState => {
    const servicesAvailable = !!(firebaseServices.firebaseApp && firebaseServices.firestore && firebaseServices.auth);
    return {
      areServicesAvailable: servicesAvailable,
      firebaseApp: servicesAvailable ? firebaseServices.firebaseApp : null,
      firestore: servicesAvailable ? firebaseServices.firestore : null,
      auth: servicesAvailable ? firebaseServices.auth : null,
    };
  }, [firebaseServices]);

  const providerValue = {
      ...contextValue,
      ...userAuthState,
  };

  if (!USE_FIREBASE) {
    return <>{children}</>;
  }

  return (
    <FirebaseContext.Provider value={providerValue}>
      <FirebaseErrorListener />
      {children}
    </FirebaseContext.Provider>
  );
};


/**
 * Hook to access the core Firebase services (app, firestore, auth).
 * Throws an error if used outside of a FirebaseProvider.
 */
function useFirebase(): FirebaseContextState {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider.');
  }

  if (!context.areServicesAvailable || !context.firebaseApp || !context.firestore || !context.auth) {
    if (USE_FIREBASE) {
        throw new Error('Firebase services are not available.');
    }
  }

  return context;
}

/**
 * Hook to access the Firebase Auth instance.
 * @returns {Auth | null} The Firebase Auth instance, or null if not available.
 */
export function useAuth(): Auth | null {
  const { auth } = useFirebase();
  return auth;
}

/**
 * Hook to access the Firestore instance.
 * @returns {Firestore | null} The Firestore instance, or null if not available.
 */
export function useFirestore(): Firestore | null {
    const { firestore } = useFirebase();
    return firestore;
}

/**
 * Hook that provides the current user's authentication state.
 * It's a client-side hook that returns the user object, loading status, and any auth errors.
 * @returns {{
*   user: User | null; // The Firebase User object if authenticated, otherwise null.
*   isUserLoading: boolean; // True while the initial user state is being determined.
*   userError: Error | null; // Any error that occurred during authentication state retrieval.
* }}
*/
export function useUser(): UserAuthState {
    const context = useContext(FirebaseContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a FirebaseProvider.');
    }
    const { user, isUserLoading, userError } = context;
    return { user, isUserLoading, userError };
}

export function useMemoFirebase<T>(factory: () => T, deps: React.DependencyList) {
    return useMemo(() => {
        const result: any = factory();
        if (result) {
            result['__memo'] = true;
        }
        return result;
    }, deps);
}

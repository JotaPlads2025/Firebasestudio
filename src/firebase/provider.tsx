
'use client';

import React, { createContext, useContext, ReactNode, useMemo, useState, useEffect } from 'react';
import { FirebaseApp } from 'firebase/app';
import { Firestore } from 'firebase/firestore';
import { Auth, User, onAuthStateChanged } from 'firebase/auth';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';
import { useUser as useUserHook, type UserAuthState } from './auth/use-user';

export interface FirebaseProviderProps {
  children: ReactNode;
  firebaseApp: FirebaseApp | null;
  firestore: Firestore | null;
  auth: Auth | null;
}

// Combined state for the Firebase context
export interface FirebaseContextState {
  firebaseApp: FirebaseApp | null;
  firestore: Firestore | null;
  auth: Auth | null;
}

// React Context
export const FirebaseContext = createContext<FirebaseContextState | undefined>(
  undefined
);

/**
 * FirebaseProvider manages and provides Firebase services and user authentication state.
 */
export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({
  children,
  firebaseApp,
  firestore,
  auth
}) => {
  const contextValue = useMemo((): FirebaseContextState => {
    return {
      firebaseApp: firebaseApp,
      firestore: firestore,
      auth: auth,
    };
  }, [firebaseApp, firestore, auth]);

  return (
    <FirebaseContext.Provider value={contextValue}>
      <FirebaseErrorListener />
      {children}
    </FirebaseContext.Provider>
  );
};


/**
 * Hook to access the core Firebase services (app, firestore, auth).
 * Throws an error if used outside of a FirebaseProvider.
 */
function useFirebase(): FirebaseContextState | undefined {
  return useContext(FirebaseContext);
}


/**
 * Hook to access the Firebase Auth instance.
 * @returns {Auth | null} The Firebase Auth instance, or null if not available.
 */
export function useAuth(): Auth | null {
  const context = useFirebase();
  return context?.auth ?? null;
}

/**
 * Hook to access the Firestore instance.
 * @returns {Firestore | null} The Firestore instance, or null if not available.
 */
export function useFirestore(): Firestore | null {
    const context = useFirebase();
    return context?.firestore ?? null;
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
    const auth = useAuth();
    return useUserHook(auth);
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

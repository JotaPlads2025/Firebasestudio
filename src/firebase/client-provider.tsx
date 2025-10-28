'use client';

import React, { useMemo, type ReactNode } from 'react';
import { FirebaseProvider } from '@/firebase/provider';
import { initializeFirebase } from '@/firebase';

interface FirebaseClientProviderProps {
  children: ReactNode;
}

const USE_FIREBASE = process.env.NEXT_PUBLIC_USE_FIREBASE === 'true';

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  const firebaseServices = useMemo(() => {
    if (!USE_FIREBASE) {
        return { firebaseApp: null, auth: null, firestore: null };
    }
    // Initialize Firebase on the client side, once per component mount.
    return initializeFirebase();
  }, []);

  if (!USE_FIREBASE) {
    return <>{children}</>;
  }

  // This check is important for when firebaseServices are being initialized.
  if (!firebaseServices.firebaseApp || !firebaseServices.auth || !firebaseServices.firestore) {
    // You could return a global loader here if you wanted.
    return null; 
  }

  return (
    <FirebaseProvider
      firebaseApp={firebaseServices.firebaseApp}
      auth={firebaseServices.auth}
      firestore={firebaseServices.firestore}
    >
      {children}
    </FirebaseProvider>
  );
}

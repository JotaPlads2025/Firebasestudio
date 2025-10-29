
'use client';

import { useMemo } from 'react';
import { initializeFirebase, FirebaseProvider } from '@/firebase';

/**
 * Ensures Firebase is initialized once on the client and provides it.
 */
export function FirebaseClientProvider({ children }: { children: React.ReactNode }) {
  const firebaseServices = useMemo(() => {
    if (typeof window === 'undefined') {
      return { firebaseApp: null, auth: null, firestore: null };
    }
    return initializeFirebase();
  }, []);

  return (
    <FirebaseProvider
      firebaseApp={firebaseServices.firebaseApp}
      firestore={firebaseServices.firestore}
      auth={firebaseServices.auth}
    >
      {children}
    </FirebaseProvider>
  );
}

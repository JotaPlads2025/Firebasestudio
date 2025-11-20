
'use client';
import {
  Auth,
  GoogleAuthProvider,
  signInWithRedirect,
} from 'firebase/auth';

const USE_FIREBASE = process.env.NEXT_PUBLIC_USE_FIREBASE === 'true';

/**
 * Initiates Google Sign-In using a redirect.
 * This is a non-blocking operation. The user will be redirected to Google,
 * and the result will be handled by onAuthStateChanged when they are redirected back.
 * @param authInstance The Firebase Auth instance.
 */
export function initiateGoogleSignIn(authInstance: Auth): void {
  if (!USE_FIREBASE) {
    console.log("Modo de demostración: El inicio de sesión con Google está desactivado.");
    return;
  }
  const provider = new GoogleAuthProvider();
  // CRITICAL: Call signInWithRedirect directly. Do NOT use 'await'.
  signInWithRedirect(authInstance, provider);
}

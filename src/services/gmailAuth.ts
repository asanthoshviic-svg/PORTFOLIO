import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
  signOut,
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App instance safely (singleton pattern)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Gmail Workspace Scopes requested for sending and managing messages
export const GMAIL_SCOPES = [
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/gmail.compose',
  'https://mail.google.com/',
];

const provider = new GoogleAuthProvider();
// Attach requested Gmail scopes
GMAIL_SCOPES.forEach((scope) => provider.addScope(scope));
// Force prompt to ensure user grants the necessary permissions
provider.setCustomParameters({
  prompt: 'select_account',
});

// Flag to indicate if we are in the middle of a sign-in flow
let isSigningIn = false;
// In-memory access token cache (MANDATORY: never stored in localStorage/sessionStorage)
let cachedAccessToken: string | null = null;

/**
 * Initialize auth state listener.
 */
export const initAuth = (
  onAuthSuccess?: (user: User, token: string | null) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        // Token not yet cached; user might have refreshed the page.
        if (onAuthSuccess) onAuthSuccess(user, null);
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

/**
 * Trigger Google Sign In with Gmail Scopes.
 */
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Could not obtain Google OAuth access token. Please ensure Gmail permissions are accepted.');
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Google Sign In Error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

/**
 * Retrieve the active cached access token.
 */
export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

/**
 * Sign out and clear cached token.
 */
export const logout = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};

export interface SendEmailPayload {
  to: string;
  fromName: string;
  fromEmail: string;
  topic: string;
  message: string;
}

/**
 * Dispatches a message directly to Santhosh via Gmail API.
 */
export async function sendEmailViaGmail(
  accessToken: string,
  { to, fromName, fromEmail, topic, message }: SendEmailPayload
): Promise<{ success: boolean; id?: string }> {
  const subject = `[Portfolio Note] ${topic}: from ${fromName}`;
  const utf8Subject = `=?UTF-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`;

  const emailLines = [
    `To: ${to}`,
    `Reply-To: "${fromName}" <${fromEmail}>`,
    `Subject: ${utf8Subject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 7bit',
    '',
    `Hello Santhosh,`,
    ``,
    `You have received a direct note sent from your portfolio website.`,
    ``,
    `-------------------------------------------------------`,
    `Sender Name:    ${fromName}`,
    `Sender Email:   ${fromEmail}`,
    `Topic:          ${topic}`,
    `Timestamp:      ${new Date().toLocaleString()}`,
    `-------------------------------------------------------`,
    ``,
    `Message:`,
    message,
    ``,
    `-------------------------------------------------------`,
    `Sent directly via Gmail API to ${to}`,
  ];

  const emailContent = emailLines.join('\r\n');
  const base64Url = btoa(unescape(encodeURIComponent(emailContent)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      raw: base64Url,
    }),
  });

  if (!response.ok) {
    const errJson = await response.json().catch(() => null);
    const msg = errJson?.error?.message || `Gmail API returned HTTP ${response.status}`;
    throw new Error(msg);
  }

  const data = await response.json();
  return { success: true, id: data.id };
}

/**
 * Helper to generate a prefilled mailto link as an emergency fallback.
 */
export function createMailtoLink({ to, fromName, topic, message }: SendEmailPayload): string {
  const subject = encodeURIComponent(`[Portfolio Note] ${topic}: from ${fromName}`);
  const body = encodeURIComponent(
    `Hello Santhosh,\n\nName: ${fromName}\nTopic: ${topic}\n\nMessage:\n${message}\n`
  );
  return `mailto:${to}?subject=${subject}&body=${body}`;
}

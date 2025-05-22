import { atom, Getter } from 'jotai';
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';

type FingerprintData = ReturnType<typeof useVisitorData>['data'];

export const fingerprintDataAtom = atom<FingerprintData | null>(null);
export const extendedFingerprintDataAtom = atom<FingerprintData | null>(null);

export const fingerprintErrorAtom = atom<
  | {
      message: string;
      code?: string;
      timestamp?: number;
      details?: unknown;
    }
  | null
>(null);

export const fingerprintLoadingAtom = atom<boolean>(false);
export const fingerprintScriptStatusAtom = atom<'loading' | 'loaded' | 'error' | 'not-found'>('loading');

const getPreferredData = (get: Getter) => {
  const extended = get(extendedFingerprintDataAtom);
  if (extended) return extended;
  return get(fingerprintDataAtom);
};

export const visitorIdAtom = atom(get => getPreferredData(get)?.visitorId ?? null);

export const browserDetailsAtom = atom(get => {
  const data = getPreferredData(get);
  if (!data) return null;
  return {
    browserName: 'browserName' in data ? (data as any).browserName : undefined,
    browserVersion: 'browserVersion' in data ? (data as any).browserVersion : undefined,
    userAgent: 'userAgent' in data ? (data as any).userAgent : undefined,
    incognito: 'incognito' in data ? (data as any).incognito : undefined,
  };
});

export const deviceDetailsAtom = atom(get => {
  const data = getPreferredData(get);
  if (!data) return null;
  return {
    device: 'device' in data ? (data as any).device : undefined,
    deviceType: 'deviceType' in data ? (data as any).deviceType : undefined,
    os: 'os' in data ? (data as any).os : undefined,
    osVersion: 'osVersion' in data ? (data as any).osVersion : undefined,
    incognito: 'incognito' in data ? (data as any).incognito : undefined,
  };
});

export const locationDetailsAtom = atom(get => {
  const data = getPreferredData(get);
  if (!data || !('ipLocation' in data)) return null;
  return (data as any).ipLocation ?? null;
});

export const confidenceScoreAtom = atom(get => getPreferredData(get)?.confidence?.score ?? null);

export const incognitoAtom = atom(get => {
  const data = getPreferredData(get);
  if (!data) return false;
  return 'incognito' in data ? (data as any).incognito : false;
});

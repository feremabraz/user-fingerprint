"use client";

import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import {
  extendedFingerprintDataAtom,
  fingerprintErrorAtom,
  fingerprintLoadingAtom,
  fingerprintScriptStatusAtom,
} from '@/lib/atoms/fingerprint';

export const useFingerprintData = () => {
  const setExtendedFingerprintData = useSetAtom(extendedFingerprintDataAtom);
  const setFingerprintError = useSetAtom(fingerprintErrorAtom);
  const setFingerprintLoading = useSetAtom(fingerprintLoadingAtom);
  const setScriptStatus = useSetAtom(fingerprintScriptStatusAtom);

  const { data, isLoading, error, getData } = useVisitorData(
    { extendedResult: true },
    { immediate: true },
  );

  useEffect(() => {
    if (error) {
      if (error.message.includes('Failed to load the JS script')) {
        setScriptStatus('error');
        setFingerprintError({
          message: 'Failed to load Fingerprint script',
          code: 'SCRIPT_LOAD_ERROR',
          timestamp: Date.now(),
          details: error,
        });
      } else {
        setFingerprintError({
          message: error.message,
          timestamp: Date.now(),
          details: error,
        });
      }
    } else if (data) {
      setScriptStatus('loaded');
    }
  }, [error, data, setScriptStatus, setFingerprintError]);

  useEffect(() => {
    setFingerprintLoading(isLoading ?? false);
    if (data) {
      setExtendedFingerprintData(data);
    }
  }, [data, isLoading, setExtendedFingerprintData, setFingerprintLoading]);

  const getDataWithErrorHandling = async (options?: { ignoreCache?: boolean }) => {
    setFingerprintLoading(true);
    try {
      const result = await getData(options);
      setExtendedFingerprintData(result);
      return result;
    } catch (err: unknown) {
      let message = 'Unknown error';
      let code = 'UNKNOWN_ERROR';
      if (typeof err === 'object' && err !== null) {
        function hasMessageAndCode(e: unknown): e is { message: string; code?: string } {
          return (
            typeof e === 'object' &&
            e !== null &&
            'message' in e &&
            typeof (e as { message: unknown }).message === 'string'
          );
        }
        if (hasMessageAndCode(err)) {
          message = err.message;
          if (typeof err.code === 'string') {
            code = err.code;
          }
        }
      }
      const enhancedError = {
        message,
        code,
        timestamp: Date.now(),
        details: err,
      };
      setFingerprintError(enhancedError);
      setFingerprintLoading(false);
      throw enhancedError;
    } finally {
      setFingerprintLoading(false);
    }
  };

  return {
    data,
    isLoading,
    error,
    getData: getDataWithErrorHandling,
  };
};

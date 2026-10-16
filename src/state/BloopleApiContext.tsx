import React, { createContext, useContext, useMemo, useState } from 'react';

import { Account, ApiError, BloopleApi, FitDnaDraft, FitDnaProfile, SizeOptions } from '@/api/bloople';

type ApiContextValue = {
  account: Account | null;
  profile: FitDnaProfile | null;
  sizeOptions: SizeOptions | null;
  connected: boolean;
  connectError: string | null;
  connect(token: string): Promise<void>;
  saveFitDna(draft: FitDnaDraft): Promise<void>;
  loadMatchStatus(): Promise<{ pending: boolean; scoredProducts: number; profileVersion: number | null }>;
};

const ApiContext = createContext<ApiContextValue | null>(null);

export function BloopleApiProvider({ children }: React.PropsWithChildren) {
  const [api, setApi] = useState<BloopleApi | null>(null);
  const [account, setAccount] = useState<Account | null>(null);
  const [profile, setProfile] = useState<FitDnaProfile | null>(null);
  const [sizeOptions, setSizeOptions] = useState<SizeOptions | null>(null);
  const [connectError, setConnectError] = useState<string | null>(null);

  const invalidateExpiredSession = (error: unknown) => {
    if (error instanceof ApiError && error.status === 401) {
      setApi(null);
      setAccount(null);
      setProfile(null);
      setSizeOptions(null);
    }
  };

  const value = useMemo<ApiContextValue>(() => ({
    account,
    profile,
    sizeOptions,
    connected: Boolean(api),
    connectError,
    async connect(token) {
      setConnectError(null);
      try {
        const candidate = new BloopleApi(token.trim());
        const [nextAccount, nextProfile, nextSizeOptions] = await Promise.all([candidate.getAccount(), candidate.getFitDna(), candidate.getSizeOptions()]);
        setApi(candidate);
        setAccount(nextAccount);
        setProfile(nextProfile);
        setSizeOptions(nextSizeOptions);
      } catch (error) {
        setApi(null);
        setAccount(null);
        setProfile(null);
        setSizeOptions(null);
        const message = error instanceof ApiError && error.status === 401
          ? 'That token is invalid or expired. Generate a fresh one with make local-token.'
          : error instanceof Error ? error.message : 'Could not connect to the local API.';
        setConnectError(message);
        throw error;
      }
    },
    async saveFitDna(draft) {
      if (!api) throw new Error('Connect to the local demo account first.');
      try {
        setProfile(await api.saveFitDna(draft));
      } catch (error) {
        invalidateExpiredSession(error);
        throw error;
      }
    },
    async loadMatchStatus() {
      if (!api) throw new Error('Connect to the local demo account first.');
      try {
        return await api.getMatchStatus();
      } catch (error) {
        invalidateExpiredSession(error);
        throw error;
      }
    },
  }), [account, api, connectError, profile, sizeOptions]);

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}

export function useBloopleApi() {
  const value = useContext(ApiContext);
  if (!value) throw new Error('useBloopleApi must be used inside BloopleApiProvider.');
  return value;
}

'use client';

import React, { useState, useCallback, useMemo, createContext, useContext } from 'react';
import dynamic from 'next/dynamic';
import type { RequestQuoteDialogProps } from './request-quote-dialog';

const DynamicRequestQuoteDialog = dynamic(() => import('./request-quote-dialog'), {
  ssr: false,
});

type QuoteModalContextType = {
  isOpen: boolean;
  openQuoteModal: (scope?: string) => void;
  closeQuoteModal: () => void;
};

const QuoteModalContext = createContext<QuoteModalContextType>({
  isOpen: false,
  openQuoteModal: () => {},
  closeQuoteModal: () => {},
});

export function QuoteModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultScope, setDefaultScope] = useState<string>('');

  const openQuoteModal = useCallback((scope?: string) => {
    setDefaultScope(scope ?? '');
    setIsOpen(true);
  }, []);

  const closeQuoteModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const contextValue = useMemo(
    () => ({ isOpen, openQuoteModal, closeQuoteModal }),
    [isOpen, openQuoteModal, closeQuoteModal],
  );

  return (
    <QuoteModalContext.Provider value={contextValue}>
      {children}
      {isOpen ? (
        <DynamicRequestQuoteDialog
          isOpen={isOpen}
          onClose={closeQuoteModal}
          defaultService={defaultScope}
        />
      ) : null}
    </QuoteModalContext.Provider>
  );
}

export function useQuoteModal() {
  return useContext(QuoteModalContext);
}

export function RequestQuoteModal(props: RequestQuoteDialogProps) {
  return <DynamicRequestQuoteDialog {...props} />;
}

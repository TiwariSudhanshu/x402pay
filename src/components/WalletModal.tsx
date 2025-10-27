"use client";
import React from "react";
import { useConnect, useNetwork, useSwitchNetwork } from "wagmi";
import { toast } from "sonner";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect({
    onSuccess: () => {
      toast.success("Wallet connected successfully!");
      onClose();
    },
    onError: () => {
      toast.error("Failed to connect wallet");
    },
  });

  const { chain } = useNetwork();
  const { chains, switchNetwork } = useSwitchNetwork({
    onSuccess: (network) => {
      toast.success(`Switched to ${network.name}`);
    },
    onError: () => {
      toast.error("Failed to switch network");
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="mb-6 text-2xl font-bold text-gray-900">Connect Wallet</h2>

        <div className="space-y-3">
          {connectors.map((connector) => (
            <button
              key={connector.id}
              onClick={() => connect({ connector })}
              disabled={!connector.ready || isLoading}
              className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-4 text-left transition-all hover:border-amber-500 hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                  {connector.name === "MetaMask" && (
                    <svg className="h-6 w-6" viewBox="0 0 40 40" fill="none">
                      <path d="M37.2 3.8L22.4 14.9l2.7-6.4 12.1-4.7z" fill="#E17726"/>
                      <path d="M2.8 3.8l14.6 11.2-2.5-6.5L2.8 3.8zM31.9 28.5l-3.9 6 8.4 2.3 2.4-8.1-6.9-.2zM1.2 28.7l2.4 8.1 8.4-2.3-3.9-6-6.9.2z" fill="#E27625"/>
                    </svg>
                  )}
                  {connector.name === "WalletConnect" && (
                    <svg className="h-6 w-6" viewBox="0 0 40 40" fill="none">
                      <path d="M8.4 12.6c6.3-6.2 16.5-6.2 22.8 0l.8.7c.3.3.3.8 0 1.1l-2.6 2.5c-.2.1-.4.1-.6 0l-1-.9c-4.4-4.3-11.5-4.3-15.9 0l-1.1 1c-.2.1-.4.1-.6 0l-2.6-2.5c-.3-.3-.3-.8 0-1.1l.8-.8zm28.1 5.2l2.3 2.3c.3.3.3.8 0 1.1L28.2 31.8c-.3.3-.8.3-1.1 0l-7.5-7.3c-.1-.1-.2-.1-.3 0l-7.5 7.3c-.3.3-.8.3-1.1 0L.1 21.2c-.3-.3-.3-.8 0-1.1l2.3-2.3c.3-.3.8-.3 1.1 0l7.5 7.3c.1.1.2.1.3 0l7.5-7.3c.3-.3.8-.3 1.1 0l7.5 7.3c.1.1.2.1.3 0l7.5-7.3c.3-.3.9-.3 1.2 0z" fill="#3B99FC"/>
                    </svg>
                  )}
                  {connector.name === "Coinbase Wallet" && (
                    <svg className="h-6 w-6" viewBox="0 0 40 40" fill="none">
                      <circle cx="20" cy="20" r="20" fill="#0052FF"/>
                      <path d="M20 32c6.6 0 12-5.4 12-12S26.6 8 20 8 8 13.4 8 20s5.4 12 12 12z" fill="#fff"/>
                      <path d="M16 16h8v8h-8v-8z" fill="#0052FF"/>
                    </svg>
                  )}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{connector.name}</div>
                  {!connector.ready && <div className="text-xs text-gray-500">Not installed</div>}
                  {isLoading && connector.id === pendingConnector?.id && (
                    <div className="text-xs text-amber-600">Connecting...</div>
                  )}
                </div>
              </div>
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>

        {chain && (
          <>
            <div className="my-6 border-t border-gray-200"></div>
            
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Select Network</h3>
            <div className="space-y-2">
              {chains?.map((x) => (
                <button
                  key={x.id}
                  onClick={() => switchNetwork?.(x.id)}
                  disabled={!switchNetwork || x.id === chain?.id}
                  className={`flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left transition-all ${
                    x.id === chain?.id
                      ? "border-amber-500 bg-amber-50 text-amber-900"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                  } disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${x.id === chain?.id ? "bg-amber-500" : "bg-gray-300"}`}></div>
                    <span className="font-medium">{x.name}</span>
                  </div>
                  {x.id === chain?.id && (
                    <span className="text-xs font-semibold text-amber-600">Connected</span>
                  )}
                </button>
              ))}
            </div>
          </>
        )}

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error.message}
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { ethers, Signer } from "ethers";

// Define the shape of the context
interface WalletContextType {
    connectToMetaMask: () => Promise<{ signer: Signer, address: string }>;
}

// Create a context for the wallet
const WalletContext = createContext<WalletContextType | undefined>(undefined);

// WalletProvider component
export const WalletProvider = ({ children }: { children: ReactNode }) => {
    const [walletAddress, setWalletAddress] = useState<string>("");
    const [signer, setSigner] = useState<Signer | null>(null);

    // Function to connect to MetaMask
    const connectToMetaMask = async () => {
        let w: any = window;
        if (w.ethereum) {
            await w.ethereum.request({ method: "eth_requestAccounts" });
            const provider = new ethers.BrowserProvider(w.ethereum);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            return { signer, address };
        } else {
            throw new Error("MetaMask not detected");
        }
    };

    
    return (
        <WalletContext.Provider value={{
            connectToMetaMask,
        }}>
            {children}
        </WalletContext.Provider>
    );
};

// Custom hook to use the wallet context
export const useWallet = () => {
    const context = useContext(WalletContext);
    if (context === undefined) {
        throw new Error("useWallet must be used within a WalletProvider");
    }
    return context;
};

interface Props {
    children: ReactNode
}

export default function WalletProviderWrapper({ children }: Props) {
    return <WalletProvider>{children}</WalletProvider>
}

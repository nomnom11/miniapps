"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Wallet, Loader2, AlertCircle } from "lucide-react"
import { SUPPORTED_WALLETS } from "@/lib/wallet"
import { useWallet } from "@/contexts/wallet-context"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface WalletConnectModalProps {
  children: React.ReactNode
}

export function WalletConnectModal({ children }: WalletConnectModalProps) {
  const [open, setOpen] = useState(false)
  const { connect, isConnecting, error } = useWallet()

  const handleConnect = async (connector: string) => {
    try {
      await connect(connector)
      setOpen(false)
    } catch (error) {
      // Error is handled by the context
      console.error("Connection failed:", error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Connect Wallet
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Connect your wallet to start earning AMPL tokens while listening to music.
          </p>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            {SUPPORTED_WALLETS.map((wallet) => (
              <Card key={wallet.connector} className="cursor-pointer hover:bg-accent transition-colors">
                <CardContent className="p-4">
                  <Button
                    variant="ghost"
                    className="w-full justify-start h-auto p-0"
                    onClick={() => handleConnect(wallet.connector)}
                    disabled={isConnecting}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{wallet.icon}</span>
                      <div className="text-left">
                        <div className="font-medium">{wallet.name}</div>
                        {wallet.connector === "metamask" && (
                          <div className="text-xs text-muted-foreground">Most popular wallet</div>
                        )}
                        {wallet.connector === "walletconnect" && (
                          <div className="text-xs text-muted-foreground">Coming soon</div>
                        )}
                        {wallet.connector === "coinbase" && (
                          <div className="text-xs text-muted-foreground">Coming soon</div>
                        )}
                      </div>
                      {isConnecting && <Loader2 className="h-4 w-4 animate-spin ml-auto" />}
                    </div>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-xs text-muted-foreground text-center">
            By connecting a wallet, you agree to our Terms of Service and Privacy Policy.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

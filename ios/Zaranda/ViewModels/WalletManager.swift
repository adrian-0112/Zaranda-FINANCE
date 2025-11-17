import Foundation
import SwiftUI

class WalletManager: ObservableObject {
    @Published var wallets: [Wallet] = Wallet.mockWallets
    @Published var activeWalletIndex: Int = 0
    
    var activeWallet: Wallet {
        wallets[activeWalletIndex]
    }
    
    func refreshWallet() {
        // Simulate refresh - update balance with random value
        let randomBalance = String(format: "%.2f", Double.random(in: 0...500))
        wallets[activeWalletIndex].balance = randomBalance
    }
}

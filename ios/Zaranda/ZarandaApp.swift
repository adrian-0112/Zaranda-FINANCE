import SwiftUI

@main
struct ZarandaApp: App {
    @StateObject private var walletManager = WalletManager()
    
    var body: some Scene {
        WindowGroup {
            MainTabView()
                .environmentObject(walletManager)
        }
    }
}

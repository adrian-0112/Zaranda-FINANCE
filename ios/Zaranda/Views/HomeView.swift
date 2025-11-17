import SwiftUI

enum HomeNavigationDestination: Hashable {
    case transactions
    case swap
    case exchangeChart
}

struct HomeView: View {
    @EnvironmentObject var walletManager: WalletManager
    @State private var isAccountExpanded = false
    @State private var isSupportExpanded = false
    @State private var showAccountView = false
    @State private var showSupportChat = false
    @State private var navigationPath = NavigationPath()
    
    var body: some View {
        NavigationStack(path: $navigationPath) {
            ZStack {
                // Green background
                Color.green
                    .ignoresSafeArea()
                
                ScrollView {
                    VStack(spacing: 0) {
                        // Header
                        headerView
                            .padding(.top, 8)
                            .padding(.horizontal)
                            .padding(.bottom, 12)
                        
                        // Wallet Carousel
                        walletCarousel
                            .padding(.horizontal)
                            .padding(.bottom, 8)
                        
                        // Action Buttons
                        actionButtons
                            .padding(.horizontal)
                            .padding(.bottom, 16)
                        
                        // White content area
                        VStack(spacing: 16) {
                            SetupCard()
                            ExchangeRateCard(onTap: {
                                navigationPath.append(HomeNavigationDestination.exchangeChart)
                            })
                            PromoCard()
                        }
                        .padding()
                        .background(Color.white)
                        .cornerRadius(24, corners: [.topLeft, .topRight])
                    }
                }
                .refreshable {
                    await refreshWallets()
                }
            }
            .navigationBarHidden(true)
        }
        .fullScreenCover(isPresented: $showAccountView) {
            AccountView()
        }
        .fullScreenCover(isPresented: $showSupportChat) {
            SupportChatView()
        }
        .navigationDestination(for: HomeNavigationDestination.self) { destination in
            switch destination {
            case .transactions:
                TransactionsView(wallet: walletManager.activeWallet)
            case .swap:
                SwapView()
            case .exchangeChart:
                ExchangeChartView()
            }
        }
    }
    
    private var headerView: some View {
        HStack {
            // Account Button
            Button(action: {
                if isAccountExpanded {
                    showAccountView = true
                    isAccountExpanded = false
                } else {
                    withAnimation(.easeInOut(duration: 0.5)) {
                        isAccountExpanded = true
                        isSupportExpanded = false
                    }
                }
            }) {
                HStack(spacing: 8) {
                    Circle()
                        .fill(Color.green)
                        .frame(width: 24, height: 24)
                        .overlay(
                            Text("AV")
                                .font(.system(size: 10, weight: .bold))
                                .foregroundColor(.white)
                        )
                    
                    if isAccountExpanded {
                        Text("My Account")
                            .font(.system(size: 14, weight: .semibold))
                            .foregroundColor(.white)
                            .transition(.opacity.combined(with: .scale))
                    }
                }
                .padding(.horizontal, isAccountExpanded ? 12 : 8)
                .padding(.vertical, isAccountExpanded ? 8 : 8)
                .background(Color.white.opacity(0.2))
                .cornerRadius(20)
            }
            .animation(.easeInOut(duration: 0.5), value: isAccountExpanded)
            
            Spacer()
            
            // Support Chat Button
            Button(action: {
                if isSupportExpanded {
                    showSupportChat = true
                    isSupportExpanded = false
                } else {
                    withAnimation(.easeInOut(duration: 0.5)) {
                        isSupportExpanded = true
                        isAccountExpanded = false
                    }
                }
            }) {
                HStack(spacing: 8) {
                    if isSupportExpanded {
                        Text("Support Chat")
                            .font(.system(size: 14, weight: .semibold))
                            .foregroundColor(.white)
                            .transition(.opacity.combined(with: .scale))
                    }
                    
                    Image(systemName: "questionmark.circle.fill")
                        .font(.system(size: 20))
                        .foregroundColor(.white)
                }
                .padding(.horizontal, isSupportExpanded ? 12 : 8)
                .padding(.vertical, isSupportExpanded ? 8 : 8)
                .background(Color.white.opacity(0.2))
                .cornerRadius(20)
            }
            .animation(.easeInOut(duration: 0.5), value: isSupportExpanded)
        }
    }
    
    private var walletCarousel: some View {
        TabView(selection: $walletManager.activeWalletIndex) {
            ForEach(Array(walletManager.wallets.enumerated()), id: \.element.id) { index, wallet in
                WalletCard(wallet: wallet)
                    .tag(index)
            }
        }
        .tabViewStyle(.page(indexDisplayMode: .automatic))
        .frame(height: 200)
    }
    
    private var actionButtons: some View {
        HStack(spacing: 16) {
            Button(action: {
                navigationPath.append(HomeNavigationDestination.transactions)
            }) {
                HStack {
                    Image(systemName: "list.bullet")
                    Text("Transactions")
                }
                .font(.system(size: 16, weight: .semibold))
                .foregroundColor(.green)
                .frame(maxWidth: .infinity)
                .padding()
                .background(Color.white)
                .cornerRadius(25)
            }
            
            Button(action: {
                navigationPath.append(HomeNavigationDestination.swap)
            }) {
                HStack {
                    Image(systemName: "arrow.left.arrow.right")
                    Text("Swap")
                }
                .font(.system(size: 16, weight: .semibold))
                .foregroundColor(.white)
                .frame(maxWidth: .infinity)
                .padding()
                .background(Color.white.opacity(0.2))
                .overlay(
                    RoundedRectangle(cornerRadius: 25)
                        .stroke(Color.white.opacity(0.3), lineWidth: 1)
                )
                .cornerRadius(25)
            }
        }
    }
    
    private func refreshWallets() async {
        try? await Task.sleep(nanoseconds: 2_000_000_000) // 2 seconds
        walletManager.refreshWallet()
    }
}

struct WalletCard: View {
    let wallet: Wallet
    @State private var animatedBalance: String = "0.00"
    
    var body: some View {
        VStack(spacing: 8) {
            Text("$\(animatedBalance)")
                .font(.system(size: 48, weight: .bold, design: .rounded))
                .monospacedDigit()
                .foregroundColor(.white)
            
            HStack(spacing: 4) {
                Text(wallet.flag)
                Text(wallet.name)
                Text("•")
                Text(wallet.currency.rawValue)
            }
            .font(.system(size: 16, weight: .medium))
            .foregroundColor(.white.opacity(0.8))
        }
        .onAppear {
            animatedBalance = wallet.balance
        }
        .onChange(of: wallet.balance) { newValue in
            withAnimation(.easeInOut(duration: 0.5)) {
                animatedBalance = newValue
            }
        }
    }
}

// Extension for corner radius on specific corners
extension View {
    func cornerRadius(_ radius: CGFloat, corners: UIRectCorner) -> some View {
        clipShape(RoundedCorner(radius: radius, corners: corners))
    }
}

struct RoundedCorner: Shape {
    var radius: CGFloat = .infinity
    var corners: UIRectCorner = .allCorners

    func path(in rect: CGRect) -> Path {
        let path = UIBezierPath(
            roundedRect: rect,
            byRoundingCorners: corners,
            cornerRadii: CGSize(width: radius, height: radius)
        )
        return Path(path.cgPath)
    }
}

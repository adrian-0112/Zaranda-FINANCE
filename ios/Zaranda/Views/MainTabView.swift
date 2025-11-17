import SwiftUI

struct MainTabView: View {
    @State private var selectedTab = 0
    @State private var showSendModal = false
    
    var body: some View {
        ZStack(alignment: .bottom) {
            TabView(selection: $selectedTab) {
                HomeView()
                    .tabItem {
                        Label("Home", systemImage: "house.fill")
                    }
                    .tag(0)
                
                RecipientsView()
                    .tabItem {
                        Label("Recipients", systemImage: "person.2.fill")
                    }
                    .tag(1)
                
                // Empty view for send button position
                Color.clear
                    .tabItem {
                        Image(systemName: "")
                    }
                    .tag(2)
                
                InvestingView()
                    .tabItem {
                        Label("Investing", systemImage: "chart.line.uptrend.xyaxis")
                    }
                    .tag(3)
                
                LendingView()
                    .tabItem {
                        Label("Lending", systemImage: "banknote.fill")
                    }
                    .tag(4)
            }
            .onAppear {
                // Customize tab bar appearance
                let appearance = UITabBarAppearance()
                appearance.configureWithOpaqueBackground()
                UITabBar.appearance().standardAppearance = appearance
                UITabBar.appearance().scrollEdgeAppearance = appearance
                
                // Hide the middle tab item by making it invisible
                UITabBar.appearance().items?[2].isEnabled = false
            }
            
            // Central Send Button Overlay
            VStack {
                Spacer()
                Button(action: {
                    showSendModal = true
                }) {
                    Image(systemName: "paperplane.fill")
                        .font(.system(size: 20))
                        .foregroundColor(.white)
                        .frame(width: 64, height: 64)
                        .background(Color.green)
                        .clipShape(Circle())
                        .shadow(color: Color.green.opacity(0.3), radius: 8, x: 0, y: 4)
                }
                .rotationEffect(.degrees(-45))
                .offset(y: -40)
            }
        }
        .sheet(isPresented: $showSendModal) {
            SendReceiveModalView()
        }
    }
}

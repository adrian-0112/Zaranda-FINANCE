import SwiftUI

struct InvestingView: View {
    var body: some View {
        NavigationStack {
            ScrollView {
            VStack(spacing: 0) {
                // Hero Section
                ZStack(alignment: .bottom) {
                    AsyncImage(url: URL(string: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2070&auto=format&fit=crop")) { image in
                        image
                            .resizable()
                            .aspectRatio(contentMode: .fill)
                    } placeholder: {
                        Color.gray.opacity(0.3)
                    }
                    .frame(height: 400)
                    .clipped()
                    
                    // Gradient overlay
                    LinearGradient(
                        colors: [.black.opacity(0.8), .black.opacity(0.2), .clear],
                        startPoint: .bottom,
                        endPoint: .top
                    )
                    .frame(height: 400)
                    
                    // Hero Content
                    VStack(spacing: 16) {
                        Circle()
                            .fill(Color.white.opacity(0.1))
                            .frame(width: 64, height: 64)
                            .overlay(
                                Image(systemName: "chart.line.uptrend.xyaxis")
                                    .font(.system(size: 32))
                                    .foregroundColor(.white)
                            )
                        
                        Text("ZARANDA INVESTING")
                            .font(.system(size: 12, weight: .bold, design: .rounded))
                            .tracking(2)
                            .foregroundColor(.white)
                        
                        Text("INVEST IN MEXICO")
                            .font(.system(size: 40, weight: .black))
                            .foregroundColor(.white)
                        
                        Text("Build a diversified portfolio based on your profile.")
                            .font(.system(size: 16))
                            .foregroundColor(.white.opacity(0.9))
                            .multilineTextAlignment(.center)
                            .padding(.horizontal)
                    }
                    .padding(.bottom, 64)
                }
                
                // Content Section
                VStack(spacing: 16) {
                    // How It Works Card
                    VStack(alignment: .leading, spacing: 8) {
                        Text("How does it work?")
                            .font(.system(size: 18, weight: .bold))
                        
                        Text("It's simple. First, you define your investor profile and the level of risk you wish to take. Then, we give you access to a catalog of instruments so you can take control.")
                            .font(.system(size: 14))
                            .foregroundColor(.gray)
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding()
                    .background(Color.white)
                    .cornerRadius(16)
                    
                    // Available Options Card
                    VStack(alignment: .leading, spacing: 16) {
                        Text("Available Investment Options")
                            .font(.system(size: 18, weight: .bold))
                        
                        VStack(alignment: .leading, spacing: 12) {
                            InvestmentCategory(
                                title: "Low Risk (Focus on Stability & Preservation)",
                                options: ["CETES", "Bank Promissory Notes", "SOFIPOs"]
                            )
                            
                            Divider()
                            
                            InvestmentCategory(
                                title: "Medium Risk (Focus on Growth & Income)",
                                options: ["Investment Funds", "FIBRAS"]
                            )
                            
                            Divider()
                            
                            InvestmentCategory(
                                title: "High Risk (Focus on Long-Term Growth)",
                                options: ["ETFs", "Individual Stocks"]
                            )
                        }
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding()
                    .background(Color.white)
                    .cornerRadius(16)
                    
                    // Action Button
                    Button(action: {}) {
                        Text("Start Investing")
                            .font(.system(size: 18, weight: .bold))
                            .foregroundColor(.white)
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(Color.green)
                            .cornerRadius(25)
                    }
                    .padding(.top, 8)
                }
                .padding()
                .background(Color.gray.opacity(0.1))
                .cornerRadius(24, corners: [.topLeft, .topRight])
                .offset(y: -24)
            }
        }
        .background(Color.gray.opacity(0.1))
        .ignoresSafeArea(edges: .top)
        .navigationBarHidden(true)
        }
    }
}

struct InvestmentCategory: View {
    let title: String
    let options: [String]
    
    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(title)
                .font(.system(size: 16, weight: .semibold))
            
            ForEach(options, id: \.self) { option in
                HStack(spacing: 8) {
                    Circle()
                        .fill(Color.gray.opacity(0.3))
                        .frame(width: 4, height: 4)
                    Text(option)
                        .font(.system(size: 14))
                        .foregroundColor(.gray)
                }
            }
        }
    }
}

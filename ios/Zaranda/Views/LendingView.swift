import SwiftUI

struct LendingView: View {
    
    var body: some View {
        NavigationStack {
            ScrollView {
            VStack(spacing: 0) {
                // Hero Section
                ZStack(alignment: .bottom) {
                    AsyncImage(url: URL(string: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2070&auto=format&fit=crop")) { image in
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
                        colors: [.black.opacity(0.7), .clear],
                        startPoint: .bottom,
                        endPoint: .top
                    )
                    .frame(height: 400)
                    
                    // Hero Content
                    VStack(spacing: 16) {
                        HStack(spacing: 8) {
                            Image(systemName: "banknote.fill")
                                .font(.system(size: 16))
                            Text("Zaranda Lending")
                                .font(.system(size: 14, weight: .semibold))
                        }
                        .padding(.horizontal, 12)
                        .padding(.vertical, 6)
                        .background(Color.black.opacity(0.2))
                        .cornerRadius(20)
                        
                        Text("Find Your Ideal Credit in Mexico")
                            .font(.system(size: 40, weight: .bold))
                            .foregroundColor(.white)
                            .multilineTextAlignment(.center)
                        
                        Text("Zaranda is a loan comparator for the Mexican market. We find the best options for your profile by comparing rates, terms, and requirements, using an advanced algorithm to show which loans you're most likely to be approved for.")
                            .font(.system(size: 16))
                            .foregroundColor(.white.opacity(0.8))
                            .multilineTextAlignment(.center)
                            .padding(.horizontal)
                    }
                    .padding(.bottom, 64)
                }
                
                // Content Section
                VStack(spacing: 16) {
                    // We Do the Work Card
                    NavigationLink(destination: LendingOptionsView()) {
                        HStack {
                            VStack(alignment: .leading, spacing: 8) {
                                Text("We Do the Work for You")
                                    .font(.system(size: 28, weight: .bold))
                                    .foregroundColor(.green)
                                
                                Text("Compare rates, terms, and see your eligibility.")
                                    .font(.system(size: 16))
                                    .foregroundColor(.gray)
                            }
                            
                            Spacer()
                            
                            Image(systemName: "chevron.right")
                                .foregroundColor(.gray)
                        }
                            .padding()
                        .background(Color.white)
                        .cornerRadius(16)
                    }
                    
                    // Action Button
                    NavigationLink(destination: LendingOptionsView()) {
                        Text("Get started")
                            .font(.system(size: 18, weight: .bold))
                            .foregroundColor(.white)
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(Color.green)
                            .cornerRadius(25)
                    }
                    
                    Text("Rates starting from 8.9% APR")
                        .font(.system(size: 14))
                        .foregroundColor(.gray)
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

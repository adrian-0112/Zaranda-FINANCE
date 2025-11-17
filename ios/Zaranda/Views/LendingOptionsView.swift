import SwiftUI

struct LendingOptionsView: View {
    @State private var expandedItem: String? = nil
    
    private let loanOptions: [LoanOption] = [
        LoanOption(
            icon: "dollarsign.circle.fill",
            title: "Personal Loans",
            headline: "Find the right personal loan for you",
            description: "Need to consolidate debt or make a large purchase? We bring the lenders to you so you can shop and compare personal loan offers in minutes.",
            buttonText: "Compare Rates"
        ),
        LoanOption(
            icon: "house.fill",
            title: "Home Purchase",
            headline: "Compare top mortgage lenders",
            description: "Get multiple lenders to compete for your business and see how much you could save. We make it simple to compare your options.",
            buttonText: "Compare Rates"
        ),
        LoanOption(
            icon: "car.fill",
            title: "Auto Loans",
            headline: "Discover the right auto loan for you",
            description: "Take home the car you love. Compare auto loans to find the right fit for you, whether you're buying new, used, or refinancing.",
            buttonText: "Compare Rates"
        ),
        LoanOption(
            icon: "creditcard.fill",
            title: "Credit Cards",
            headline: "Shop and compare credit cards",
            description: "From earning rewards to transferring a balance, find the right credit card to help you score everyday wins.",
            buttonText: "Compare Credit Cards"
        ),
        LoanOption(
            icon: "briefcase.fill",
            title: "Business Loans",
            headline: "Shop and compare business loans",
            description: "Our network of lenders will compete for your business, so you can get the funding you need for yours.",
            buttonText: "Compare Business Loans"
        )
    ]
    
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                Text("When banks compete, ")
                    .font(.system(size: 32, weight: .bold))
                + Text("you win.")
                    .font(.system(size: 32, weight: .bold))
                    .foregroundColor(.green)
            }
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding()
            
            VStack(spacing: 12) {
                ForEach(loanOptions) { option in
                    LoanOptionCard(
                        option: option,
                        isExpanded: expandedItem == option.title,
                        onToggle: {
                            withAnimation(.spring(response: 0.3, dampingFraction: 0.8)) {
                                expandedItem = expandedItem == option.title ? nil : option.title
                            }
                        }
                    )
                }
            }
            .padding(.horizontal)
        }
        .navigationTitle("Lending Options")
        .navigationBarTitleDisplayMode(.inline)
    }
}

struct LoanOption: Identifiable {
    let id = UUID()
    let icon: String
    let title: String
    let headline: String
    let description: String
    let buttonText: String
}

struct LoanOptionCard: View {
    let option: LoanOption
    let isExpanded: Bool
    let onToggle: () -> Void
    
    var body: some View {
        VStack(spacing: 0) {
            // Header Button
            Button(action: onToggle) {
                HStack(spacing: 16) {
                    Circle()
                        .fill(Color.green.opacity(0.2))
                        .frame(width: 44, height: 44)
                        .overlay(
                            Image(systemName: option.icon)
                                .foregroundColor(.green)
                                .font(.system(size: 20))
                        )
                    
                    Text(option.title)
                        .font(.system(size: 16, weight: .semibold))
                        .foregroundColor(.primary)
                    
                    Spacer()
                    
                    Circle()
                        .stroke(Color.gray.opacity(0.3), lineWidth: 2)
                        .frame(width: 28, height: 28)
                        .overlay(
                            Image(systemName: "chevron.down")
                                .font(.system(size: 12))
                                .foregroundColor(.gray)
                                .rotationEffect(.degrees(isExpanded ? 180 : 0))
                        )
                }
                .padding()
            }
            .buttonStyle(PlainButtonStyle())
            
            // Expanded Content
            if isExpanded {
                VStack(alignment: .leading, spacing: 12) {
                    Divider()
                    
                    Text(option.headline)
                        .font(.system(size: 20, weight: .bold))
                    
                    Text(option.description)
                        .font(.system(size: 14))
                        .foregroundColor(.gray)
                    
                    Button(action: {}) {
                        Text(option.buttonText)
                            .font(.system(size: 16, weight: .semibold))
                            .foregroundColor(.white)
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(Color.green)
                            .cornerRadius(12)
                    }
                }
                .padding()
                .transition(.opacity.combined(with: .move(edge: .top)))
            }
        }
        .background(Color.white)
        .cornerRadius(16)
    }
}

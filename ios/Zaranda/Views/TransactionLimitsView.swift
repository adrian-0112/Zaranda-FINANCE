import SwiftUI

struct TransactionLimitsView: View {
    @State private var currentLimit: Double = 5000
    @State private var maxLimit: Double = 10000
    
    var body: some View {
        Form {
            Section {
                VStack(alignment: .leading, spacing: 16) {
                    Text("Current limit")
                        .font(.system(size: 14))
                        .foregroundColor(.gray)
                    
                    Text("$\(Int(currentLimit))")
                        .font(.system(size: 32, weight: .bold))
                    
                    // Progress Bar
                    GeometryReader { geometry in
                        ZStack(alignment: .leading) {
                            Rectangle()
                                .fill(Color.gray.opacity(0.2))
                                .frame(height: 8)
                                .cornerRadius(4)
                            
                            Rectangle()
                                .fill(Color.green)
                                .frame(width: geometry.size.width * (currentLimit / maxLimit), height: 8)
                                .cornerRadius(4)
                        }
                    }
                    .frame(height: 8)
                    
                    Text("$\(Int(maxLimit)) maximum")
                        .font(.system(size: 12))
                        .foregroundColor(.gray)
                }
                .padding(.vertical, 8)
            }
            
            Section {
                Button(action: {}) {
                    Text("Increase limit")
                        .font(.system(size: 16, weight: .semibold))
                        .foregroundColor(.green)
                        .frame(maxWidth: .infinity)
                }
            }
        }
        .navigationTitle("Transaction limits")
        .navigationBarTitleDisplayMode(.inline)
    }
}

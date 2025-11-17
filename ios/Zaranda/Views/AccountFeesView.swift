import SwiftUI

struct AccountFeesView: View {
    var body: some View {
        List {
            Section("Account Fees") {
                FeeRow(title: "Monthly maintenance", amount: "$0.00")
                FeeRow(title: "Account opening", amount: "Free")
            }
            
            Section("Transaction Fees") {
                FeeRow(title: "USDT transfers", amount: "0.1%")
                FeeRow(title: "MXNB transfers", amount: "0.5%")
                FeeRow(title: "Currency swap", amount: "0.2%")
            }
            
            Section("Other Fees") {
                FeeRow(title: "ATM withdrawal", amount: "$2.50")
                FeeRow(title: "International transfer", amount: "1.5%")
            }
        }
        .navigationTitle("Account fees")
        .navigationBarTitleDisplayMode(.inline)
    }
}

struct FeeRow: View {
    let title: String
    let amount: String
    
    var body: some View {
        HStack {
            Text(title)
                .font(.system(size: 16))
            Spacer()
            Text(amount)
                .font(.system(size: 16, weight: .semibold))
                .foregroundColor(.primary)
        }
        .padding(.vertical, 4)
    }
}

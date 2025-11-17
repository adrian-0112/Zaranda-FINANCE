import SwiftUI

struct ReceiveOptionsView: View {
    var body: some View {
        List {
            ReceiveOptionRow(
                icon: "bitcoinsign.circle.fill",
                title: "USDT transfer",
                description: "Receive USDT to your wallet"
            )
            
            ReceiveOptionRow(
                icon: "banknote.fill",
                title: "SPEI transfer",
                description: "Receive MXNB via SPEI"
            )
            
            ReceiveOptionRow(
                icon: "dollarsign.circle.fill",
                title: "ACH/Wire transfer",
                description: "Receive USDT via ACH or Wire"
            )
        }
        .navigationTitle("Receive")
        .navigationBarTitleDisplayMode(.large)
    }
}

struct ReceiveOptionRow: View {
    let icon: String
    let title: String
    let description: String
    
    var body: some View {
        HStack(spacing: 16) {
            Image(systemName: icon)
                .font(.system(size: 28))
                .foregroundColor(.gray)
            
            VStack(alignment: .leading, spacing: 4) {
                Text(title)
                    .font(.system(size: 16, weight: .semibold))
                
                Text(description)
                    .font(.system(size: 14))
                    .foregroundColor(.gray)
            }
            
            Spacer()
            
            Image(systemName: "chevron.right")
                .foregroundColor(.gray)
        }
        .padding(.vertical, 8)
    }
}

import SwiftUI

struct SendOptionsView: View {
    @State private var showMexicanRecipient = false
    @State private var showUsRecipient = false
    @State private var showCryptoRecipient = false
    @State private var showZarandaTransfer = false
    
    var body: some View {
        List {
            SendOptionRow(
                icon: "🇲🇽",
                title: "Mexico bank transfer",
                description: "Send MXNB to any bank account",
                deliveryTime: "Est. delivery: 1-3 business days"
            ) {
                showMexicanRecipient = true
            }
            
            SendOptionRow(
                icon: "🇺🇸",
                title: "U.S. dollar transfer",
                description: "Send USDT to U.S. accounts",
                deliveryTime: "Est. delivery: 1-3 business days"
            ) {
                showUsRecipient = true
            }
            
            SendOptionRow(
                icon: "bitcoinsign.circle.fill",
                title: "Cryptocurrency",
                description: "Send USDT to any external wallet",
                deliveryTime: "Est. delivery: 5-10 minutes"
            ) {
                showCryptoRecipient = true
            }
            
            SendOptionRow(
                icon: "banknote.fill",
                title: "Zaranda Transfer",
                description: "Send funds instantly to any Zaranda account",
                deliveryTime: "Est. delivery: Instant"
            ) {
                showZarandaTransfer = true
            }
        }
        .navigationTitle("Send")
        .navigationBarTitleDisplayMode(.large)
        .navigationDestination(isPresented: $showMexicanRecipient) {
            AddMexicanRecipientView()
        }
        .navigationDestination(isPresented: $showUsRecipient) {
            AddUsRecipientView()
        }
        .navigationDestination(isPresented: $showCryptoRecipient) {
            AddCryptoRecipientView()
        }
        .navigationDestination(isPresented: $showZarandaTransfer) {
            RecipientsView()
        }
    }
}

struct SendOptionRow: View {
    let icon: String
    let title: String
    let description: String
    let deliveryTime: String
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            HStack(spacing: 16) {
                if icon.count == 1 {
                    Text(icon)
                        .font(.system(size: 32))
                } else {
                    Image(systemName: icon)
                        .font(.system(size: 28))
                        .foregroundColor(.gray)
                }
                
                VStack(alignment: .leading, spacing: 4) {
                    Text(title)
                        .font(.system(size: 16, weight: .semibold))
                        .foregroundColor(.primary)
                    
                    Text(description)
                        .font(.system(size: 14))
                        .foregroundColor(.gray)
                    
                    Text(deliveryTime)
                        .font(.system(size: 12))
                        .foregroundColor(.gray)
                }
                
                Spacer()
                
                Image(systemName: "chevron.right")
                    .foregroundColor(.gray)
            }
            .padding(.vertical, 8)
        }
        .buttonStyle(PlainButtonStyle())
    }
}

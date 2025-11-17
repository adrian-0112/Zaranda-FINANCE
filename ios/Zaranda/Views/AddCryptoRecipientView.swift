import SwiftUI

struct AddCryptoRecipientView: View {
    @State private var walletAddress = ""
    @State private var network = "Ethereum"
    
    private let networks = ["Ethereum", "Polygon", "BSC"]
    
    var body: some View {
        Form {
            Section("Wallet Information") {
                TextField("Wallet Address", text: $walletAddress)
                    .autocapitalization(.none)
                    .autocorrectionDisabled()
                
                Picker("Network", selection: $network) {
                    ForEach(networks, id: \.self) { network in
                        Text(network).tag(network)
                    }
                }
            }
            
            Section {
                Button(action: {}) {
                    Text("Continue")
                        .font(.system(size: 16, weight: .semibold))
                        .foregroundColor(.green)
                        .frame(maxWidth: .infinity)
                }
            }
        }
        .navigationTitle("Cryptocurrency Transfer")
        .navigationBarTitleDisplayMode(.inline)
    }
}

import SwiftUI

struct AccountStatementsView: View {
    @State private var selectedTab = 0
    @State private var usdtEmailEnabled = true
    @State private var mxnbEmailEnabled = true
    
    var body: some View {
        VStack(spacing: 0) {
            // Segmented Picker
            Picker("Currency", selection: $selectedTab) {
                Text("USDT").tag(0)
                Text("MXNB").tag(1)
            }
            .pickerStyle(.segmented)
            .padding()
            
            // Content
            ScrollView {
                VStack(spacing: 16) {
                    // Email Toggle Card
                    VStack(alignment: .leading, spacing: 8) {
                        HStack {
                            VStack(alignment: .leading, spacing: 4) {
                                Text("Get via email")
                                    .font(.system(size: 18, weight: .semibold))
                                Text("Receive monthly statements")
                                    .font(.system(size: 14))
                                    .foregroundColor(.gray)
                            }
                            Spacer()
                            Toggle("", isOn: selectedTab == 0 ? $usdtEmailEnabled : $mxnbEmailEnabled)
                                .labelsHidden()
                        }
                    }
                    .padding()
                    .background(Color.white)
                    .cornerRadius(16)
                    
                    // Empty State
                    VStack {
                        Text("Account statements will appear here.")
                            .font(.system(size: 14))
                            .foregroundColor(.gray)
                    }
                    .frame(maxWidth: .infinity)
                    .padding(.top, 40)
                }
                .padding()
            }
        }
        .background(Color.gray.opacity(0.1))
        .navigationTitle("Account statements")
        .navigationBarTitleDisplayMode(.inline)
    }
}

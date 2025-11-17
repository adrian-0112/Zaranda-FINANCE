import SwiftUI

struct SwapView: View {
    @EnvironmentObject var walletManager: WalletManager
    @State private var fromAmount = ""
    @State private var toAmount = ""
    @State private var fromCurrency: Currency = .usdt
    @State private var toCurrency: Currency = .mxnb
    
    var body: some View {
        ScrollView {
            VStack(spacing: 24) {
                Text("Swap Currencies")
                    .font(.system(size: 28, weight: .bold))
                    .padding(.top)
                
                // From Currency
                VStack(alignment: .leading, spacing: 8) {
                    Text("From")
                        .font(.system(size: 14))
                        .foregroundColor(.gray)
                    
                    HStack {
                        TextField("0.00", text: $fromAmount)
                            .font(.system(size: 32, weight: .bold))
                            .keyboardType(.decimalPad)
                        
                        Picker("", selection: $fromCurrency) {
                            Text("USDT").tag(Currency.usdt)
                            Text("MXNB").tag(Currency.mxnb)
                        }
                        .pickerStyle(.menu)
                    }
                }
                .padding()
                .background(Color.gray.opacity(0.1))
                .cornerRadius(16)
                
                // Swap Button
                Button(action: swapCurrencies) {
                    Image(systemName: "arrow.up.arrow.down")
                        .font(.system(size: 24))
                        .foregroundColor(.white)
                        .frame(width: 56, height: 56)
                        .background(Color.green)
                        .clipShape(Circle())
                }
                
                // To Currency
                VStack(alignment: .leading, spacing: 8) {
                    Text("To")
                        .font(.system(size: 14))
                        .foregroundColor(.gray)
                    
                    HStack {
                        TextField("0.00", text: $toAmount)
                            .font(.system(size: 32, weight: .bold))
                            .keyboardType(.decimalPad)
                            .disabled(true)
                        
                        Picker("", selection: $toCurrency) {
                            Text("USDT").tag(Currency.usdt)
                            Text("MXNB").tag(Currency.mxnb)
                        }
                        .pickerStyle(.menu)
                    }
                }
                .padding()
                .background(Color.gray.opacity(0.1))
                .cornerRadius(16)
                
                // Exchange Rate Info
                VStack(spacing: 8) {
                    Text("Exchange Rate")
                        .font(.system(size: 14))
                        .foregroundColor(.gray)
                    Text("1 USDT = 18.45 MXNB")
                        .font(.system(size: 16, weight: .semibold))
                }
                .padding()
                .frame(maxWidth: .infinity)
                .background(Color.gray.opacity(0.1))
                .cornerRadius(16)
                
                // Swap Button
                Button(action: {}) {
                    Text("Swap")
                        .font(.system(size: 18, weight: .bold))
                        .foregroundColor(.white)
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(Color.green)
                        .cornerRadius(25)
                }
            }
            .padding()
        }
        .background(Color.gray.opacity(0.1))
        .navigationTitle("Swap")
        .navigationBarTitleDisplayMode(.inline)
    }
    
    private func swapCurrencies() {
        let temp = fromCurrency
        fromCurrency = toCurrency
        toCurrency = temp
        
        let tempAmount = fromAmount
        fromAmount = toAmount
        toAmount = tempAmount
    }
}

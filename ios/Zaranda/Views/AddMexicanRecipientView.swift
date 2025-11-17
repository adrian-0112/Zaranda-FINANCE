import SwiftUI

struct AddMexicanRecipientView: View {
    @State private var accountType = 0
    @State private var name = ""
    @State private var clabe = ""
    @State private var bank = ""
    
    private let accountTypes = ["Individual", "Business"]
    
    var body: some View {
        Form {
            Section {
                Picker("Account Type", selection: $accountType) {
                    ForEach(0..<accountTypes.count, id: \.self) { index in
                        Text(accountTypes[index]).tag(index)
                    }
                }
                .pickerStyle(.segmented)
            }
            
            Section("Recipient Information") {
                TextField("Full Name", text: $name)
                TextField("CLABE", text: $clabe)
                    .keyboardType(.numberPad)
                TextField("Bank", text: $bank)
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
        .navigationTitle("Mexico Bank Transfer")
        .navigationBarTitleDisplayMode(.inline)
    }
}

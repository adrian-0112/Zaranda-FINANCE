import SwiftUI

struct PersonalDetailsView: View {
    var body: some View {
        Form {
            Section("Account") {
                InfoRow(label: "ZarandaTag", value: "@adriaaan", clickable: true)
            }
            
            Section("Personal details") {
                InfoRow(label: "First name", value: "Adrián")
                InfoRow(label: "Last name", value: "Vargas")
                InfoRow(label: "Date of birth", value: "December 01, 2004")
                InfoRow(label: "Phone number", value: "525512347431")
                InfoRow(label: "Legal ID", value: "BEVA041201HDFNRDA4")
                InfoRow(
                    label: "Email",
                    value: "adrian.compras0112@gmail.com",
                    subValue: HStack(spacing: 4) {
                        Image(systemName: "checkmark.seal.fill")
                            .foregroundColor(.green)
                            .font(.system(size: 12))
                        Text("Verified")
                            .font(.system(size: 12, weight: .medium))
                            .foregroundColor(.green)
                    },
                    clickable: true
                )
                InfoRow(label: "Sex", value: "Male", clickable: true)
            }
            
            Section("Residence address") {
                InfoRow(label: "Full address", value: "Avenida Centenario 2702, Bosques de...", clickable: true)
            }
            
            Section {
                Button(action: {}) {
                    HStack {
                        Image(systemName: "heart.slash.fill")
                            .foregroundColor(.red)
                        Text("Close account")
                            .foregroundColor(.red)
                    }
                }
            }
        }
        .navigationTitle("Personal details")
        .navigationBarTitleDisplayMode(.inline)
    }
}

struct InfoRow: View {
    let label: String
    let value: String
    var subValue: AnyView? = nil
    var clickable: Bool = false
    
    init(label: String, value: String, subValue: AnyView? = nil, clickable: Bool = false) {
        self.label = label
        self.value = value
        self.subValue = subValue
        self.clickable = clickable
    }
    
    init<Content: View>(label: String, value: String, @ViewBuilder subValue: () -> Content, clickable: Bool = false) {
        self.label = label
        self.value = value
        self.subValue = AnyView(subValue())
        self.clickable = clickable
    }
    
    var body: some View {
        HStack {
            VStack(alignment: .leading, spacing: 4) {
                Text(label)
                    .font(.system(size: 12))
                    .foregroundColor(.gray)
                Text(value)
                    .font(.system(size: 16, weight: .medium))
                    .foregroundColor(.primary)
                if let subValue = subValue {
                    subValue
                }
            }
            Spacer()
            if clickable {
                Image(systemName: "chevron.right")
                    .foregroundColor(.gray)
                    .font(.system(size: 12))
            }
        }
        .padding(.vertical, 4)
    }
}

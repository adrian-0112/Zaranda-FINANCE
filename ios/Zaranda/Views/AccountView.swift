import SwiftUI

struct AccountView: View {
    @Environment(\.dismiss) var dismiss
    @State private var showPersonalDetails = false
    @State private var showTransactionLimits = false
    @State private var showAccountFees = false
    @State private var showAccountStatements = false
    @State private var showSecurity = false
    @State private var notificationsEnabled = true
    
    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 24) {
                    // Profile Section
                    VStack(spacing: 12) {
                        Circle()
                            .fill(Color.green)
                            .frame(width: 80, height: 80)
                            .overlay(
                                Text("AV")
                                    .font(.system(size: 32, weight: .bold))
                                    .foregroundColor(.white)
                            )
                        
                        Text("Adrián Vargas")
                            .font(.system(size: 24, weight: .bold))
                        
                        HStack(spacing: 4) {
                            Text("$adriaaan")
                                .font(.system(size: 16, weight: .semibold))
                                .foregroundColor(.green)
                            Image(systemName: "checkmark.seal.fill")
                                .foregroundColor(.green)
                                .font(.system(size: 16))
                        }
                    }
                    .padding(.top)
                    
                    // Premium Card
                    VStack(alignment: .leading, spacing: 12) {
                        Text("Zaranda Premium")
                            .font(.system(size: 18, weight: .bold))
                            .foregroundColor(.white)
                        
                        Text("Unlock exclusive rewards: lower fees, cashback, and more.")
                            .font(.system(size: 14))
                            .foregroundColor(.white.opacity(0.8))
                        
                        HStack {
                            Text("Upgrade to Premium")
                                .font(.system(size: 14, weight: .semibold))
                            Image(systemName: "arrow.right")
                                .font(.system(size: 12))
                        }
                        .foregroundColor(.green)
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding()
                    .background(Color.gray.opacity(0.8))
                    .cornerRadius(16)
                    
                    // Help Center
                    AccountRow(icon: "questionmark.circle.fill", title: "Help Center")
                    
                    // Account Details Section
                    VStack(spacing: 0) {
                        AccountRow(
                            icon: "person.fill",
                            title: "Personal details",
                            action: { showPersonalDetails = true }
                        )
                        Divider()
                        AccountRow(
                            icon: "chart.bar.fill",
                            title: "Transaction limits",
                            action: { showTransactionLimits = true }
                        )
                        Divider()
                        AccountRow(
                            icon: "dollarsign.circle.fill",
                            title: "Account fees",
                            action: { showAccountFees = true }
                        )
                        Divider()
                        AccountRow(
                            icon: "doc.text.fill",
                            title: "Account statements",
                            action: { showAccountStatements = true }
                        )
                        Divider()
                        AccountRow(icon: "star.fill", title: "Membership", subtitle: "Standard")
                    }
                    .background(Color.white)
                    .cornerRadius(16)
                    
                    // Promo Code
                    AccountRow(icon: "tag.fill", title: "Enter a promo code")
                    
                    // App Settings Section
                    VStack(spacing: 0) {
                        AccountRow(
                            icon: "bell.fill",
                            title: "Allow push notifications",
                            trailing: {
                                Toggle("", isOn: $notificationsEnabled)
                                    .labelsHidden()
                            }
                        )
                        Divider()
                        AccountRow(
                            icon: "lock.fill",
                            title: "Security",
                            action: { showSecurity = true }
                        )
                        Divider()
                        AccountRow(icon: "paintbrush.fill", title: "Appearance", subtitle: "Light mode")
                        Divider()
                        AccountRow(icon: "arrow.right.square.fill", title: "Sign out")
                    }
                    .background(Color.white)
                    .cornerRadius(16)
                    
                    // Footer
                    VStack(spacing: 16) {
                        Text("Terms and Conditions and Privacy Policy")
                            .font(.system(size: 12))
                            .foregroundColor(.gray)
                        
                        HStack(spacing: 16) {
                            Image(systemName: "camera.fill")
                            Image(systemName: "at")
                        }
                        .foregroundColor(.gray)
                        
                        Text("v1.0.0")
                            .font(.system(size: 14))
                            .foregroundColor(.gray)
                    }
                    .padding(.top)
                }
                .padding()
            }
            .background(Color.gray.opacity(0.1))
            .navigationTitle("My Account")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Done") {
                        dismiss()
                    }
                }
            }
            .navigationDestination(isPresented: $showPersonalDetails) {
                PersonalDetailsView()
            }
            .navigationDestination(isPresented: $showTransactionLimits) {
                TransactionLimitsView()
            }
            .navigationDestination(isPresented: $showAccountFees) {
                AccountFeesView()
            }
            .navigationDestination(isPresented: $showAccountStatements) {
                AccountStatementsView()
            }
            .navigationDestination(isPresented: $showSecurity) {
                SecurityView()
            }
        }
    }
}

struct AccountRow<Content: View>: View {
    let icon: String
    let title: String
    var subtitle: String? = nil
    var action: (() -> Void)? = nil
    var trailing: Content? = nil
    
    init(icon: String, title: String, subtitle: String? = nil, action: (() -> Void)? = nil, @ViewBuilder trailing: () -> Content = { EmptyView() }) {
        self.icon = icon
        self.title = title
        self.subtitle = subtitle
        self.action = action
        self.trailing = trailing()
    }
    
    var body: some View {
        Button(action: action ?? {}) {
            HStack(spacing: 16) {
                Image(systemName: icon)
                    .font(.system(size: 20))
                    .foregroundColor(.gray)
                    .frame(width: 24)
                
                VStack(alignment: .leading, spacing: 4) {
                    Text(title)
                        .font(.system(size: 16, weight: .semibold))
                        .foregroundColor(.primary)
                    
                    if let subtitle = subtitle {
                        Text(subtitle)
                            .font(.system(size: 14))
                            .foregroundColor(.gray)
                    }
                }
                
                Spacer()
                
                if let trailing = trailing {
                    trailing
                } else if action != nil {
                    Image(systemName: "chevron.right")
                        .foregroundColor(.gray)
                        .font(.system(size: 12))
                }
            }
            .padding()
        }
        .buttonStyle(PlainButtonStyle())
        .disabled(action == nil && trailing == nil)
    }
}

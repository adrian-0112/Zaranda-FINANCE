import SwiftUI

struct TransactionsView: View {
    let wallet: Wallet
    @State private var fromDate: Date? = nil
    @State private var untilDate: Date? = nil
    @State private var showFromDatePicker = false
    @State private var showUntilDatePicker = false
    @State private var selectedFilter = "All"
    @State private var searchText = ""
    @State private var isLoading = false
    
    private let filters = ["All", "Deposits", "Swaps", "Sends"]
    private var transactions: [Transaction] {
        Transaction.mockTransactions[wallet.currency] ?? []
    }
    
    private var filteredTransactions: [Transaction] {
        var filtered = transactions
        
        // Filter by type
        if selectedFilter != "All" {
            filtered = filtered.filter { transaction in
                switch selectedFilter {
                case "Deposits":
                    return transaction.type == .receive
                case "Swaps":
                    return transaction.type == .swap
                case "Sends":
                    return transaction.type == .send
                default:
                    return true
                }
            }
        }
        
        // Filter by search
        if !searchText.isEmpty {
            filtered = filtered.filter { transaction in
                transaction.title.localizedCaseInsensitiveContains(searchText)
            }
        }
        
        // Filter by date range
        if let fromDate = fromDate {
            // Simple date filtering - in production, parse transaction dates properly
        }
        if let untilDate = untilDate {
            // Simple date filtering
        }
        
        return filtered
    }
    
    var body: some View {
        ZStack {
            VStack(spacing: 0) {
                // Header
                HStack {
                    Button(action: {}) {
                        Image(systemName: "chevron.left")
                            .foregroundColor(.primary)
                    }
                    Spacer()
                    Text("\(wallet.currency.rawValue) Transactions")
                        .font(.system(size: 20, weight: .bold))
                    Spacer()
                    Button(action: {}) {
                        Image(systemName: "chevron.left")
                            .foregroundColor(.clear)
                    }
                }
                .padding()
                
                ScrollView {
                    VStack(spacing: 16) {
                        // Wallet Summary
                        HStack {
                            HStack(spacing: 12) {
                                Text(wallet.flag)
                                    .font(.system(size: 32))
                                VStack(alignment: .leading) {
                                    Text("\(wallet.balance) \(wallet.currency.rawValue)")
                                        .font(.system(size: 20, weight: .bold))
                                    Text("\(wallet.name) Wallet")
                                        .font(.system(size: 14))
                                        .foregroundColor(.gray)
                                }
                            }
                            Spacer()
                            VStack {
                                Image(systemName: "doc.text.fill")
                                    .font(.system(size: 28))
                                Text("Periodic statement")
                                    .font(.system(size: 12))
                                    .foregroundColor(.gray)
                            }
                        }
                        .padding()
                        .background(Color.white)
                        .cornerRadius(16)
                        
                        // Date Filters
                        HStack(spacing: 12) {
                            DateFilterButton(
                                label: "From",
                                date: fromDate,
                                action: { showFromDatePicker = true }
                            )
                            
                            DateFilterButton(
                                label: "Until",
                                date: untilDate,
                                action: { showUntilDatePicker = true }
                            )
                            
                            Button(action: refreshTransactions) {
                                Image(systemName: "arrow.clockwise")
                                    .font(.system(size: 20))
                                    .foregroundColor(.primary)
                                    .frame(width: 44, height: 44)
                                    .background(Color.gray.opacity(0.1))
                                    .cornerRadius(8)
                            }
                            .disabled(isLoading)
                        }
                        
                        // Type Filters
                        ScrollView(.horizontal, showsIndicators: false) {
                            HStack(spacing: 8) {
                                ForEach(filters, id: \.self) { filter in
                                    FilterChip(
                                        title: filter,
                                        isSelected: selectedFilter == filter,
                                        action: { selectedFilter = filter }
                                    )
                                }
                            }
                        }
                        
                        // Search Bar
                        HStack {
                            Image(systemName: "magnifyingglass")
                                .foregroundColor(.gray)
                            TextField("Search by name or description", text: $searchText)
                        }
                        .padding()
                        .background(Color.gray.opacity(0.1))
                        .cornerRadius(12)
                        
                        // Transaction List
                        if filteredTransactions.isEmpty {
                            VStack(spacing: 16) {
                                Image(systemName: "list.bullet")
                                    .font(.system(size: 40))
                                    .foregroundColor(.gray)
                                Text("No Transactions Found")
                                    .font(.system(size: 18, weight: .semibold))
                                Text("Your transactions will appear here once you make them.")
                                    .font(.system(size: 14))
                                    .foregroundColor(.gray)
                                    .multilineTextAlignment(.center)
                            }
                            .padding(.top, 40)
                        } else {
                            VStack(spacing: 0) {
                                ForEach(filteredTransactions) { transaction in
                                    TransactionRow(transaction: transaction)
                                    if transaction.id != filteredTransactions.last?.id {
                                        Divider()
                                    }
                                }
                            }
                            .background(Color.white)
                            .cornerRadius(16)
                        }
                    }
                    .padding()
                }
            }
            
            if isLoading {
                Color.black.opacity(0.2)
                    .ignoresSafeArea()
                ProgressView()
                    .scaleEffect(1.5)
            }
        }
        .background(Color.gray.opacity(0.1))
        .sheet(isPresented: $showFromDatePicker) {
            DatePickerSheet(
                date: $fromDate,
                title: "Select From Date"
            )
        }
        .sheet(isPresented: $showUntilDatePicker) {
            DatePickerSheet(
                date: $untilDate,
                title: "Select Until Date"
            )
        }
    }
    
    private func refreshTransactions() {
        isLoading = true
        DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) {
            isLoading = false
        }
    }
}

struct DateFilterButton: View {
    let label: String
    let date: Date?
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            VStack(alignment: .leading, spacing: 4) {
                Text(label)
                    .font(.system(size: 12))
                    .foregroundColor(.gray)
                Text(date != nil ? formatDate(date!) : "Select Date")
                    .font(.system(size: 14, weight: .semibold))
                    .foregroundColor(.primary)
            }
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding()
            .background(Color.gray.opacity(0.1))
            .cornerRadius(12)
        }
    }
    
    private func formatDate(_ date: Date) -> String {
        let formatter = DateFormatter()
        formatter.dateFormat = "MMM / dd / yyyy"
        return formatter.string(from: date)
    }
}

struct FilterChip: View {
    let title: String
    let isSelected: Bool
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            Text(title)
                .font(.system(size: 14, weight: .semibold))
                .foregroundColor(isSelected ? .white : .primary)
                .padding(.horizontal, 16)
                .padding(.vertical, 8)
                .background(isSelected ? Color.black : Color.gray.opacity(0.1))
                .cornerRadius(8)
        }
    }
}

struct TransactionRow: View {
    let transaction: Transaction
    
    var body: some View {
        HStack(spacing: 12) {
            // Icon
            Image(systemName: iconName)
                .font(.system(size: 20))
                .foregroundColor(iconColor)
                .frame(width: 32)
            
            // Details
            VStack(alignment: .leading, spacing: 4) {
                Text(transaction.title.uppercased())
                    .font(.system(size: 14, weight: .semibold))
                Text(transaction.date)
                    .font(.system(size: 14))
                    .foregroundColor(.gray)
            }
            
            Spacer()
            
            // Amount
            Text("\(transaction.amount >= 0 ? "+" : "")\(String(format: "%.2f", transaction.amount)) \(transaction.currency.rawValue)")
                .font(.system(size: 14, weight: .semibold))
                .foregroundColor(transaction.amount >= 0 ? .green : .primary)
        }
        .padding()
    }
    
    private var iconName: String {
        switch transaction.type {
        case .send:
            return "arrow.up"
        case .receive:
            return "arrow.down"
        case .swap:
            return "arrow.left.arrow.right"
        }
    }
    
    private var iconColor: Color {
        switch transaction.type {
        case .send:
            return .primary
        case .receive:
            return .green
        case .swap:
            return .blue
        }
    }
}

struct DatePickerSheet: View {
    @Binding var date: Date?
    let title: String
    @Environment(\.dismiss) var dismiss
    @State private var selectedDate = Date()
    
    var body: some View {
        NavigationStack {
            VStack {
                DatePicker("", selection: $selectedDate, displayedComponents: .date)
                    .datePickerStyle(.graphical)
                    .padding()
                
                Spacer()
            }
            .navigationTitle(title)
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Button("Cancel") {
                        dismiss()
                    }
                }
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Done") {
                        date = selectedDate
                        dismiss()
                    }
                }
            }
        }
    }
}

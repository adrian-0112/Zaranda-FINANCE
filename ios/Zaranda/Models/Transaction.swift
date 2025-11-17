import Foundation

enum TransactionType: String, Codable {
    case send
    case receive
    case swap
}

struct Transaction: Identifiable, Codable {
    let id = UUID()
    let type: TransactionType
    let title: String
    let date: String
    let amount: Double
    let currency: Currency
}

extension Transaction {
    static let mockTransactions: [Currency: [Transaction]] = [
        .usdt: [
            Transaction(type: .send, title: "Sent to 0x123...abc", date: "November 09", amount: -50.00, currency: .usdt),
            Transaction(type: .receive, title: "Received from Boveda", date: "November 09", amount: 150.00, currency: .usdt),
            Transaction(type: .swap, title: "Swap to MXNB", date: "November 08", amount: -25.50, currency: .usdt),
            Transaction(type: .send, title: "Sent to Friend", date: "November 07", amount: -10.00, currency: .usdt)
        ],
        .mxnb: [
            Transaction(type: .send, title: "CARGO AUNTAPI MEXICO S DE RL DE CV", date: "November 08", amount: -150.00, currency: .mxnb),
            Transaction(type: .receive, title: "Pago desde Bóveda", date: "November 08", amount: 150.00, currency: .mxnb),
            Transaction(type: .send, title: "CARGO EN TRANSITO AVAST *AVP1649444476", date: "November 07", amount: 0.00, currency: .mxnb),
            Transaction(type: .send, title: "CARGO OPERADORA LONA S.A. DE C.V.", date: "November 07", amount: -33.50, currency: .mxnb)
        ]
    ]
}

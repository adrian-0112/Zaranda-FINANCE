import Foundation

enum Currency: String, Codable {
    case usdt = "USDT"
    case mxnb = "MXNB"
}

struct Wallet: Identifiable, Codable {
    let id = UUID()
    let currency: Currency
    var balance: String
    let flag: String
    let name: String
}

extension Wallet {
    static let mockWallets: [Wallet] = [
        Wallet(currency: .usdt, balance: "0.00", flag: "🇺🇸", name: "Main"),
        Wallet(currency: .mxnb, balance: "26.18", flag: "🇲🇽", name: "Main")
    ]
}

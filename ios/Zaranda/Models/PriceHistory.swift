import Foundation

enum Trend: String, Codable {
    case up
    case down
}

struct PriceHistoryData: Identifiable {
    let id = UUID()
    let period: String
    let buy: Double
    let sell: Double
    let changeValue: Double
    let changePercent: Double
    let periodLabel: String
    let trend: Trend
    let chartData: [Double]
}

extension PriceHistoryData {
    static let mockData: [String: PriceHistoryData] = [
        "1d": PriceHistoryData(
            period: "1d",
            buy: 18.4517,
            sell: 18.4217,
            changeValue: -0.01,
            changePercent: 0.05,
            periodLabel: "Today",
            trend: .down,
            chartData: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 20, 35, 30, 45, 40, 60, 55]
        ),
        "1w": PriceHistoryData(
            period: "1w",
            buy: 18.4385,
            sell: 18.4327,
            changeValue: -0.13,
            changePercent: 0.69,
            periodLabel: "Past week",
            trend: .down,
            chartData: [60, 55, 65, 50, 70, 80, 75, 70, 65, 60, 70, 65, 60, 55, 50, 45, 50, 55, 40, 35, 40, 50, 45, 60]
        ),
        "1m": PriceHistoryData(
            period: "1m",
            buy: 18.4385,
            sell: 18.4327,
            changeValue: 0.04,
            changePercent: 0.24,
            periodLabel: "Past month",
            trend: .up,
            chartData: [30, 40, 35, 50, 45, 60, 55, 70, 80, 75, 65, 60, 55, 65, 70, 60, 50, 45, 55, 65, 75, 90, 85, 80]
        )
    ]
}

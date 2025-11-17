import SwiftUI
import Charts

struct ExchangeChartView: View {
    @State private var selectedPeriod = "1d"
    @State private var priceData: PriceHistoryData? = nil
    
    private let periods = ["1d", "1w", "1m"]
    
    var body: some View {
        ScrollView {
            VStack(spacing: 24) {
                // Price Info
                if let data = priceData {
                    VStack(spacing: 16) {
                        Text("USDT / MXNB")
                            .font(.system(size: 24, weight: .bold))
                        
                        HStack(spacing: 24) {
                            VStack(alignment: .leading) {
                                Text("Buy")
                                    .font(.system(size: 12))
                                    .foregroundColor(.gray)
                                Text(String(format: "%.4f", data.buy))
                                    .font(.system(size: 20, weight: .bold))
                            }
                            
                            VStack(alignment: .leading) {
                                Text("Sell")
                                    .font(.system(size: 12))
                                    .foregroundColor(.gray)
                                Text(String(format: "%.4f", data.sell))
                                    .font(.system(size: 20, weight: .bold))
                            }
                        }
                        
                        HStack(spacing: 8) {
                            Image(systemName: data.trend == .up ? "arrow.up" : "arrow.down")
                                .foregroundColor(data.trend == .up ? .green : .red)
                            Text("\(data.trend == .up ? "+" : "")\(String(format: "%.2f", data.changeValue))")
                                .foregroundColor(data.trend == .up ? .green : .red)
                            Text("(\(String(format: "%.2f", abs(data.changePercent)))%)")
                                .foregroundColor(.gray)
                        }
                        .font(.system(size: 16, weight: .semibold))
                    }
                    .padding()
                    .background(Color.white)
                    .cornerRadius(16)
                }
                
                // Period Picker
                Picker("Period", selection: $selectedPeriod) {
                    ForEach(periods, id: \.self) { period in
                        Text(period.uppercased()).tag(period)
                    }
                }
                .pickerStyle(.segmented)
                .onChange(of: selectedPeriod) { newValue in
                    loadData(for: newValue)
                }
                
                // Chart
                if let data = priceData {
                    Chart {
                        ForEach(Array(data.chartData.enumerated()), id: \.offset) { index, value in
                            LineMark(
                                x: .value("Time", index),
                                y: .value("Price", value)
                            )
                            .foregroundStyle(Color.green)
                            .interpolationMethod(.catmullRom)
                        }
                    }
                    .frame(height: 300)
                    .padding()
                    .background(Color.white)
                    .cornerRadius(16)
                }
            }
            .padding()
        }
        .background(Color.gray.opacity(0.1))
        .navigationTitle("Exchange Rate")
        .navigationBarTitleDisplayMode(.inline)
        .onAppear {
            loadData(for: selectedPeriod)
        }
    }
    
    private func loadData(for period: String) {
        // Simulate loading delay
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
            priceData = PriceHistoryData.mockData[period]
        }
    }
}

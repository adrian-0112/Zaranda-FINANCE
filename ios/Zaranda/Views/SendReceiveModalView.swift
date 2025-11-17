import SwiftUI

struct SendReceiveModalView: View {
    @Environment(\.dismiss) var dismiss
    @State private var showSendOptions = false
    @State private var showReceiveOptions = false
    
    var body: some View {
        NavigationStack {
            VStack(spacing: 24) {
                // Send Button
                NavigationLink(destination: SendOptionsView()) {
                    HStack {
                        Image(systemName: "arrow.up.circle.fill")
                            .font(.system(size: 32))
                        Text("Send")
                            .font(.system(size: 24, weight: .bold))
                    }
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(Color.green)
                    .cornerRadius(16)
                }
                
                // Receive Button
                NavigationLink(destination: ReceiveOptionsView()) {
                    HStack {
                        Image(systemName: "arrow.down.circle.fill")
                            .font(.system(size: 32))
                        Text("Receive")
                            .font(.system(size: 24, weight: .bold))
                    }
                    .foregroundColor(.green)
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(Color.green.opacity(0.1))
                    .overlay(
                        RoundedRectangle(cornerRadius: 16)
                            .stroke(Color.green, lineWidth: 2)
                    )
                    .cornerRadius(16)
                }
            }
            .padding()
            .navigationTitle("Send or Receive")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Done") {
                        dismiss()
                    }
                }
            }
        }
    }
}

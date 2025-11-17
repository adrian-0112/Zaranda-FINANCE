import SwiftUI

struct SecurityView: View {
    @State private var biometricsEnabled = true
    
    var body: some View {
        List {
            HStack {
                Image(systemName: "faceid")
                    .font(.system(size: 20))
                    .foregroundColor(.gray)
                    .frame(width: 24)
                
                Text("Sign in with FaceID")
                    .font(.system(size: 16, weight: .semibold))
                
                Spacer()
                
                Toggle("", isOn: $biometricsEnabled)
                    .labelsHidden()
            }
            
            NavigationLink(destination: Text("Change Passcode")) {
                HStack {
                    Image(systemName: "key.fill")
                        .font(.system(size: 20))
                        .foregroundColor(.gray)
                        .frame(width: 24)
                    
                    Text("Change passcode")
                        .font(.system(size: 16, weight: .semibold))
                }
            }
        }
        .navigationTitle("Security")
        .navigationBarTitleDisplayMode(.inline)
    }
}

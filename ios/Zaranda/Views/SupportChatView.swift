import SwiftUI

struct SupportChatView: View {
    @Environment(\.dismiss) var dismiss
    @State private var messages: [ChatMessage] = [
        ChatMessage(sender: .bot, text: "Hello! I'm Zaranda's AI assistant. I can help you with questions about how to send money, check your balance, or use any feature. How can I help you today?")
    ]
    @State private var inputText = ""
    @State private var isLoading = false
    
    var body: some View {
        VStack(spacing: 0) {
            // Header
            HStack {
                Spacer()
                Text("Support Chat")
                    .font(.system(size: 18, weight: .bold))
                Spacer()
                Button(action: { dismiss() }) {
                    Image(systemName: "xmark")
                        .foregroundColor(.gray)
                }
            }
            .padding()
            .background(Color.gray.opacity(0.1))
            
            // Messages
            ScrollViewReader { proxy in
                ScrollView {
                    VStack(spacing: 16) {
                        ForEach(messages) { message in
                            ChatBubble(message: message)
                        }
                        
                        if isLoading {
                            HStack {
                                LoadingDots()
                                Spacer()
                            }
                        }
                    }
                    .padding()
                }
                .onChange(of: messages.count) { _ in
                    if let lastMessage = messages.last {
                        withAnimation {
                            proxy.scrollTo(lastMessage.id, anchor: .bottom)
                        }
                    }
                }
            }
            
            // Input Area
            HStack(spacing: 12) {
                TextField("Type your message...", text: $inputText)
                    .textFieldStyle(.roundedBorder)
                
                Button(action: sendMessage) {
                    Image(systemName: "paperplane.fill")
                        .foregroundColor(.white)
                        .frame(width: 44, height: 44)
                        .background(inputText.isEmpty ? Color.gray : Color.green)
                        .clipShape(Circle())
                }
                .disabled(inputText.isEmpty || isLoading)
            }
            .padding()
            .background(Color.gray.opacity(0.1))
        }
        .background(Color.black)
        .foregroundColor(.white)
    }
    
    private func sendMessage() {
        guard !inputText.isEmpty else { return }
        
        let userMessage = ChatMessage(sender: .user, text: inputText)
        messages.append(userMessage)
        inputText = ""
        isLoading = true
        
        // Simulate bot response
        DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) {
            let botMessage = ChatMessage(
                sender: .bot,
                text: "I understand you're asking about '\(userMessage.text)'. This is a mock response. In a real implementation, this would connect to an AI service."
            )
            messages.append(botMessage)
            isLoading = false
        }
    }
}

struct ChatMessage: Identifiable {
    let id = UUID()
    let sender: MessageSender
    let text: String
}

enum MessageSender {
    case user
    case bot
}

struct ChatBubble: View {
    let message: ChatMessage
    
    var body: some View {
        HStack {
            if message.sender == .user {
                Spacer()
            }
            
            Text(message.text)
                .padding()
                .background(message.sender == .user ? Color.green : Color.gray.opacity(0.3))
                .cornerRadius(16)
                .frame(maxWidth: UIScreen.main.bounds.width * 0.75, alignment: .leading)
            
            if message.sender == .bot {
                Spacer()
            }
        }
    }
}

struct LoadingDots: View {
    @State private var animating = false
    
    var body: some View {
        HStack(spacing: 4) {
            ForEach(0..<3) { index in
                Circle()
                    .fill(Color.gray)
                    .frame(width: 8, height: 8)
                    .opacity(animating ? 0.3 : 1.0)
                    .animation(
                        Animation.easeInOut(duration: 0.6)
                            .repeatForever()
                            .delay(Double(index) * 0.2),
                        value: animating
                    )
            }
        }
        .onAppear {
            animating = true
        }
    }
}

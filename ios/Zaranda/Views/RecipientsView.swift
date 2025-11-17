import SwiftUI

struct RecipientsView: View {
    @State private var contacts = Contact.mockContacts
    @State private var searchText = ""
    
    var filteredContacts: [Contact] {
        if searchText.isEmpty {
            return contacts
        }
        return contacts.filter { contact in
            contact.name.localizedCaseInsensitiveContains(searchText) ||
            contact.phone.contains(searchText) ||
            (contact.tag?.localizedCaseInsensitiveContains(searchText) ?? false)
        }
    }
    
    var body: some View {
        NavigationStack {
            List(filteredContacts) { contact in
                ContactRow(contact: contact)
            }
            .navigationTitle("Recipients")
            .searchable(text: $searchText, prompt: "Search contacts")
        }
    }
}

struct ContactRow: View {
    let contact: Contact
    
    var body: some View {
        HStack(spacing: 12) {
            // Avatar
            Circle()
                .fill(contact.isRegistered ? Color.green : Color.gray)
                .frame(width: 40, height: 40)
                .overlay(
                    Text(contact.initials)
                        .font(.system(size: 14, weight: .semibold))
                        .foregroundColor(.white)
                )
            
            VStack(alignment: .leading, spacing: 4) {
                Text(contact.name)
                    .font(.system(size: 16, weight: .semibold))
                
                if contact.isRegistered, let tag = contact.tag {
                    HStack(spacing: 4) {
                        Image(systemName: "checkmark.circle.fill")
                            .font(.system(size: 12))
                            .foregroundColor(.green)
                        Text(tag)
                            .font(.system(size: 14))
                            .foregroundColor(.green)
                    }
                } else {
                    Text(contact.phone)
                        .font(.system(size: 14))
                        .foregroundColor(.gray)
                }
            }
            
            Spacer()
        }
        .padding(.vertical, 4)
    }
}

import Foundation

struct Contact: Identifiable, Codable {
    let id = UUID()
    let initials: String
    let name: String
    let tag: String?
    let phone: String
    let isRegistered: Bool
}

extension Contact {
    static let mockContacts: [Contact] = [
        Contact(initials: "YF", name: ". YF", tag: "@mariogiron", phone: "+527626258974", isRegistered: true),
        Contact(initials: "AB", name: "Ari Belt", tag: "@arianabeltran", phone: "5587971523", isRegistered: true),
        Contact(initials: "B", name: "Blanca", tag: "@bapr04", phone: "+525531450832", isRegistered: true),
        Contact(initials: "C", name: "Constanza", tag: "@constanzavaca", phone: "+522224345070", isRegistered: true),
        Contact(initials: "D", name: "Diana", tag: "@dianahernandez44", phone: "+525565269082", isRegistered: true),
        Contact(initials: "MM", name: "Martin Montero YF", tag: "@martinmontero", phone: "+17374651237", isRegistered: true),
        Contact(initials: "H", name: "Horta", tag: nil, phone: "+5215544948207", isRegistered: false),
        Contact(initials: "H", name: "Horta", tag: nil, phone: "+5215546488245", isRegistered: false),
        Contact(initials: "0", name: "00000", tag: nil, phone: "+525527347689", isRegistered: false),
        Contact(initials: ":", name: ":p", tag: nil, phone: "+525596930434", isRegistered: false),
        Contact(initials: "A", name: "AMIA", tag: "@amia", phone: "+52721144", isRegistered: true)
    ]
}

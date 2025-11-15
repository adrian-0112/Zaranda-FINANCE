
export interface Contact {
  initials: string;
  name: string;
  tag?: string;
  phone: string;
  isRegistered: boolean;
}

export const contacts: Contact[] = [
  { initials: 'YF', name: '. YF', tag: '@mariogiron', phone: '+527626258974', isRegistered: true },
  { initials: 'AB', name: 'Ari Belt', tag: '@arianabeltran', phone: '5587971523', isRegistered: true },
  { initials: 'B', name: 'Blanca', tag: '@bapr04', phone: '+525531450832', isRegistered: true },
  { initials: 'C', name: 'Constanza', tag: '@constanzavaca', phone: '+522224345070', isRegistered: true },
  { initials: 'D', name: 'Diana', tag: '@dianahernandez44', phone: '+525565269082', isRegistered: true },
  { initials: 'MM', name: 'Martin Montero YF', tag: '@martinmontero', phone: '+17374651237', isRegistered: true },
  { initials: 'H', name: 'Horta', phone: '+5215544948207', isRegistered: false },
  { initials: 'H', name: 'Horta', phone: '+5215546488245', isRegistered: false },
  { initials: '0', name: '00000', phone: '+525527347689', isRegistered: false },
  { initials: ':', name: ':p', phone: '+525596930434', isRegistered: false },
  { initials: 'A', name: 'AMIA', tag: '@amia', phone: '+52721144', isRegistered: true },
];

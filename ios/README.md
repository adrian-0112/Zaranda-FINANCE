# Zaranda iOS App

A native iOS application built with SwiftUI for the Zaranda fintech dApp.

## Project Structure

```
ios/Zaranda/
├── Models/
│   ├── Wallet.swift          # Wallet data model
│   ├── Contact.swift         # Contact data model
│   ├── Transaction.swift     # Transaction data model
│   └── PriceHistory.swift    # Price history data model
├── ViewModels/
│   └── WalletManager.swift   # Wallet state management
├── Views/
│   ├── MainTabView.swift     # Main tab bar with 4 tabs
│   ├── HomeView.swift        # Home screen with wallet carousel
│   ├── RecipientsView.swift  # Contacts list with search
│   ├── InvestingView.swift   # Investing page
│   ├── LendingView.swift     # Lending page
│   ├── AccountView.swift     # Account settings
│   ├── TransactionsView.swift # Transaction history
│   ├── ExchangeChartView.swift # Exchange rate chart
│   ├── SwapView.swift        # Currency swap
│   ├── SupportChatView.swift # AI support chat
│   └── [Other detail views]
├── ZarandaApp.swift          # App entry point
└── Info.plist                # App configuration
```

## Features

### Main Navigation
- **TabView** with 4 main tabs: Home, Recipients, Investing, Lending
- **Central Send Button** overlaid on the tab bar
- Standard iOS navigation patterns with NavigationStack

### Home Screen
- Expandable header buttons (Account & Support Chat)
- Swipeable wallet carousel (USDT & MXNB)
- Action buttons (Transactions & Swap)
- Scrollable content cards
- Pull-to-refresh functionality

### Recipients
- Searchable contact list
- Visual indicators for registered vs unregistered users
- Native List with searchable modifier

### Investing & Lending
- Hero images with gradient overlays
- Content cards with information
- Navigation to detail pages

### Send/Receive Flow
- Modal presentation for Send/Receive options
- Navigation to specific transfer types
- Form-based recipient entry pages

### Account Management
- Full-screen modal presentation
- Personal details, security, transaction limits
- Account statements with segmented picker
- Account fees display

### Transactions
- Wallet-specific transaction lists
- Date range filtering with DatePicker
- Transaction type filters
- Search functionality
- Refresh with loading state

### Exchange Chart
- Native Charts framework integration
- Time period picker (1d, 1w, 1m)
- Price information display
- Trend indicators

## Architecture

- **SwiftUI**: Modern declarative UI framework
- **State Management**: 
  - `@State` for view-local state
  - `@StateObject` for view-owned ViewModels
  - `@EnvironmentObject` for app-wide state (WalletManager)
- **Navigation**:
  - `NavigationStack` for drill-down flows
  - `.sheet()` and `.fullScreenCover()` for modal presentations
- **Data**: Hard-coded mock data (no API calls)

## Requirements

- iOS 17.0+
- Xcode 15.0+
- Swift 5.9+

## Building the App

1. Open the project in Xcode
2. Select your development team in Signing & Capabilities
3. Build and run on simulator or device

## Notes

- All data is currently hard-coded for prototype purposes
- The app follows iOS Human Interface Guidelines
- Uses native iOS components and patterns throughout
- TabView switching uses standard iOS behavior (no custom slide animations)

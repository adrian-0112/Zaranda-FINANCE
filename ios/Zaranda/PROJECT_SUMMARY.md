# Zaranda iOS App - Project Summary

## Overview
This is a complete native iOS application built with SwiftUI, translating the Zaranda fintech web app into a high-quality, performant iOS experience.

## Architecture Decisions

### Navigation Pattern
- **TabView**: Main app navigation with 4 tabs (Home, Recipients, Investing, Lending)
- **Central Send Button**: Overlaid on TabView using ZStack, positioned above tab bar
- **NavigationStack**: Used for drill-down navigation (standard iOS slide-from-right animation)
- **Modal Presentations**: `.fullScreenCover()` for Account and Support Chat, `.sheet()` for Send/Receive modal

### State Management
- **@State**: View-local state (UI toggles, text fields)
- **@StateObject**: ViewModels (WalletManager)
- **@EnvironmentObject**: App-wide state shared across views (WalletManager for active wallet)

### Data Layer
- All data is hard-coded for prototype purposes
- Models: Wallet, Contact, Transaction, PriceHistoryData
- Mock data arrays in model extensions

## Key Features Implemented

### 1. Main TabView (MainTabView.swift)
- 4 main tabs with proper tab items
- Central Send button overlay (64x64, green, rotated -45 degrees)
- Standard iOS tab switching behavior

### 2. HomeView
- **Two-tap header buttons**: Account and Support Chat expand on first tap, navigate on second
- **Wallet carousel**: TabView with .page style for swipeable wallets
- **Action buttons**: Transactions and Swap (NavigationLinks)
- **Scrollable content**: Setup card, Exchange rate card, Promo card
- **Pull-to-refresh**: Using .refreshable() modifier

### 3. RecipientsView
- Searchable List with .searchable() modifier
- Contact rows with registered/unregistered indicators
- Green checkmark + tag for registered users
- Gray icon + phone for unregistered users

### 4. InvestingView & LendingView
- Hero images with gradient overlays
- Content cards with information
- Navigation to detail pages (LendingOptionsView)

### 5. Send/Receive Flow
- Modal sheet presentation
- SendOptionsView and ReceiveOptionsView
- Navigation to recipient forms (Mexican, US, Crypto)
- Forms with segmented picker for Individual/Business

### 6. AccountView
- Full-screen modal
- Profile section with avatar
- Premium card
- List sections for account options
- Navigation to detail pages (PersonalDetails, Security, etc.)

### 7. TransactionsView
- Wallet-specific display
- Date pickers (From/Until) as sheets
- Transaction type filters (All, Deposits, Swaps, Sends)
- Search functionality
- Refresh button with loading overlay

### 8. ExchangeChartView
- Native Charts framework
- Period picker (1d, 1w, 1m)
- Price information display
- Trend indicators (up/down)

### 9. LendingOptionsView
- Accordion-style list using DisclosureGroup pattern
- 5 loan types with expandable content
- "Compare Rates" buttons in expanded state

## UI/UX Patterns

### Animations
- Two-tap button expansion: 0.5s easeInOut animation
- Accordion expansion: Spring animation
- Wallet balance updates: Smooth transitions
- Pull-to-refresh: Native iOS behavior

### Colors
- Primary: Green (#00C853 or similar)
- Backgrounds: White, gray.opacity(0.1)
- Text: Primary, gray for secondary text

### Typography
- Headers: Bold, various sizes (18-40pt)
- Body: Regular/Semibold, 14-16pt
- Labels: 12-14pt, gray

## File Structure

```
ios/Zaranda/
├── Models/
│   ├── Wallet.swift
│   ├── Contact.swift
│   ├── Transaction.swift
│   └── PriceHistory.swift
├── ViewModels/
│   └── WalletManager.swift
├── Views/
│   ├── MainTabView.swift
│   ├── HomeView.swift
│   ├── RecipientsView.swift
│   ├── InvestingView.swift
│   ├── LendingView.swift
│   ├── LendingOptionsView.swift
│   ├── AccountView.swift
│   ├── PersonalDetailsView.swift
│   ├── SecurityView.swift
│   ├── AccountStatementsView.swift
│   ├── TransactionLimitsView.swift
│   ├── AccountFeesView.swift
│   ├── TransactionsView.swift
│   ├── ExchangeChartView.swift
│   ├── SwapView.swift
│   ├── SupportChatView.swift
│   ├── SendReceiveModalView.swift
│   ├── SendOptionsView.swift
│   ├── ReceiveOptionsView.swift
│   ├── AddMexicanRecipientView.swift
│   ├── AddUsRecipientView.swift
│   ├── AddCryptoRecipientView.swift
│   ├── SetupCard.swift
│   ├── ExchangeRateCard.swift
│   └── PromoCard.swift
├── ZarandaApp.swift
└── Info.plist
```

## Implementation Notes

1. **TabView Middle Tab**: The middle tab (tag 2) is disabled to make space for the Send button overlay
2. **Navigation**: Uses NavigationStack with NavigationPath for programmatic navigation
3. **Charts**: Requires Charts framework import (available iOS 16+)
4. **Async Images**: Uses AsyncImage for hero images (with placeholder)
5. **Forms**: Uses native SwiftUI Form for input screens
6. **Date Pickers**: Presented as sheets with custom DatePickerSheet wrapper

## Next Steps (Future Enhancements)

1. Connect to real API endpoints
2. Implement actual authentication
3. Add biometric authentication (FaceID/TouchID)
4. Implement real-time balance updates
5. Add push notifications
6. Implement actual AI chat integration
7. Add analytics tracking
8. Implement proper error handling
9. Add loading states for all async operations
10. Add unit tests

## Requirements Met

✅ TabView with 4 tabs
✅ Central Send button overlay
✅ Two-tap header buttons
✅ Wallet carousel
✅ Pull-to-refresh
✅ Searchable contacts
✅ Hero images with gradients
✅ Modal presentations
✅ NavigationStack for drill-downs
✅ Forms with segmented pickers
✅ Date pickers
✅ Charts integration
✅ Accordion implementation
✅ All specified views and flows

# FIRST STRIKE PLAN — MARKET OVERVIEW PANEL

**Squad Lead:** NeonBlade + BloombergReaper + MarketGhost
**Branch:** feature/strike-1-market-overview
**Timeline:** 24 hours
**Status:** ACTIVE

## MERMAID SQUAD DEPLOYMENT DIAGRAM

```mermaid
graph TB
    subgraph COMMAND["BR(A.I.)NS - Supreme Commander"]
        direction TB
        BR["BR(A.I.)NS\nCoordination & Planning"]
    end

    subgraph STRIKE1["FIRST STRIKE: Market Overview Panel"]
        direction TB
        NB["NeonBlade\nDesign Lead"]
        BR2["BloombergReaper\nPolymarket Specialist"]
        MG["MarketGhost\nData Spine"]
    end

    subgraph SUPPORT["Support Squad"]
        direction TB
        CP["CodePhantom\nTrading Engine"]
        VA["VibeAuditor\nQA & Safety"]
        IOS["iOSShadow\nMobile Parity"]
    end

    subgraph TASKS["Strike Tasks"]
        direction TB
        T1["1. Neon Theme\n#a0a0a + #00ff9f"]
        T2["2. Draggable Grid\nPanel Layout System"]
        T3["3. Polymarket API\nTypeScript Interfaces"]
        T4["4. WebSocket Stream\nLive Price Updates"]
        T5["5. Sparklines\nMini Price Charts"]
        T6["6. Paper Mode\nSafety Skeleton"]
    end

    BR --> NB
    BR --> BR2
    BR --> MG
    NB --> T1
    NB --> T2
    BR2 --> T3
    MG --> T4
    MG --> T5
    CP --> T6

    NB -.- VA
    BR2 -.- VA
    MG -.- IOS

    style COMMAND fill:#00ff9f,stroke:#0a0a0a,color:#0a0a0a
    style STRIKE1 fill:#0a0a0a,stroke:#00ff9f,color:#00ff9f
    style SUPPORT fill:#1a1a2e,stroke:#00ff9f,color:#ffffff
    style TASKS fill:#16213e,stroke:#e94560,color:#ffffff
```

## 5-STEP LIGHTNING STRIKE

### STEP 1: NEON THEME (NeonBlade)
- [ ] Terminal loads with dark void theme (#0a0a0a)
- [ ] Neon green (#00ff9f) accents on all active elements
- [ ] No white flash or FOUC on load
- [ ] Consistent design tokens established

### STEP 2: DRAGGABLE GRID (NeonBlade)
- [ ] Panel drag/resize system at 60fps
- [ ] Save/restore layouts in less than 2 clicks
- [ ] Touch gestures work on mobile
- [ ] Keyboard navigation support

### STEP 3: POLYMARKET API (BloombergReaper)
- [ ] CLOBClient TypeScript interfaces
- [ ] Market data normalization layer
- [ ] Rate limiting (10 req/s)
- [ ] Error handling and fallbacks

### STEP 4: LIVE UPDATES (MarketGhost)
- [ ] WebSocket stream connected
- [ ] Prices update within 100ms of on-chain event
- [ ] Sparkline mini-charts (last 30 ticks)
- [ ] Graceful degradation on WS failure

### STEP 5: PAPER MODE (CodePhantom + VibeAuditor)
- [ ] Paper trading indicator in status bar
- [ ] Dry-run mode default enforced
- [ ] Kill switch (Cmd+K) wired
- [ ] E2E test scaffolding complete

## SUCCESS CRITERIA
- Panel can be dragged to any grid position
- Prices update within 100ms of on-chain event
- No white flash or FOUC on load
- Touch gestures work on mobile
- All smoke tests pass
- PR opened with video demo (max 3 min)

## KEYBOARD SHORTCUTS
| Key | Action |
|-----|--------|
| Cmd+K | Kill switch toggle |
| Cmd+G | Toggle grid mode |
| Cmd+1 | Focus Market Overview |
| Cmd+2 | Focus Signals Sidebar |
| Cmd+R | Refresh data |
| Esc | Close panel detail view |

---

**Status:** ACTIVE - STRIKE 1 IN PROGRESS
**Next:** PR review after all steps complete
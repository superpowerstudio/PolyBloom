import { render, screen, fireEvent } from '@testing-library/react';
import { ClawControlPanel } from '../ClawControlPanel';
import { useBotStore } from '@/lib/stores/botStore';

// Mock the botStore
jest.mock('@/lib/stores/botStore');

const mockUseBotStore = useBotStore as jest.MockedFunction<typeof useBotStore>;

describe('ClawControlPanel', () => {
  const mockToggleGlobalKillSwitch = jest.fn();
  const mockStartBot = jest.fn();
  const mockStopBot = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseBotStore.mockReturnValue({
      bots: [
        {
          id: 'bot-1',
          name: 'Test Bot',
          strategy: 'Test Strategy',
          status: 'idle',
          mode: 'paper',
          balance: 1000,
          pnl: 0,
          pnlPercent: 0,
          activeTrades: 0,
          createdAt: Date.now(),
          lastUpdated: Date.now(),
        },
      ],
      paperMode: true,
      globalKillSwitch: false,
      toggleGlobalKillSwitch: mockToggleGlobalKillSwitch,
      startBot: mockStartBot,
      stopBot: mockStopBot,
    });
  });

  it('renders the Kill Switch button', () => {
    render(<ClawControlPanel />);
    const killSwitchButton = screen.getByText('▶️ Ready');
    expect(killSwitchButton).toBeInTheDocument();
  });

  it('calls toggleGlobalKillSwitch when Kill Switch button is clicked', () => {
    render(<ClawControlPanel />);
    const killSwitchButton = screen.getByText('▶️ Ready');
    fireEvent.click(killSwitchButton);
    expect(mockToggleGlobalKillSwitch).toHaveBeenCalledTimes(1);
  });

  it('renders the Start button for idle bots', () => {
    render(<ClawControlPanel />);
    const startButton = screen.getByText('▶️');
    expect(startButton).toBeInTheDocument();
  });

  it('calls startBot when Start button is clicked', () => {
    render(<ClawControlPanel />);
    const startButton = screen.getByText('▶️');
    fireEvent.click(startButton);
    expect(mockStartBot).toHaveBeenCalledWith('bot-1');
  });

  it('renders the Stop button for running bots', () => {
    mockUseBotStore.mockReturnValue({
      bots: [
        {
          id: 'bot-1',
          name: 'Test Bot',
          strategy: 'Test Strategy',
          status: 'running',
          mode: 'paper',
          balance: 1000,
          pnl: 0,
          pnlPercent: 0,
          activeTrades: 0,
          createdAt: Date.now(),
          lastUpdated: Date.now(),
        },
      ],
      paperMode: true,
      globalKillSwitch: false,
      toggleGlobalKillSwitch: mockToggleGlobalKillSwitch,
      startBot: mockStartBot,
      stopBot: mockStopBot,
    });

    render(<ClawControlPanel />);
    const stopButton = screen.getByText('⏹️');
    expect(stopButton).toBeInTheDocument();
  });

  it('calls stopBot when Stop button is clicked', () => {
    mockUseBotStore.mockReturnValue({
      bots: [
        {
          id: 'bot-1',
          name: 'Test Bot',
          strategy: 'Test Strategy',
          status: 'running',
          mode: 'paper',
          balance: 1000,
          pnl: 0,
          pnlPercent: 0,
          activeTrades: 0,
          createdAt: Date.now(),
          lastUpdated: Date.now(),
        },
      ],
      paperMode: true,
      globalKillSwitch: false,
      toggleGlobalKillSwitch: mockToggleGlobalKillSwitch,
      startBot: mockStartBot,
      stopBot: mockStopBot,
    });

    render(<ClawControlPanel />);
    const stopButton = screen.getByText('⏹️');
    fireEvent.click(stopButton);
    expect(mockStopBot).toHaveBeenCalledWith('bot-1');
  });

  it('disables Start button when global kill switch is active', () => {
    mockUseBotStore.mockReturnValue({
      bots: [
        {
          id: 'bot-1',
          name: 'Test Bot',
          strategy: 'Test Strategy',
          status: 'idle',
          mode: 'paper',
          balance: 1000,
          pnl: 0,
          pnlPercent: 0,
          activeTrades: 0,
          createdAt: Date.now(),
          lastUpdated: Date.now(),
        },
      ],
      paperMode: true,
      globalKillSwitch: true,
      toggleGlobalKillSwitch: mockToggleGlobalKillSwitch,
      startBot: mockStartBot,
      stopBot: mockStopBot,
    });

    render(<ClawControlPanel />);
    const startButton = screen.getByText('▶️');
    expect(startButton).toBeDisabled();
  });
});
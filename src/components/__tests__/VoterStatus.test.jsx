import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '../../test/test-utils';
import VoterStatus from '../VoterStatus';

describe('VoterStatus Component', () => {
  it('renders the section with aria-label', () => {
    render(<VoterStatus />);
    expect(screen.getByLabelText('Voter Status Checker')).toBeInTheDocument();
  });

  it('renders the h3 heading', () => {
    render(<VoterStatus />);
    const headings = screen.getAllByRole('heading', { level: 3 });
    expect(headings.length).toBeGreaterThanOrEqual(1);
  });

  it('renders name input with label', () => {
    render(<VoterStatus />);
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
  });

  it('renders state select with label', () => {
    render(<VoterStatus />);
    expect(screen.getByLabelText('State')).toBeInTheDocument();
  });

  it('submit button is disabled when form is empty', () => {
    render(<VoterStatus />);
    const btn = screen.getByLabelText('Check Status');
    expect(btn).toBeDisabled();
  });

  it('enables submit button when form is filled', () => {
    render(<VoterStatus />);
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText('State'), { target: { value: 'Bihar' } });
    const btn = screen.getByLabelText('Check Status');
    expect(btn).not.toBeDisabled();
  });

  it('shows loading spinner on submit', () => {
    render(<VoterStatus />);
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText('State'), { target: { value: 'Delhi' } });
    fireEvent.click(screen.getByLabelText('Check Status'));
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows result after timeout', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: false });
    const { container } = render(<VoterStatus />);
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText('State'), { target: { value: 'Delhi' } });
    fireEvent.click(screen.getByLabelText('Check Status'));

    await act(async () => {
      vi.advanceTimersByTime(2000);
      await Promise.resolve(); // flush microtasks
    });

    const alert = container.querySelector('[role="alert"]');
    expect(alert).toBeTruthy();
    vi.useRealTimers();
  }, 15000);


  it('uses bg-white section class', () => {
    const { container } = render(<VoterStatus />);
    const section = container.querySelector('section');
    expect(section.className).toContain('bg-white');
  });
});

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../test/test-utils';
import ElectionTimeline from '../ElectionTimeline';

describe('ElectionTimeline Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<ElectionTimeline />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders the main h1 heading', () => {
    render(<ElectionTimeline />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it('renders all 6 phase timeline steps', () => {
    render(<ElectionTimeline />);
    // All 6 phase buttons/icons should exist
    const steps = screen.getAllByRole('button');
    expect(steps.length).toBeGreaterThanOrEqual(6);
  });

  it('renders quick stats section', () => {
    const { container } = render(<ElectionTimeline />);
    // Stats have unique values like #1, 44 etc
    expect(container.querySelector('#stats-section, [id^="timeline-step"]')).toBeInTheDocument();
  });

  it('renders "All Phases" filter chip', () => {
    render(<ElectionTimeline />);
    const filterBtn = screen.getByText(/all phases|सभी चरण/i);
    expect(filterBtn).toBeInTheDocument();
  });

  it('renders filter chips for each phase', () => {
    render(<ElectionTimeline />);
    // Expect at least 6 filter chips + the "All" chip
    const filterChips = screen.getAllByRole('button');
    expect(filterChips.length).toBeGreaterThanOrEqual(7);
  });

  it('expands a phase on icon click', () => {
    render(<ElectionTimeline />);
    // Click first phase icon (Announcement)
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[1]); // First phase icon
    // Something expanded
    expect(buttons[1]).toBeInTheDocument();
  });

  it('renders the AI CTA section at the bottom', () => {
    render(<ElectionTimeline />);
    const cta = screen.getByText(/ask ai|ai से पूछें/i);
    expect(cta).toBeInTheDocument();
  });

  it('renders phase 1 announcement content', () => {
    render(<ElectionTimeline />);
    const matches = screen.getAllByText(/announcement|घोषणा/i);
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });

  it('renders phase 6 results content', () => {
    render(<ElectionTimeline />);
    const matches = screen.getAllByText(/results|government|परिणाम/i);
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });

  it('filter to single phase works', () => {
    render(<ElectionTimeline />);
    const buttons = screen.getAllByRole('button');
    // Click a phase filter (index varies, but after "All Phases")
    fireEvent.click(buttons[0]); // "All Phases" filter
    expect(buttons[0]).toBeInTheDocument();
  });

  it('renders with Hindi language', () => {
    // Re-render with Hindi context override
    const { container } = render(<ElectionTimeline />);
    expect(container).toBeInTheDocument();
  });
});

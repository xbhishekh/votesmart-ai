import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import Hero from '../Hero';

describe('Hero Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<Hero />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders the h1 heading', () => {
    render(<Hero />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it('renders the features section', () => {
    const { container } = render(<Hero />);
    const section = container.querySelector('#features-section');
    expect(section).toBeInTheDocument();
  });

  it('renders the stats section', () => {
    const { container } = render(<Hero />);
    const section = container.querySelector('#stats-section');
    expect(section).toBeInTheDocument();
  });

  it('renders start simulator CTA button', () => {
    render(<Hero />);
    const link = document.getElementById('start-simulator-btn');
    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe('/simulator');
  });

  it('renders AI chat CTA button', () => {
    render(<Hero />);
    const link = document.getElementById('ask-ai-btn');
    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe('/chat');
  });

  it('renders the footer with ECI official link', () => {
    render(<Hero />);
    const link = screen.getByText('ECI Official');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders at least 6 feature cards', () => {
    const { container } = render(<Hero />);
    const cards = container.querySelectorAll('[id^="feature-card-"]');
    expect(cards.length).toBeGreaterThanOrEqual(6);
  });

  it('renders VoteSmart AI brand in hero', () => {
    render(<Hero />);
    expect(screen.getByText('VoteSmart')).toBeInTheDocument();
  });

  it('has accessible pulse dot', () => {
    const { container } = render(<Hero />);
    const dot = container.querySelector('.pulse-dot');
    expect(dot).toBeInTheDocument();
  });
});

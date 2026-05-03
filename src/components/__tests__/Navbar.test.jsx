import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../test/test-utils';
import Navbar from '../Navbar';

describe('Navbar Component', () => {
  const mockOnSettings = vi.fn();

  it('renders the nav element', () => {
    render(<Navbar onSettingsClick={mockOnSettings} />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders VoteSmart brand text', () => {
    render(<Navbar onSettingsClick={mockOnSettings} />);
    // Brand text is split into "VoteSmart" + "Smart" span + " AI"
    expect(screen.getByText('Smart')).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    render(<Navbar onSettingsClick={mockOnSettings} />);
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThanOrEqual(5);
  });

  it('settings button has correct aria-label', () => {
    render(<Navbar onSettingsClick={mockOnSettings} />);
    const btn = screen.getByLabelText('Open settings');
    expect(btn).toBeInTheDocument();
  });

  it('calls onSettingsClick when settings clicked', () => {
    render(<Navbar onSettingsClick={mockOnSettings} />);
    fireEvent.click(screen.getByLabelText('Open settings'));
    expect(mockOnSettings).toHaveBeenCalled();
  });

  it('mobile menu toggle button exists', () => {
    render(<Navbar onSettingsClick={mockOnSettings} />);
    const btn = document.getElementById('mobile-menu-btn');
    expect(btn).toBeInTheDocument();
  });

  it('mobile menu button has correct initial aria-label', () => {
    render(<Navbar onSettingsClick={mockOnSettings} />);
    const btn = document.getElementById('mobile-menu-btn');
    expect(btn.getAttribute('aria-label')).toBe('Open menu');
  });

  it('mobile menu aria-label changes on click', () => {
    render(<Navbar onSettingsClick={mockOnSettings} />);
    const btn = document.getElementById('mobile-menu-btn');
    fireEvent.click(btn);
    expect(btn.getAttribute('aria-label')).toBe('Close menu');
  });

  it('renders logo link pointing to home', () => {
    render(<Navbar onSettingsClick={mockOnSettings} />);
    const logo = document.getElementById('nav-logo');
    expect(logo).toBeInTheDocument();
    expect(logo.getAttribute('href')).toBe('/');
  });

  it('renders ECI external link', () => {
    render(<Navbar onSettingsClick={mockOnSettings} />);
    const eciLink = document.getElementById('eci-link');
    expect(eciLink).toBeInTheDocument();
    expect(eciLink.getAttribute('href')).toBe('https://www.eci.gov.in');
    expect(eciLink.getAttribute('target')).toBe('_blank');
  });
});

import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCTAClick = () => {
    window.location.href = 'https://anita.app'; // Update with actual webapp URL
  };

  return (
    <div className="app">
      {/* Navigation */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-text">ANITA</span>
            <span className="logo-subtitle">Personal Finance Assistant</span>
          </div>
          <div className="nav-links">
            <a href="#features" className="nav-link">Features</a>
            <a href="#how-it-works" className="nav-link">How It Works</a>
            <button className="nav-cta" onClick={handleCTAClick}>
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
        </div>
        <div className="hero-content">
          <div className="hero-badge">
            <span>🤖 AI-Powered Personal Finance</span>
            <span className="beta-badge">Currently in Beta</span>
          </div>
          <h1 className="hero-title">
            ANITA
            <br />
            <span className="gradient-text">Personal Finance Assistant</span>
          </h1>
          <p className="hero-tagline">
            Revolutionize how you manage money through conversational AI. Get number-driven insights, 
            track finances naturally, and achieve your goals with personalized financial guidance.
          </p>
          <div className="hero-cta-group">
            <button className="cta-button primary" onClick={handleCTAClick}>
              Get Started
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">32+</div>
              <div className="stat-label">Smart Questions</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">Anita</div>
              <div className="stat-label">Your AI Personal Finance Advisor</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Secure</div>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <div className="screenshot-placeholder">
            <div className="placeholder-content">
              <div className="placeholder-icon">📱</div>
              <p>App Screenshot</p>
              <span className="placeholder-note">Add your screenshot here</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="section-header">
          <span className="section-badge">Key Features</span>
          <h2 className="section-title">Everything You Need to Master Your Finances</h2>
          <p className="section-description">
            ANITA combines advanced AI with sophisticated financial analysis to provide 
            actionable insights that help you make better financial decisions.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-number">01</div>
            <h3 className="feature-title">Smart AI Conversation</h3>
            <p className="feature-description">
              Talk to ANITA like you would to a friend. Our AI understands natural language, processes voice messages, and analyzes documents to make financial management effortless.
            </p>
            <div className="feature-highlights">
              <div className="highlight-item">Voice Integration</div>
              <div className="highlight-item">File Analysis</div>
              <div className="highlight-item">32 Smart Questions</div>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-number">02</div>
            <h3 className="feature-title">Advanced Financial Analysis</h3>
            <p className="feature-description">
              Get precise recommendations with exact amounts. See where your money goes, compare months, and discover realistic ways to save more.
            </p>
            <div className="feature-highlights">
              <div className="highlight-item">Category Breakdown</div>
              <div className="highlight-item">Month Comparisons</div>
              <div className="highlight-item">Savings Targets</div>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-number">03</div>
            <h3 className="feature-title">Goal Setting & Tracking</h3>
            <p className="feature-description">
              Set financial goals and watch ANITA calculate if they're achievable. Get real-time progress updates and smart deadline suggestions.
            </p>
            <div className="feature-highlights">
              <div className="highlight-item">Feasibility Analysis</div>
              <div className="highlight-item">Progress Tracking</div>
              <div className="highlight-item">Smart Deadlines</div>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-number">04</div>
            <h3 className="feature-title">Transaction Management</h3>
            <p className="feature-description">
              Log expenses naturally through conversation. ANITA automatically categorizes, prevents duplicates, and supports multiple currencies.
            </p>
            <div className="feature-highlights">
              <div className="highlight-item">Auto Categorization</div>
              <div className="highlight-item">Duplicate Prevention</div>
              <div className="highlight-item">Multi-Currency</div>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-number">05</div>
            <h3 className="feature-title">Gamification</h3>
            <p className="feature-description">
              Earn XP points for every financial action. Level up as you track expenses, set goals, and build better money habits.
            </p>
            <div className="feature-highlights">
              <div className="highlight-item">XP System</div>
              <div className="highlight-item">Daily Tracking</div>
              <div className="highlight-item">Achievements</div>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-number">06</div>
            <h3 className="feature-title">Bank-Level Security</h3>
            <p className="feature-description">
              Your financial data is protected with enterprise-grade encryption. We're GDPR compliant and never share your information.
            </p>
            <div className="feature-highlights">
              <div className="highlight-item">End-to-End Encryption</div>
              <div className="highlight-item">Secure Auth</div>
              <div className="highlight-item">GDPR Compliant</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works">
        <div className="section-header">
          <span className="section-badge">Simple Process</span>
          <h2 className="section-title">Get Started in Minutes</h2>
          <p className="section-description">
            Three simple steps to transform your financial management
          </p>
        </div>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3 className="step-title">Sign Up Free</h3>
            <p className="step-description">
              Create your account in seconds. No credit card required. 
              Start tracking your finances immediately.
            </p>
          </div>
          <div className="step-connector"></div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h3 className="step-title">Start Chatting</h3>
            <p className="step-description">
              Log transactions naturally through conversation. Upload receipts, 
              use voice messages, or simply type your expenses.
            </p>
          </div>
          <div className="step-connector"></div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h3 className="step-title">Get Insights</h3>
            <p className="step-description">
              Receive personalized financial insights, savings recommendations, 
              and goal suggestions powered by advanced AI.
            </p>
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="screenshots">
        <div className="section-header">
          <span className="section-badge">See It In Action</span>
          <h2 className="section-title">Experience ANITA</h2>
        </div>
        <div className="screenshots-grid">
          <div className="screenshot-card">
            <div className="screenshot-placeholder">
              <div className="placeholder-content">
                <div className="screenshot-label">Chat Interface</div>
                <p>Add screenshot</p>
              </div>
            </div>
            <h4>Conversational AI</h4>
            <p>Talk to ANITA naturally and manage your finances through simple conversations</p>
          </div>
          <div className="screenshot-card">
            <div className="screenshot-placeholder">
              <div className="placeholder-content">
                <div className="screenshot-label">Analytics Dashboard</div>
                <p>Add screenshot</p>
              </div>
            </div>
            <h4>Real-time Analytics</h4>
            <p>See your spending patterns, trends, and insights updated in real-time</p>
          </div>
          <div className="screenshot-card">
            <div className="screenshot-placeholder">
              <div className="placeholder-content">
                <div className="screenshot-label">Goals & Tracking</div>
                <p>Add screenshot</p>
              </div>
            </div>
            <h4>Goal Management</h4>
            <p>Set financial goals and track your progress with visual indicators</p>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Transform Your Finances?</h2>
          <p className="cta-description">
            Join the beta and take control of your financial future with Anita
          </p>
          <button className="cta-button large" onClick={handleCTAClick}>
            Get Started
          </button>
          <p className="pricing-note">Pricing available in the webapp</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <span className="logo-text">ANITA</span>
              <span className="logo-subtitle">Personal Finance Assistant</span>
            </div>
            <p className="footer-description">
              Your intelligent financial companion powered by AI
            </p>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">Product</h4>
            <a href="#features" className="footer-link">Features</a>
            <a href="#how-it-works" className="footer-link">How It Works</a>
            <p className="footer-note">Pricing available in the webapp</p>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">Company</h4>
            <a href="#about" className="footer-link">About</a>
            <a href="#contact" className="footer-link">Contact</a>
            <a href="#careers" className="footer-link">Careers</a>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">Legal</h4>
            <a href="#privacy" className="footer-link">Privacy Policy</a>
            <a href="#terms" className="footer-link">Terms of Service</a>
            <a href="#security" className="footer-link">Security</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copyright">© 2024 ANITA Finance Advisor. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;


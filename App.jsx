import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [smartQuestions, setSmartQuestions] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [securePercent, setSecurePercent] = useState(0);
  const [statsAnimated, setStatsAnimated] = useState(false);

  // Refs for animation sections
  const heroContentRef = useRef(null);
  const heroImageRef = useRef(null);
  const sectionHeaderRef = useRef(null);
  const featuresGridRef = useRef(null);
  const stepsContainerRef = useRef(null);
  const ctaContentRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    // Use passive listener to ensure scrolling is never blocked
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate hero content and image on page load
  useEffect(() => {
    // Add initial hidden state immediately
    if (heroContentRef.current) {
      heroContentRef.current.classList.add('hero-content-load');
    }
    if (heroImageRef.current) {
      heroImageRef.current.classList.add('hero-image-load');
    }
    
    // Trigger animations immediately to ensure no blocking
    requestAnimationFrame(() => {
      // Use minimal delay to ensure classes are applied but don't block interaction
      setTimeout(() => {
        if (heroContentRef.current) {
          heroContentRef.current.classList.add('hero-content-animated');
        }
        if (heroImageRef.current) {
          heroImageRef.current.classList.add('hero-image-animated');
        }
      }, 10); // Reduced delay for faster initial response
    });
  }, []);

  useEffect(() => {
    const heroStats = document.querySelector('.hero-stats');
    if (!heroStats) return;

    // Check if stats are already visible on initial load
    const rect = heroStats.getBoundingClientRect();
    const wasInitiallyVisible = rect.top < window.innerHeight && rect.bottom > 0 && window.scrollY === 0;

    let hasUserScrolled = false;
    let animationTriggered = false;

    // Track if user has scrolled (not just page load)
    // Use passive listener to ensure scrolling is never blocked
    const handleScroll = () => {
      if (window.scrollY > 0) {
        hasUserScrolled = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true, capture: false });

    const triggerAnimation = () => {
      if (!animationTriggered && !statsAnimated) {
        animationTriggered = true;
        setStatsAnimated(true);
        animateNumber(32, setSmartQuestions, 2000);
        animateNumber(200, setActiveUsers, 2000);
        animateNumber(100, setSecurePercent, 2000);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !statsAnimated) {
            // Animate if user scrolled OR if element wasn't visible initially
            if (hasUserScrolled || !wasInitiallyVisible) {
              triggerAnimation();
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    // Small delay to ensure DOM is ready
    // Reduced delay to allow faster initial interaction
    const timeoutId = setTimeout(() => {
      observer.observe(heroStats);
      
      // If stats are visible on page load, animate them after hero content animation completes
      if (wasInitiallyVisible && !hasUserScrolled) {
        setTimeout(() => {
          triggerAnimation();
        }, 800); // Reduced wait time for hero content animation
      }
    }, 50);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
      if (heroStats) {
        observer.unobserve(heroStats);
      }
    };
  }, [statsAnimated]);

  // Scroll animation observer for all sections
  useEffect(() => {
    let observer;
    let elementsToObserve = [];
    let hasUserScrolled = false;

    // Track if user has actively scrolled - set immediately on any scroll
    // Use passive listeners to never block scrolling
    const handleScroll = () => {
      if (!hasUserScrolled) {
        hasUserScrolled = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    // Set up animations after DOM is ready
    const setupAnimations = () => {
      // Create observer that triggers animations when elements come into view
      // Works immediately on scroll, regardless of stats animation state
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          // Animate if element is intersecting - don't block on scroll state
          if (entry.isIntersecting) {
            // Always allow animation - don't wait for scroll state
            entry.target.classList.add('animate-in');
            // Unobserve after animation is triggered to prevent re-triggering
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      elementsToObserve = [];

      // Helper to add element to observe - always wait for scroll
      const setupElement = (element) => {
        if (!element) return;
        
        // Always add animate-on-scroll class and observe it
        // Elements will only animate when scrolled into view
        element.classList.add('animate-on-scroll');
        if (observer) {
          observer.observe(element);
          elementsToObserve.push(element);
        }
      };

      // Collect all elements first
      // Skip hero content and image since they have their own load animations
      const allElements = [];
      
      document.querySelectorAll('.section-header').forEach((el) => {
        allElements.push({ el });
      });
      
      // Features grid container
      if (featuresGridRef.current) {
        allElements.push({ el: featuresGridRef.current });
      }
      
      // Steps container
      if (stepsContainerRef.current) {
        allElements.push({ el: stepsContainerRef.current });
      }
      if (ctaContentRef.current) allElements.push({ el: ctaContentRef.current });

      // Setup all elements - they will animate only when scrolled into view
      allElements.forEach(({ el }) => {
        setupElement(el);
      });
    };

    // Store page load time for animation timing
    if (!window.pageLoadTime) {
      window.pageLoadTime = Date.now();
    }

    // Use setTimeout to ensure DOM is fully rendered
    // Reduced delay to allow faster initial interaction
    const timeoutId = setTimeout(setupAnimations, 50);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
      if (observer) {
        elementsToObserve.forEach((el) => {
          if (el) {
            observer.unobserve(el);
          }
        });
      }
    };
  }, []);

  const animateNumber = (target, setter, duration) => {
    const start = 0;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(start + (target - start) * easeOutQuart);
      
      setter(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setter(target);
      }
    };

    requestAnimationFrame(animate);
  };

  const handleCTAClick = (e) => {
    // Prevent any default behavior and ensure immediate response
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    // Use setTimeout to ensure touch event completes
    setTimeout(() => {
      window.location.href = 'https://anita.app'; // Update with actual webapp URL
    }, 0);
  };

  // Ensure touch events work immediately on mobile
  useEffect(() => {
    // Add touch event listeners to ensure immediate response
    const handleTouchStart = (e) => {
      // Allow touch events to propagate normally
      // This ensures scrolling and button clicks work on first touch
    };

    // Add to document to catch all touches
    document.addEventListener('touchstart', handleTouchStart, { passive: true, capture: true });
    
    // Ensure body is scrollable immediately
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';

    return () => {
      document.removeEventListener('touchstart', handleTouchStart, { capture: true });
    };
  }, []);

  return (
    <div className="app">
      {/* Navigation */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-beta">BETA</span>
            <span className="logo-text">ANITA</span>
            <span className="logo-subtitle">Personal Finance Assistant</span>
          </div>
          <div className="nav-links">
            <a href="#features" className="nav-link">Features</a>
            <a href="#how-it-works" className="nav-link">How It Works</a>
            <button 
              className="nav-cta" 
              onClick={handleCTAClick}
              onTouchStart={(e) => {
                e.stopPropagation();
                handleCTAClick(e);
              }}
            >
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
        <div className="hero-container">
        <div className="hero-content" ref={heroContentRef}>
          <h1 className="hero-title">
            ANITA
            <br />
            <span className="gradient-text">Personal Finance Assistant</span>
          </h1>
          <p className="hero-tagline">
            Manage your money by simply talking to AI. See where your money goes, track expenses easily, 
            and get personalized help to reach your financial goals.
          </p>
          <div className="hero-cta-group">
            <button 
              className="cta-button primary" 
              onClick={handleCTAClick}
              onTouchStart={(e) => {
                e.stopPropagation();
                handleCTAClick(e);
              }}
            >
              Get Started
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">{smartQuestions}+</div>
              <div className="stat-label">Smart Questions</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{activeUsers}+</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{securePercent}%</div>
              <div className="stat-label">Secure</div>
            </div>
          </div>
        </div>
        <div className="hero-image" ref={heroImageRef}>
          <img 
            src="/images/iPhone 15 Pro - Black Titanium Front (4).png" 
            alt="ANITA Mobile App" 
            className="screenshot-image"
          />
        </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="section-header" ref={sectionHeaderRef}>
          <h2 className="section-title">Everything You Need to Master Your Finances</h2>
          <p className="section-description">
            ANITA combines advanced AI with sophisticated financial analysis to provide 
            actionable insights that help you make better financial decisions.
          </p>
        </div>

        <div className="features-grid" ref={featuresGridRef}>
          <div className="feature-card">
            <div className="feature-number">01</div>
            <h3 className="feature-title">Smart AI Conversation</h3>
            <p className="feature-description">
              Talk to ANITA like you would to a friend. Our AI understands natural language, processes voice messages to make financial management effortless.
            </p>
            <div className="feature-highlights">
              <div className="highlight-item">Voice Integration</div>
              <div className="highlight-item">Smart Advices</div>
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
          <h2 className="section-title">Get Started in Minutes</h2>
          <p className="section-description">
            Three simple steps to transform your financial management
          </p>
        </div>
        <div className="steps-container" ref={stepsContainerRef}>
          <div className="step-item">
            <div className="step-number-circle">1</div>
            <div className="step-line"></div>
            <div className="step-content">
              <h3 className="step-title">Sign Up Free</h3>
              <p className="step-description">
                Create your account in seconds. No credit card required. 
                Start tracking your finances immediately.
              </p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-number-circle">2</div>
            <div className="step-line"></div>
            <div className="step-content">
              <h3 className="step-title">Start Chatting</h3>
              <p className="step-description">
                Log transactions naturally through conversation. 
                Use voice messages, or simply type your expenses.
              </p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-number-circle">3</div>
            <div className="step-line"></div>
            <div className="step-content">
              <h3 className="step-title">Get Insights</h3>
              <p className="step-description">
                Receive personalized financial insights, savings recommendations, 
                and goal suggestions powered by advanced AI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content" ref={ctaContentRef}>
          <h2 className="cta-title">Ready to Transform Your Finances?</h2>
          <p className="cta-description">
            Join the beta and take control of your financial future with ANITA
          </p>
          <button 
            className="cta-button large" 
            onClick={handleCTAClick}
            onTouchStart={(e) => {
              e.stopPropagation();
              handleCTAClick(e);
            }}
          >
            Get Started
          </button>
          <p className="pricing-note">Pricing available in the webapp</p>
        </div>
        
        {/* Footer Content */}
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
      </section>
    </div>
  );
};

export default App;


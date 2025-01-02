export function Footer() {
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-zinc-950 text-zinc-400 py-12 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo and Copyright */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="mb-4">
            <span className="text-2xl font-bold text-white">DebtDetox</span>
          </div>
          <p className="text-sm">
            © 2025 DebtDetox Inc. <br />
            All rights reserved.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-sm font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => scrollToSection("hero")}
                className="hover:text-white transition-colors text-left"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("features")}
                className="hover:text-white transition-colors text-left"
              >
                Features
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("pricing")}
                className="hover:text-white transition-colors text-left"
              >
                Pricing
              </button>
            </li>
            <li>
              <a href="#pricing" className="hover:text-white transition-colors">
                Support
              </a>
            </li>
          </ul>
        </div>

        {/* Why Us */}
        <div>
          <h3 className="text-white text-sm font-semibold mb-4">Why Us?</h3>
          <ul className="space-y-2">
            <li>
              <a
                href=""
                className="hover:text-white transition-colors"
              >
                Smart Debt Prioritization
              </a>
            </li>
            <li>
              <a
                href=""
                className="hover:text-white transition-colors"
              >
                Financial Protection
              </a>
            </li>
            <li>
              <a
                href=""
                className="hover:text-white transition-colors"
              >
                Progress Tracking
              </a>
            </li>
            <li>
              <a
                href=""
                className="hover:text-white transition-colors"
              >
                Savings Automation
              </a>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-white text-sm font-semibold mb-4">Social</h3>
          <ul className="space-y-2">
          <li>
              <a
                href="https://x.com/ratanstwt" 
                className="hover:text-white transition-colors"
              >
                X
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/ratangulati/" className="hover:text-white transition-colors">
                Linkedin
              </a>
            </li>
            <li>
              <a
                href="https://github.com/Ratangulati" 
                className="hover:text-white transition-colors"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

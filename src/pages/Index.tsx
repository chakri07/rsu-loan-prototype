import { TrendingUp, Shield, Zap, DollarSign } from "lucide-react";
import WaitlistForm from "@/components/WaitlistForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[100px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold">EquityLend</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-6 pt-12 md:pt-20 pb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 border border-border/50 text-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-muted-foreground">Early Access Coming Soon</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Unlock Liquidity with Your{" "}
              <span className="gradient-text">RSUs</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
              Get instant access to capital by leveraging your unvested RSUs, stock options, and equity compensation. 
              No selling. No dilution. Just smart financing.
            </p>

            {/* Features */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Avoid Capital Gains</h3>
                  <p className="text-sm text-muted-foreground">No taxable events on your equity</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Keep Upside</h3>
                  <p className="text-sm text-muted-foreground">Retain your equity appreciation</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Fast Approval</h3>
                  <p className="text-sm text-muted-foreground">Get funded in days, not months</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Low Rates</h3>
                  <p className="text-sm text-muted-foreground">Rates starting close to 10%</p>
                </div>
              </div>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-3">
                {["JM", "SK", "AR", "PT"].map((initials, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/40 to-primary/20 border-2 border-background flex items-center justify-center text-xs font-medium text-primary-foreground"
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <span className="text-primary font-semibold">2,400+</span>
                <span className="text-muted-foreground"> professionals on the waitlist</span>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:pl-8">
            <WaitlistForm />
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-24 pt-12 border-t border-border/30">
          <p className="text-center text-sm text-muted-foreground mb-8">
            Trusted by employees at leading tech companies
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-40">
            {["Google", "Meta", "Apple", "Amazon", "Microsoft", "Stripe"].map((company) => (
              <span key={company} className="text-lg font-semibold tracking-wide">
                {company}
              </span>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/30 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2025 EquityLend. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
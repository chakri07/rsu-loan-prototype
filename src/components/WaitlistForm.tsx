import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2, CheckCircle } from "lucide-react";

const WaitlistForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    net_worth: "",
    company: "",
    age: "",
    use_for: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.gender || !formData.net_worth || !formData.company || !formData.age || !formData.use_for) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to join the waitlist.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.from("waitlist").insert({
        name: formData.name,
        email: formData.email,
        gender: formData.gender,
        net_worth: formData.net_worth,
        company: formData.company,
        age: formData.age,
        use_for: formData.use_for,
      });

      if (error) {
        if (error.code === "23505") {
          toast({
            title: "Already Registered",
            description: "This email is already on our waitlist.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
      } else {
        setIsSubmitted(true);
        toast({
          title: "Welcome to the Waitlist!",
          description: "We'll be in touch soon with exclusive early access.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="glass-card p-8 md:p-12 text-center animate-fade-up">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-2xl font-semibold mb-3">You're on the List!</h3>
        <p className="text-muted-foreground">
          We'll reach out with exclusive early access details soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card p-8 md:p-12 space-y-6 animate-fade-up">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-foreground/80">Full Name</Label>
        <Input
          id="name"
          placeholder="John Doe"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="bg-secondary/50 border-border/50 focus:border-primary/50 h-12"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-foreground/80">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="john@company.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="bg-secondary/50 border-border/50 focus:border-primary/50 h-12"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-foreground/80">Gender</Label>
        <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
          <SelectTrigger className="bg-secondary/50 border-border/50 h-12">
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="non-binary">Non-Binary</SelectItem>
            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-foreground/80">Estimated Net Worth</Label>
        <Select value={formData.net_worth} onValueChange={(value) => setFormData({ ...formData, net_worth: value })}>
          <SelectTrigger className="bg-secondary/50 border-border/50 h-12">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="100k-500k">$100K - $500K</SelectItem>
            <SelectItem value="500k-1m">$500K - $1M</SelectItem>
            <SelectItem value="1m-5m">$1M - $5M</SelectItem>
            <SelectItem value="5m-10m">$5M - $10M</SelectItem>
            <SelectItem value="10m+">$10M+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-foreground/80">What company do you work for?</Label>
        <Input
          id="company"
          placeholder="e.g. Google, Meta, Stripe"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          className="bg-secondary/50 border-border/50 focus:border-primary/50 h-12"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-foreground/80">Age</Label>
        <Select value={formData.age} onValueChange={(value) => setFormData({ ...formData, age: value })}>
          <SelectTrigger className="bg-secondary/50 border-border/50 h-12">
            <SelectValue placeholder="Select age range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="18-25">18-25</SelectItem>
            <SelectItem value="26-35">26-35</SelectItem>
            <SelectItem value="36-45">36-45</SelectItem>
            <SelectItem value="46-55">46-55</SelectItem>
            <SelectItem value="55+">55+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-foreground/80">What would you use the funds for?</Label>
        <Select value={formData.use_for} onValueChange={(value) => setFormData({ ...formData, use_for: value })}>
          <SelectTrigger className="bg-secondary/50 border-border/50 h-12">
            <SelectValue placeholder="Select purpose" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="home-purchase">Home Purchase / Down Payment</SelectItem>
            <SelectItem value="investment">Investment Opportunities</SelectItem>
            <SelectItem value="debt-consolidation">Debt Consolidation</SelectItem>
            <SelectItem value="major-purchase">Major Purchase</SelectItem>
            <SelectItem value="emergency">Emergency Fund</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-14 text-lg font-semibold bg-primary hover:bg-gold-light text-primary-foreground gold-glow hover-lift"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Joining...
          </>
        ) : (
          "Join the Waitlist"
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        By joining, you agree to receive updates about our launch.
      </p>
    </form>
  );
};

export default WaitlistForm;
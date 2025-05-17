
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type HireModalProps = {
  buttonText: string;
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  buttonClassName?: string;
  prefilledMessage?: string;
  isCollaboration?: boolean;
};

const HireModal = ({ 
  buttonText,
  buttonVariant = "default",
  buttonClassName = "",
  prefilledMessage = "",
  isCollaboration = false
}: HireModalProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: prefilledMessage,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const message = isCollaboration
      ? `*Collaboration Request*\nName: ${formData.name}\nEmail: ${formData.email}\nProject Type: ${formData.projectType}\nTimeline: ${formData.timeline}\nMessage: ${formData.message}`
      : `*Project Inquiry*\nName: ${formData.name}\nEmail: ${formData.email}\nProject Type: ${formData.projectType}\nBudget: ${formData.budget}\nTimeline: ${formData.timeline}\nMessage: ${formData.message}`;
    
    const whatsappUrl = `https://wa.me/254757086742?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: isCollaboration ? "Let's Collaborate!" : "Project Inquiry Sent!",
      description: "I'll get back to you as soon as possible.",
    });
    
    // Close modal and reset form
    setOpen(false);
    setFormData({
      name: '',
      email: '',
      projectType: '',
      budget: '',
      timeline: '',
      message: '',
    });
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={buttonVariant} className={buttonClassName}>
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {isCollaboration ? "Let's Collaborate!" : "Hire Me For Your Project"}
          </DialogTitle>
          <DialogDescription>
            {isCollaboration
              ? "Have an idea for a collaboration? Let me know the details below."
              : "Fill in your project details and I'll get back to you as soon as possible."
            }
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Your Name
              </label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="projectType" className="text-sm font-medium">
              Project Type
            </label>
            <Select
              onValueChange={(value) => handleSelectChange('projectType', value)}
              value={formData.projectType}
            >
              <SelectTrigger id="projectType" className="w-full">
                <SelectValue placeholder="Select project type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Project Types</SelectLabel>
                  <SelectItem value="website">Website Development</SelectItem>
                  <SelectItem value="webapp">Web Application</SelectItem>
                  <SelectItem value="mobile">Mobile App</SelectItem>
                  <SelectItem value="ecommerce">E-commerce Solution</SelectItem>
                  <SelectItem value="security">Cybersecurity Project</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          {!isCollaboration && (
            <div className="space-y-2">
              <label htmlFor="budget" className="text-sm font-medium">
                Budget Range (USD)
              </label>
              <Select
                onValueChange={(value) => handleSelectChange('budget', value)}
                value={formData.budget}
              >
                <SelectTrigger id="budget" className="w-full">
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="<500">Less than $500</SelectItem>
                  <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                  <SelectItem value="1000-2500">$1,000 - $2,500</SelectItem>
                  <SelectItem value="2500-5000">$2,500 - $5,000</SelectItem>
                  <SelectItem value=">5000">$5,000+</SelectItem>
                  <SelectItem value="negotiable">Negotiable</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          
          <div className="space-y-2">
            <label htmlFor="timeline" className="text-sm font-medium">
              Timeline
            </label>
            <Select
              onValueChange={(value) => handleSelectChange('timeline', value)}
              value={formData.timeline}
            >
              <SelectTrigger id="timeline" className="w-full">
                <SelectValue placeholder="Select timeline" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="urgent">ASAP / Urgent</SelectItem>
                <SelectItem value="1week">Within 1 week</SelectItem>
                <SelectItem value="2weeks">Within 2 weeks</SelectItem>
                <SelectItem value="1month">Within a month</SelectItem>
                <SelectItem value="3months">1-3 months</SelectItem>
                <SelectItem value="flexible">Flexible</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Project Details
            </label>
            <Textarea
              id="message"
              name="message"
              placeholder={isCollaboration
                ? "Tell me about your collaboration idea..."
                : "Describe your project requirements, goals, and any specific features you need..."
              }
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          
          <DialogFooter className="pt-4">
            <Button type="submit" disabled={loading} className="w-full bg-accent hover:bg-accent/80">
              {loading ? "Processing..." : isCollaboration ? "Let's Collaborate!" : "Send to WhatsApp"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default HireModal;

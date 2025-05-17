
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Github, Linkedin, Mail, Phone, Twitter } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [sending, setSending] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    // Show confirmation dialog
    setShowConfirmDialog(true);
  };

  const sendViaWhatsApp = () => {
    const message = `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`;
    const whatsappUrl = `https://wa.me/254757086742?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    setShowConfirmDialog(false);
    
    toast({
      title: "Message prepared!",
      description: "You'll be redirected to WhatsApp to send your message.",
    });
    
    setFormData({ name: '', email: '', message: '' });
    setSending(false);
  };

  const cancelSend = () => {
    setShowConfirmDialog(false);
    setSending(false);
  };

  const sendMeme = () => {
    toast({
      title: "Good choice!",
      description: "Memes are the superior form of communication anyway 😂",
    });
  };

  return (
    <section id="contact" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Get In <span className="text-accent">Touch</span>
          </h2>
          
          <p className="text-center text-lg mb-10">
            Have a project in mind or just want to connect? I'm always open to new opportunities and interesting conversations.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4">Send Me a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="What should I call you, code warrior?"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="johndoe@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell me your darkest bugs… or just say hi."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button type="submit" disabled={sending} className="w-full sm:w-auto">
                    {sending ? 'Sending...' : 'Send Message'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={sendMeme}
                    className="w-full sm:w-auto"
                  >
                    Send a Meme Instead
                  </Button>
                </div>
              </form>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Connect With Me</h3>
              
              <p className="mb-6">
                You can find me on various platforms or reach out directly via email. 
                I'm always interested in hearing about new projects and opportunities.
              </p>
              
              <div className="space-y-4">
                <a 
                  href="mailto:kelvinmukaria2023@gmail.com" 
                  className="flex items-center p-3 rounded-md hover:bg-secondary transition-colors"
                >
                  <Mail className="h-6 w-6 mr-3 text-accent" />
                  <span>kelvinmukaria2023@gmail.com</span>
                </a>
                  
                <a 
                  className="flex items-center p-3 rounded-md hover:bg-secondary transition-colors"
                >
                  <Phone className="h-6 w-6 mr-3 text-accent" />
                  <span className="flex flex-col">
                    <a href="tel:+254708889092" className="hover:underline">+254 708 889 092</a>
                    <a href="tel:+254757086742" className="hover:underline">+254 757 086 742</a>
                </span>
                </a>
                
                <a 
                  href="https://github.com/kevrollin" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 rounded-md hover:bg-secondary transition-colors"
                >
                  <Github className="h-6 w-6 mr-3 text-accent" />
                  <span>GitHub</span>
                </a>
                
                <a 
                  href="https://www.linkedin.com/in/kelvin-mukaria-831211359/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 rounded-md hover:bg-secondary transition-colors"
                >
                  <Linkedin className="h-6 w-6 mr-3 text-accent" />
                  <span>LinkedIn</span>
                </a>
                
                <a 
                  href="https://x.com/kevrollin012" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 rounded-md hover:bg-secondary transition-colors"
                >
                  <Twitter className="h-6 w-6 mr-3 text-accent" />
                  <span>Twitter | X</span>
                </a>
              </div>
              
              <div className="mt-6 bg-accent/5 p-4 rounded-md border border-accent/10">
                <p className="text-sm">
                  <span className="font-bold">Pro Tip:</span> Open the browser console for a surprise. Developers who find it get priority responses 😉
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Send via WhatsApp?</DialogTitle>
            <DialogDescription>
              Your message will be prepared for WhatsApp. You'll need to press send on WhatsApp to deliver it.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              This will open WhatsApp with your message pre-filled. You can review it before sending.
            </p>
          </div>
          <DialogFooter className="sm:justify-between">
            <Button type="button" variant="secondary" onClick={cancelSend}>
              Cancel
            </Button>
            <Button type="button" onClick={sendViaWhatsApp} className="bg-[#25D366] hover:bg-[#20BD5B] text-white">
              Open WhatsApp
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ContactSection;

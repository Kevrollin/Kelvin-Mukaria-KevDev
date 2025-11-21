
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';
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
    phone: '',
    message: ''
  });
  const [sending, setSending] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [errors, setErrors] = useState<{ phone?: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Simple Kenyan phone validation helper
  const isValidKenyanPhone = (phone: string) => {
    const digits = phone.replace(/\D/g, '');
    // Accept formats like: +2547XXXXXXXX, 2547XXXXXXXX, 07XXXXXXXX, 7XXXXXXXX
    if (!digits) return false;
    if (/^2547\d{8}$/.test(digits)) return true;
    if (/^07\d{8}$/.test(digits)) return true;
    if (/^7\d{8}$/.test(digits)) return true;
    return false;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // clear previous errors
    setErrors({});

    // Validate phone if provided
    if (formData.phone && !isValidKenyanPhone(formData.phone)) {
      setErrors({ phone: 'Please enter a valid Kenyan phone number (e.g. +2547XXXXXXXX).' });
      return;
    }

    // Open confirmation dialog to choose send method
    setShowConfirmDialog(true);
  };

  const sendEmail = () => {
    setSending(true);

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      message: formData.message,
    };

    emailjs
      .send('service_ej3wqaq', 'template_134wyxx', templateParams, 'OEzF15RYCvBQI8hwR')
      .then(() => {
        toast({
          title: 'Message sent',
          description: "Thanks! I've received your message and will get back to you soon.",
        });
        setFormData({ name: '', email: '', phone: '', message: '' });
        setShowConfirmDialog(false);
      })
      .catch((err) => {
        console.error('EmailJS error:', err);
        toast({
          title: 'Failed to send',
          description: 'Something went wrong while sending your message. Please try again or use the contact links.',
        });
      })
      .finally(() => setSending(false));
  };

  const sendViaWhatsApp = () => {
    const message = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nMessage: ${formData.message}`;
    const whatsappUrl = `https://wa.me/254757086742?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    setShowConfirmDialog(false);
    
    toast({
      title: "Message prepared!",
      description: "You'll be redirected to WhatsApp to send your message.",
    });
    
    setFormData({ name: '', email: '', phone: '', message: '' });
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
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">
                    Phone
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+254 7xx xxx xxx"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
                  )}
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
                  <Button type="submit" disabled={sending} className="w-full sm:w-auto flex items-center justify-center">
                    {sending ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
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
            <DialogTitle>Send Message</DialogTitle>
            <DialogDescription>
              Choose how you'd like to send this message — via Email or WhatsApp.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              You can send the message using Email (delivered to me via EmailJS) or open WhatsApp to send it from your device. Choose one below.
            </p>
          </div>
          <DialogFooter className="sm:justify-between">
            <div className="flex gap-2 w-full sm:w-auto">
              <Button type="button" variant="secondary" onClick={cancelSend} className="flex-1">
                Cancel
              </Button>
              <Button type="button" onClick={sendEmail} className="flex-1">
                {sending ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Send via Email'
                )}
              </Button>
              <Button type="button" onClick={sendViaWhatsApp} className="bg-[#25D366] hover:bg-[#20BD5B] text-white flex-1">
                Open WhatsApp
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ContactSection;

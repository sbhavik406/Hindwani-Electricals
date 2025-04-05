import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSubmissionSchema } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


// Extend the schema with additional validation
const formSchema = insertContactSubmissionSchema.extend({
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: (data: FormValues) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your message has been sent. We'll get back to you soon.",
        variant: "default",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-16 bg-[#F5F5F5]">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Inter'] text-[#0052A5]">
            Contact Us
          </h2>
          <div className="w-20 h-1 bg-[#FF6B00] mx-auto mb-6"></div>
          <p className="text-lg max-w-3xl mx-auto">
            Have questions or need assistance? Get in touch with our team today.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-6 font-['Inter']">Send Us a Message</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input placeholder="Your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Your phone number (optional)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject *</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="product_inquiry">Product Inquiry</SelectItem>
                          <SelectItem value="quote_request">Price Quote</SelectItem>
                          <SelectItem value="stock_inquiry">Stock Availability</SelectItem>
                          <SelectItem value="bulk_order">Bulk Order</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Your message" 
                          className="min-h-[120px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="bg-[#0052A5] hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </Form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-6 font-['Inter']">Contact Information</h3>
            
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <div className="flex items-start mb-4">
                <div className="bg-[#0052A5] text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Our Location</h4>
                  <p className="text-gray-600">234, SV Ln, near Hotel Vijay Vihar, Mamulpet<br/>Chickpet, Bengaluru, Karnataka 560053</p>
                </div>
              </div>

              <div className="flex items-start mb-4">
                <div className="bg-[#0052A5] text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Phone Number</h4>
                  <p className="text-gray-600">+91 9916065658</p>
                </div>
              </div>

              <div className="flex items-start mb-4">
                <div className="bg-[#0052A5] text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Email Address</h4>
                  <p className="text-gray-600">srihindwanielectricals@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-[#0052A5] text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <i className="fas fa-clock"></i>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Business Hours</h4>
                  <p className="text-gray-600">Monday - Saturday: 10:30 AM - 8:00 PM</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden shadow-md p-5 bg-white mb-6 text-center">
              <h4 className="font-bold text-lg mb-3">Find Us on Google Maps</h4>
              <a 
                href="https://g.co/kgs/8urq88Y" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-[#0052A5] text-white font-medium py-2 px-4 rounded-md inline-flex items-center hover:bg-[#FF6B00] transition-colors"
              >
                <i className="fas fa-map-marker-alt mr-2"></i>
                View on Google Maps
              </a>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-bold text-lg mb-3">Connect With Us</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://www.facebook.com/hindwanielectrical/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-[#0052A5] text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#FF6B00] transition-colors"
                  aria-label="Facebook Page"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a 
                  href="https://www.justdial.com/jdmart/Bangalore/Sri-Hindwani-Electricals-Near-Hotel-Vijay-Vihar-Chickpete/080P11446_BZDET/catalogue" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-[#0052A5] text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#FF6B00] transition-colors"
                  aria-label="JustDial Page"
                >
                  <i className="fas fa-search-location"></i>
                </a>
                <a 
                  href="https://www.indiamart.com/sri-hindwani-electricals/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-[#0052A5] text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#FF6B00] transition-colors"
                  aria-label="IndiaMart Page"
                >
                  <i className="fas fa-shopping-bag"></i>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

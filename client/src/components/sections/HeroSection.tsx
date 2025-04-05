import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section id="home" className="bg-gradient-to-r from-[#0052A5] to-blue-800 text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 mb-8 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-['Inter']">
              Premium Electrical Solutions for Your Home & Business
            </h1>
            <p className="text-lg mb-8">
              Your trusted partner for quality electrical supplies, professional services, and expert advice.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="#products">
                <Button 
                  className="bg-[#FF6B00] hover:bg-orange-700 text-white font-medium py-3 px-6 rounded-md w-full sm:w-auto"
                >
                  Explore Products
                </Button>
              </a>
              <a href="#contact">
                <Button 
                  variant="outline" 
                  className="border-2 border-white hover:bg-white hover:text-[#0052A5] font-medium py-3 px-6 rounded-md transition-colors duration-300 w-full sm:w-auto"
                >
                  Contact Us
                </Button>
              </a>
            </div>
          </motion.div>
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Professional Electrician at Work" 
              className="rounded-lg shadow-xl" 
              width="600" 
              height="400"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

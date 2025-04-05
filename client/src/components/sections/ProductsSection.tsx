import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const ProductsSection = () => {
  const productCategories = [
    {
      image: "https://images.unsplash.com/photo-1558402529-d2638a7027b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      title: "Wiring & Cables",
      description: "High-quality electrical wires and cables for residential and commercial use."
    },
    {
      image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      title: "Switches & Outlets",
      description: "Modern switches, sockets, and outlets in various designs and finishes."
    },
    {
      image: "https://images.unsplash.com/photo-1570618310838-d9a2a28ec4f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      title: "Lighting Solutions",
      description: "Energy-efficient indoor and outdoor lighting fixtures and bulbs."
    },
    {
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      title: "Electrical Panels",
      description: "Distribution boards, circuit breakers, and safety equipment."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="products" className="py-16 bg-[#F5F5F5]">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Inter'] text-[#0052A5]">
            Our Product Categories
          </h2>
          <div className="w-20 h-1 bg-[#FF6B00] mx-auto mb-6"></div>
          <p className="text-lg max-w-3xl mx-auto">
            Browse our extensive collection of premium electrical supplies for residential and commercial applications.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {productCategories.map((category, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              variants={itemVariants}
            >
              <img 
                src={category.image} 
                alt={category.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2 font-['Inter']">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <a 
                  href="#" 
                  className="text-[#0052A5] font-medium hover:text-[#FF6B00] transition-colors inline-flex items-center"
                >
                  View Products <i className="fas fa-chevron-right ml-2 text-sm"></i>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button 
            className="bg-[#0052A5] hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-md"
          >
            View All Products
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;

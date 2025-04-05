import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const TestimonialsSection = () => {
  const testimonials = [
    {
      content: "Finolex Electric provided exceptional service for our office renovation. Their team was professional, punctual, and the quality of work exceeded our expectations.",
      name: "John Davis",
      position: "Business Owner",
      initials: "JD",
      rating: 5
    },
    {
      content: "I've been purchasing supplies from Finolex for my electrical contracting business for years. Their product quality and customer service are consistently outstanding.",
      name: "Sarah Rodriguez",
      position: "Electrical Contractor",
      initials: "SR",
      rating: 5
    },
    {
      content: "The team at Finolex installed a complete lighting system in our new home. The results are beautiful, and their attention to detail was impressive. Highly recommended!",
      name: "Michael Parker",
      position: "Homeowner",
      initials: "MP",
      rating: 4.5
    },
    {
      content: "As a property manager, I've worked with many electrical suppliers, but Finolex stands out for their reliability and expertise. They're my go-to for all electrical needs.",
      name: "Emma Thompson",
      position: "Property Manager",
      initials: "ET",
      rating: 5
    }
  ];

  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const checkScrollable = () => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      }
    };

    checkScrollable();
    window.addEventListener('resize', checkScrollable);
    return () => window.removeEventListener('resize', checkScrollable);
  }, []);

  const handleScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollPrev = () => {
    if (carouselRef.current) {
      const scrollAmount = 400; // Approximate width of a testimonial card
      carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollNext = () => {
    if (carouselRef.current) {
      const scrollAmount = 400; // Approximate width of a testimonial card
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star"></i>);
    }

    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }

    return stars;
  };

  return (
    <section id="testimonials" className="py-16 bg-[#0052A5] text-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Inter']">Customer Testimonials</h2>
          <div className="w-20 h-1 bg-[#FF6B00] mx-auto mb-6"></div>
          <p className="text-lg max-w-3xl mx-auto">
            See what our satisfied customers have to say about our products and services.
          </p>
        </motion.div>

        <div className="relative">
          <div 
            ref={carouselRef}
            className="flex overflow-x-auto pb-8 -mx-4 px-4 scrollbar-hide scroll-smooth"
            onScroll={handleScroll}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                className="min-w-[300px] md:min-w-[400px] px-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-white text-[#333333] p-6 rounded-lg shadow-md">
                  <div className="text-[#FF6B00] mb-4">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="italic mb-6">{`"${testimonial.content}"`}</p>
                  <div className="flex items-center">
                    <div className="bg-[#0052A5] rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-xl">
                      {testimonial.initials}
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.position}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            <button 
              onClick={scrollPrev}
              className={`bg-white text-[#0052A5] hover:bg-[#FF6B00] hover:text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-colors ${!canScrollLeft ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!canScrollLeft}
              aria-label="Previous testimonial"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button 
              onClick={scrollNext}
              className={`bg-white text-[#0052A5] hover:bg-[#FF6B00] hover:text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-colors ${!canScrollRight ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!canScrollRight}
              aria-label="Next testimonial"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

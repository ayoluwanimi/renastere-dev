import { Code, Palette, Cloud, Smartphone, ShoppingCart, MessageSquare } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Globe: Code,
  Smartphone: Smartphone,
  Palette: Palette,
  Cloud: Cloud,
  ShoppingCart: ShoppingCart,
  MessageSquare: MessageSquare,
};

export function Services() {
  const { content } = useContent();

  return (
    <div className="min-h-screen py-20">
      {/* Hero */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">Our Services</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive digital solutions tailored to your business needs
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.services.map((service) => {
              const IconComponent = iconMap[service.icon] || Code;
              return (
                <div
                  key={service.id}
                  className="group p-8 bg-gradient-to-br from-[#16213e] to-[#1a1a2e] rounded-2xl border border-gray-700/50 hover:border-[#e94560]/50 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#e94560] to-[#ff6b6b] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 mt-16 bg-[#1a1a2e]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Process</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A proven approach to delivering exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', description: 'Understanding your goals and requirements' },
              { step: '02', title: 'Planning', description: 'Creating a detailed roadmap for success' },
              { step: '03', title: 'Development', description: 'Building your solution with precision' },
              { step: '04', title: 'Delivery', description: 'Launching and supporting your product' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-6xl font-bold text-[#e94560]/20 mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

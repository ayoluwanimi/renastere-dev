import { Link } from 'react-router-dom';
import { ArrowRight, Code, Palette, Cloud, Smartphone, ShoppingCart, MessageSquare } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Globe: Code,
  Smartphone: Smartphone,
  Palette: Palette,
  Cloud: Cloud,
  ShoppingCart: ShoppingCart,
  MessageSquare: MessageSquare,
};

export function Home() {
  const { content } = useContent();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {content.images?.heroBackground ? (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${content.images.heroBackground})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f1a]/90 via-[#1a1a2e]/85 to-[#16213e]/90" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#16213e]" />
        )}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#e94560]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#0f3460]/30 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-[#e94560]/20 border border-[#e94560]/30 rounded-full mb-6">
              <span className="text-[#e94560] text-sm font-medium">Welcome to Renastere Dev</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            {content.hero.title}
          </h1>
          <h2 className="text-2xl md:text-3xl text-[#e94560] font-semibold mb-6">
            {content.hero.subtitle}
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            {content.hero.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/projects"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#e94560] to-[#ff6b6b] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#e94560]/30 transition-all duration-300"
            >
              View Our Work
              <ArrowRight className="ml-2" size={20} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-[#e94560] text-[#e94560] font-semibold rounded-lg hover:bg-[#e94560] hover:text-white transition-all duration-300"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-[#1a1a2e]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Services</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We offer a comprehensive range of digital services to help your business thrive
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.services.slice(0, 6).map((service) => {
              const IconComponent = iconMap[service.icon] || Code;
              return (
                <div
                  key={service.id}
                  className="group p-8 bg-gradient-to-br from-[#16213e] to-[#1a1a2e] rounded-2xl border border-gray-700/50 hover:border-[#e94560]/50 transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-[#e94560] to-[#ff6b6b] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-400">{service.description}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center text-[#e94560] hover:text-[#ff6b6b] font-medium transition-colors"
            >
              View All Services
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Projects Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Featured Projects</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Explore some of our recent work and see how we've helped businesses grow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.projects.slice(0, 3).map((project) => (
              <div
                key={project.id}
                className="group relative overflow-hidden rounded-2xl bg-[#16213e] border border-gray-700/50 hover:border-[#e94560]/50 transition-all duration-300"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="text-[#e94560] text-sm font-medium">{project.category}</span>
                  <h3 className="text-xl font-semibold text-white mt-2 mb-3">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-[#0f3460] text-gray-300 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/projects"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#e94560] to-[#ff6b6b] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#e94560]/30 transition-all duration-300"
            >
              View All Projects
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="py-20 bg-[#1a1a2e]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Meet Our Leaders</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our Co-CEOs bring together decades of experience in technology and business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {content.team.map((member) => (
              <Link
                key={member.id}
                to={`/team/${member.id}`}
                className="group p-6 bg-gradient-to-br from-[#16213e] to-[#1a1a2e] rounded-2xl border border-gray-700/50 hover:border-[#e94560]/50 transition-all duration-300 text-center"
              >
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-[#e94560]/30 group-hover:border-[#e94560] transition-colors duration-300">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                <p className="text-[#e94560] font-medium mb-3">{member.role}</p>
                <p className="text-gray-400 text-sm line-clamp-3">{member.bio}</p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/team"
              className="inline-flex items-center text-[#e94560] hover:text-[#ff6b6b] font-medium transition-colors"
            >
              Learn More About Our Team
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-12 bg-gradient-to-r from-[#e94560]/20 to-[#0f3460]/20 rounded-3xl border border-[#e94560]/30">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help bring your ideas to life. Our team is ready to create something amazing together.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#e94560] to-[#ff6b6b] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#e94560]/30 transition-all duration-300"
            >
              Contact Us Today
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

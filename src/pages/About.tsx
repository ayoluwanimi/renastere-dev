import { Target, Eye, Users, Award } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export function About() {
  const { content } = useContent();

  return (
    <div className="min-h-screen py-20">
      {/* Hero */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">{content.about.title}</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {content.about.description}
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-[#1a1a2e]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-gradient-to-br from-[#16213e] to-[#1a1a2e] rounded-2xl border border-gray-700/50">
              <div className="w-14 h-14 bg-gradient-to-br from-[#e94560] to-[#ff6b6b] rounded-xl flex items-center justify-center mb-6">
                <Target size={28} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-gray-400">{content.about.mission}</p>
            </div>
            <div className="p-8 bg-gradient-to-br from-[#16213e] to-[#1a1a2e] rounded-2xl border border-gray-700/50">
              <div className="w-14 h-14 bg-gradient-to-br from-[#e94560] to-[#ff6b6b] rounded-xl flex items-center justify-center mb-6">
                <Eye size={28} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
              <p className="text-gray-400">{content.about.vision}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Core Values</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Award, title: 'Excellence', description: 'We strive for the highest quality in every project' },
              { icon: Users, title: 'Collaboration', description: 'Working together to achieve outstanding results' },
              { icon: Target, title: 'Innovation', description: 'Pushing boundaries with creative solutions' },
              { icon: Eye, title: 'Transparency', description: 'Open and honest communication always' },
            ].map((value, index) => (
              <div
                key={index}
                className="p-6 bg-gradient-to-br from-[#16213e] to-[#1a1a2e] rounded-2xl border border-gray-700/50 text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#e94560] to-[#ff6b6b] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <value.icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#1a1a2e]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '50+', label: 'Projects Completed' },
              { number: '30+', label: 'Happy Clients' },
              { number: '5+', label: 'Years Experience' },
              { number: '100%', label: 'Client Satisfaction' },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl md:text-5xl font-bold text-[#e94560] mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

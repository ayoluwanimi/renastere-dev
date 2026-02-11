import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export function Projects() {
  const { content } = useContent();
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...new Set(content.projects.map((p) => p.category))];
  const filteredProjects =
    filter === 'All' ? content.projects : content.projects.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen py-20">
      {/* Hero */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">Our Projects</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our portfolio of successful projects across various industries
            </p>
          </div>

          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  filter === category
                    ? 'bg-gradient-to-r from-[#e94560] to-[#ff6b6b] text-white'
                    : 'bg-[#16213e] text-gray-300 hover:bg-[#1a1a2e]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group relative overflow-hidden rounded-2xl bg-[#16213e] border border-gray-700/50 hover:border-[#e94560]/50 transition-all duration-300"
              >
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16213e] to-transparent opacity-60" />
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-4 right-4 w-10 h-10 bg-[#e94560] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <ExternalLink size={18} className="text-white" />
                    </a>
                  )}
                </div>
                <div className="p-6">
                  <span className="text-[#e94560] text-sm font-medium">{project.category}</span>
                  <h3 className="text-xl font-semibold text-white mt-2 mb-3">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
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
        </div>
      </section>
    </div>
  );
}

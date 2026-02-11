import { useParams, Link } from 'react-router-dom';
import { Mail, Linkedin, Twitter, ArrowLeft, ExternalLink } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export function TeamMemberPortfolio() {
  const { id } = useParams<{ id: string }>();
  const { content } = useContent();

  const member = content.team.find((m) => m.id === id);

  if (!member) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Team Member Not Found</h1>
          <Link
            to="/team"
            className="inline-flex items-center text-[#e94560] hover:text-[#ff6b6b] font-medium"
          >
            <ArrowLeft className="mr-2" size={18} />
            Back to Team
          </Link>
        </div>
      </div>
    );
  }

  const memberProjects = content.projects.filter((p) => member.projects.includes(p.id));

  return (
    <div className="min-h-screen py-20">
      {/* Back Button */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/team"
            className="inline-flex items-center text-gray-400 hover:text-[#e94560] transition-colors"
          >
            <ArrowLeft className="mr-2" size={18} />
            Back to Team
          </Link>
        </div>
      </section>

      {/* Profile Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#16213e] to-[#1a1a2e] rounded-3xl border border-gray-700/50 p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="w-48 h-48 rounded-2xl overflow-hidden border-4 border-[#e94560]/30 flex-shrink-0">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl font-bold text-white mb-2">{member.name}</h1>
                <p className="text-xl text-[#e94560] font-semibold mb-6">{member.role}</p>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">{member.bio}</p>
                
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <a
                    href={`mailto:${member.email}`}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#e94560] to-[#ff6b6b] text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#e94560]/30 transition-all"
                  >
                    <Mail className="mr-2" size={18} />
                    Contact
                  </a>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-[#0f3460] rounded-lg flex items-center justify-center text-gray-400 hover:bg-[#e94560] hover:text-white transition-all"
                    >
                      <Linkedin size={20} />
                    </a>
                  )}
                  {member.twitter && (
                    <a
                      href={member.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-[#0f3460] rounded-lg flex items-center justify-center text-gray-400 hover:bg-[#e94560] hover:text-white transition-all"
                    >
                      <Twitter size={20} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8">Projects by {member.name.split(' ')[0]}</h2>
          
          {memberProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {memberProjects.map((project) => (
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
          ) : (
            <div className="text-center py-12 bg-[#16213e]/50 rounded-2xl">
              <p className="text-gray-400">No projects assigned yet. Projects will be added soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* All Projects Link */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            to="/projects"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#e94560] to-[#ff6b6b] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#e94560]/30 transition-all duration-300"
          >
            View All Company Projects
            <ExternalLink className="ml-2" size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}

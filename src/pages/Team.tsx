import { Link } from 'react-router-dom';
import { Mail, Linkedin, Twitter, ArrowRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export function Team() {
  const { content } = useContent();

  return (
    <div className="min-h-screen py-20">
      {/* Hero */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">Our Team</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Meet the visionary leaders behind Renastere Dev
            </p>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {content.team.map((member) => (
              <div
                key={member.id}
                className="group p-8 bg-gradient-to-br from-[#16213e] to-[#1a1a2e] rounded-2xl border border-gray-700/50 hover:border-[#e94560]/50 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div className="w-40 h-40 rounded-2xl overflow-hidden border-4 border-[#e94560]/30 group-hover:border-[#e94560] transition-colors duration-300 flex-shrink-0">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                    <p className="text-[#e94560] font-semibold mb-4">{member.role}</p>
                    <p className="text-gray-400 mb-6">{member.bio}</p>
                    
                    <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
                      <a
                        href={`mailto:${member.email}`}
                        className="w-10 h-10 bg-[#0f3460] rounded-full flex items-center justify-center text-gray-400 hover:bg-[#e94560] hover:text-white transition-all"
                      >
                        <Mail size={18} />
                      </a>
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-[#0f3460] rounded-full flex items-center justify-center text-gray-400 hover:bg-[#e94560] hover:text-white transition-all"
                        >
                          <Linkedin size={18} />
                        </a>
                      )}
                      {member.twitter && (
                        <a
                          href={member.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-[#0f3460] rounded-full flex items-center justify-center text-gray-400 hover:bg-[#e94560] hover:text-white transition-all"
                        >
                          <Twitter size={18} />
                        </a>
                      )}
                    </div>

                    <Link
                      to={`/team/${member.id}`}
                      className="inline-flex items-center text-[#e94560] hover:text-[#ff6b6b] font-medium transition-colors"
                    >
                      View Portfolio
                      <ArrowRight className="ml-2" size={18} />
                    </Link>
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

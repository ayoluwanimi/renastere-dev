import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { 
  Home, Info, Briefcase, FolderOpen, Users, Phone, Settings,
  Save, Plus, Trash2, X, Image as ImageIcon
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useContent } from '../context/ContentContext';
import { Project, Service } from '../types';
import { ImageUpload } from '../components/ImageUpload';
import { ProjectLinkImport } from '../components/ProjectLinkImport';

type Tab = 'hero' | 'about' | 'services' | 'projects' | 'team' | 'contact' | 'footer' | 'images';

export function Admin() {
  const { isAuthenticated } = useAuth();
  const { 
    content, 
    updateHero, 
    updateAbout, 
    updateService, 
    addService, 
    deleteService,
    updateProject, 
    addProject, 
    deleteProject,
    updateTeamMember,
    updateContact,
    updateFooter,
    updateImages
  } = useContent();
  
  const [activeTab, setActiveTab] = useState<Tab>('images');
  const [saveMessage, setSaveMessage] = useState('');
  
  // Local state for forms
  const [heroForm, setHeroForm] = useState(content.hero);
  const [aboutForm, setAboutForm] = useState(content.about);
  const [contactForm, setContactForm] = useState(content.contact);
  const [footerForm, setFooterForm] = useState(content.footer);
  const [imagesForm, setImagesForm] = useState(content.images);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null);
  const [teamImages, setTeamImages] = useState<Record<string, string>>({});

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const showSaveMessage = () => {
    setSaveMessage('Changes saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const tabs = [
    { id: 'images' as Tab, label: 'Images', icon: ImageIcon },
    { id: 'hero' as Tab, label: 'Hero', icon: Home },
    { id: 'about' as Tab, label: 'About', icon: Info },
    { id: 'services' as Tab, label: 'Services', icon: Briefcase },
    { id: 'projects' as Tab, label: 'Projects', icon: FolderOpen },
    { id: 'team' as Tab, label: 'Team', icon: Users },
    { id: 'contact' as Tab, label: 'Contact', icon: Phone },
    { id: 'footer' as Tab, label: 'Footer', icon: Settings },
  ];

  const handleSaveHero = () => {
    updateHero(heroForm);
    showSaveMessage();
  };

  const handleSaveAbout = () => {
    updateAbout(aboutForm);
    showSaveMessage();
  };

  const handleSaveContact = () => {
    updateContact(contactForm);
    showSaveMessage();
  };

  const handleSaveFooter = () => {
    updateFooter(footerForm);
    showSaveMessage();
  };

  const handleSaveImages = () => {
    updateImages(imagesForm);
    showSaveMessage();
  };

  const handleSaveService = (service: Service) => {
    if (content.services.find(s => s.id === service.id)) {
      updateService(service);
    } else {
      addService(service);
    }
    setEditingService(null);
    showSaveMessage();
  };

  const handleSaveProject = (project: Project) => {
    if (content.projects.find(p => p.id === project.id)) {
      updateProject(project);
    } else {
      addProject(project);
    }
    setEditingProject(null);
    showSaveMessage();
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-gray-400 mt-2">Manage your website content</p>
        </div>

        {saveMessage && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400">
            {saveMessage}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-gradient-to-br from-[#16213e] to-[#1a1a2e] rounded-2xl border border-gray-700/50 p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-[#e94560] to-[#ff6b6b] text-white'
                        : 'text-gray-300 hover:bg-gray-700/50'
                    }`}
                  >
                    <tab.icon size={20} />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            <div className="bg-gradient-to-br from-[#16213e] to-[#1a1a2e] rounded-2xl border border-gray-700/50 p-8">
              
              {/* Images Section - NEW */}
              {activeTab === 'images' && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-white">Site Images</h2>
                  <p className="text-gray-400">Upload your logo and background images here. Images are stored locally and will persist in your browser.</p>
                  
                  {/* Logo Upload */}
                  <div className="p-6 bg-[#0f3460] rounded-xl">
                    <ImageUpload
                      currentImage={imagesForm.logo}
                      onImageChange={(img) => setImagesForm({ ...imagesForm, logo: img })}
                      label="Company Logo"
                      aspectRatio="aspect-square"
                    />
                    <p className="text-gray-500 text-sm mt-2">Recommended: Square image, minimum 200x200px</p>
                  </div>

                  {/* Hero Background Upload */}
                  <div className="p-6 bg-[#0f3460] rounded-xl">
                    <ImageUpload
                      currentImage={imagesForm.heroBackground}
                      onImageChange={(img) => setImagesForm({ ...imagesForm, heroBackground: img })}
                      label="Hero Background Image"
                      aspectRatio="aspect-video"
                    />
                    <p className="text-gray-500 text-sm mt-2">Recommended: 1920x1080px or larger</p>
                  </div>

                  {/* About Background Upload */}
                  <div className="p-6 bg-[#0f3460] rounded-xl">
                    <ImageUpload
                      currentImage={imagesForm.aboutBackground}
                      onImageChange={(img) => setImagesForm({ ...imagesForm, aboutBackground: img })}
                      label="About Section Background Image"
                      aspectRatio="aspect-video"
                    />
                    <p className="text-gray-500 text-sm mt-2">Recommended: 1920x1080px or larger</p>
                  </div>

                  <button
                    onClick={handleSaveImages}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#e94560] to-[#ff6b6b] text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#e94560]/30 transition-all"
                  >
                    <Save size={18} />
                    Save Images
                  </button>
                </div>
              )}

              {/* Hero Section */}
              {activeTab === 'hero' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white">Hero Section</h2>
                  <div>
                    <label className="block text-white font-medium mb-2">Title</label>
                    <input
                      type="text"
                      value={heroForm.title}
                      onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0f3460] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#e94560]"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Subtitle</label>
                    <input
                      type="text"
                      value={heroForm.subtitle}
                      onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0f3460] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#e94560]"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Description</label>
                    <textarea
                      rows={4}
                      value={heroForm.description}
                      onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0f3460] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#e94560] resize-none"
                    />
                  </div>
                  <button
                    onClick={handleSaveHero}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#e94560] to-[#ff6b6b] text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#e94560]/30 transition-all"
                  >
                    <Save size={18} />
                    Save Changes
                  </button>
                </div>
              )}

              {/* About Section */}
              {activeTab === 'about' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white">About Section</h2>
                  <div>
                    <label className="block text-white font-medium mb-2">Title</label>
                    <input
                      type="text"
                      value={aboutForm.title}
                      onChange={(e) => setAboutForm({ ...aboutForm, title: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0f3460] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#e94560]"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Description</label>
                    <textarea
                      rows={4}
                      value={aboutForm.description}
                      onChange={(e) => setAboutForm({ ...aboutForm, description: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0f3460] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#e94560] resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Mission</label>
                    <textarea
                      rows={3}
                      value={aboutForm.mission}
                      onChange={(e) => setAboutForm({ ...aboutForm, mission: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0f3460] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#e94560] resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Vision</label>
                    <textarea
                      rows={3}
                      value={aboutForm.vision}
                      onChange={(e) => setAboutForm({ ...aboutForm, vision: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0f3460] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#e94560] resize-none"
                    />
                  </div>
                  <button
                    onClick={handleSaveAbout}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#e94560] to-[#ff6b6b] text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#e94560]/30 transition-all"
                  >
                    <Save size={18} />
                    Save Changes
                  </button>
                </div>
              )}

              {/* Services Section */}
              {activeTab === 'services' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Services</h2>
                    <button
                      onClick={() => setEditingService({
                        id: Date.now().toString(),
                        title: '',
                        description: '',
                        icon: 'Globe'
                      })}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#e94560] to-[#ff6b6b] text-white font-medium rounded-lg"
                    >
                      <Plus size={18} />
                      Add Service
                    </button>
                  </div>

                  {editingService && (
                    <div className="p-6 bg-[#0f3460] rounded-xl border border-gray-600">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white">
                          {content.services.find(s => s.id === editingService.id) ? 'Edit Service' : 'New Service'}
                        </h3>
                        <button onClick={() => setEditingService(null)} className="text-gray-400 hover:text-white">
                          <X size={20} />
                        </button>
                      </div>
                      <div className="space-y-4">
                        <input
                          type="text"
                          placeholder="Service Title"
                          value={editingService.title}
                          onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                          className="w-full px-4 py-3 bg-[#16213e] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#e94560]"
                        />
                        <textarea
                          placeholder="Service Description"
                          rows={3}
                          value={editingService.description}
                          onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                          className="w-full px-4 py-3 bg-[#16213e] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#e94560] resize-none"
                        />
                        <select
                          value={editingService.icon}
                          onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
                          className="w-full px-4 py-3 bg-[#16213e] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#e94560]"
                        >
                          <option value="Globe">Web Development</option>
                          <option value="Smartphone">Mobile Development</option>
                          <option value="Palette">UI/UX Design</option>
                          <option value="Cloud">Cloud Solutions</option>
                          <option value="ShoppingCart">E-Commerce</option>
                          <option value="MessageSquare">Consulting</option>
                        </select>
                        <button
                          onClick={() => handleSaveService(editingService)}
                          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#e94560] to-[#ff6b6b] text-white font-medium rounded-lg"
                        >
                          <Save size={18} />
                          Save Service
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    {content.services.map((service) => (
                      <div
                        key={service.id}
                        className="p-4 bg-[#0f3460] rounded-xl flex items-center justify-between"
                      >
                        <div>
                          <h3 className="text-white font-semibold">{service.title}</h3>
                          <p className="text-gray-400 text-sm">{service.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingService(service)}
                            className="p-2 text-gray-400 hover:text-white"
                          >
                            <Settings size={18} />
                          </button>
                          <button
                            onClick={() => {
                              deleteService(service.id);
                              showSaveMessage();
                            }}
                            className="p-2 text-gray-400 hover:text-red-400"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects Section */}
              {activeTab === 'projects' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Projects</h2>
                    <button
                      onClick={() => setEditingProject({
                        id: Date.now().toString(),
                        title: '',
                        description: '',
                        image: '',
                        technologies: [],
                        link: '',
                        category: 'Web Development'
                      })}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#e94560] to-[#ff6b6b] text-white font-medium rounded-lg"
                    >
                      <Plus size={18} />
                      Add Project
                    </button>
                  </div>

                  {/* Project Link Import */}
                  <ProjectLinkImport 
                    onProjectAdded={handleSaveProject}
                    existingProjects={content.projects}
                  />

                  {editingProject && (
                    <div className="p-6 bg-[#0f3460] rounded-xl border border-gray-600">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white">
                          {content.projects.find(p => p.id === editingProject.id) ? 'Edit Project' : 'New Project'}
                        </h3>
                        <button onClick={() => setEditingProject(null)} className="text-gray-400 hover:text-white">
                          <X size={20} />
                        </button>
                      </div>
                      <div className="space-y-4">
                        <input
                          type="text"
                          placeholder="Project Title"
                          value={editingProject.title}
                          onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                          className="w-full px-4 py-3 bg-[#16213e] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#e94560]"
                        />
                        <textarea
                          placeholder="Project Description"
                          rows={3}
                          value={editingProject.description}
                          onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                          className="w-full px-4 py-3 bg-[#16213e] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#e94560] resize-none"
                        />
                        
                        {/* Project Image Upload */}
                        <ImageUpload
                          currentImage={editingProject.image}
                          onImageChange={(img) => setEditingProject({ ...editingProject, image: img })}
                          label="Project Image"
                          aspectRatio="aspect-video"
                        />

                        <input
                          type="text"
                          placeholder="Technologies (comma separated)"
                          value={editingProject.technologies.join(', ')}
                          onChange={(e) => setEditingProject({ 
                            ...editingProject, 
                            technologies: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
                          })}
                          className="w-full px-4 py-3 bg-[#16213e] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#e94560]"
                        />
                        <input
                          type="text"
                          placeholder="Project Link (optional)"
                          value={editingProject.link || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, link: e.target.value })}
                          className="w-full px-4 py-3 bg-[#16213e] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#e94560]"
                        />
                        <select
                          value={editingProject.category}
                          onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                          className="w-full px-4 py-3 bg-[#16213e] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#e94560]"
                        >
                          <option value="Web Development">Web Development</option>
                          <option value="Mobile Development">Mobile Development</option>
                          <option value="UI/UX Design">UI/UX Design</option>
                          <option value="E-Commerce">E-Commerce</option>
                        </select>
                        <button
                          onClick={() => handleSaveProject(editingProject)}
                          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#e94560] to-[#ff6b6b] text-white font-medium rounded-lg"
                        >
                          <Save size={18} />
                          Save Project
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {content.projects.map((project) => (
                      <div
                        key={project.id}
                        className="p-4 bg-[#0f3460] rounded-xl"
                      >
                        <div className="flex gap-4">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="text-white font-semibold">{project.title}</h3>
                            <p className="text-[#e94560] text-sm">{project.category}</p>
                            <p className="text-gray-400 text-sm mt-1 line-clamp-2">{project.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-600">
                          <button
                            onClick={() => setEditingProject(project)}
                            className="flex-1 py-2 text-center text-gray-300 hover:text-white bg-[#16213e] rounded-lg"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              deleteProject(project.id);
                              showSaveMessage();
                            }}
                            className="flex-1 py-2 text-center text-gray-300 hover:text-red-400 bg-[#16213e] rounded-lg"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Team Section */}
              {activeTab === 'team' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white">Team Members</h2>
                  
                  {/* Add Project from Link Section */}
                  <div className="p-6 bg-gradient-to-br from-[#0f3460] to-[#16213e] rounded-xl border border-[#e94560]/30">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-2">
                        <Plus size={18} />
                        Add Project from Link
                      </h3>
                      <p className="text-gray-400 text-sm">Paste a website URL to automatically fetch project information</p>
                    </div>
                    <ProjectLinkImport 
                      onProjectAdded={(project) => {
                        addProject({
                          id: project.id || Date.now().toString(),
                          title: project.title,
                          description: project.description,
                          image: project.image_url,
                          technologies: project.technologies,
                          link: project.project_link,
                          category: project.category
                        });
                        showSaveMessage();
                      }}
                      existingProjects={content.projects}
                    />
                  </div>

                  {/* Team Members List */}
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-white mb-4">Team Members</h3>
                  </div>
                  
                  {content.team.map((member) => (
                    <div key={member.id} className="p-6 bg-[#0f3460] rounded-xl">
                      <div className="flex flex-col md:flex-row items-start gap-6">
                        <img
                          src={teamImages[member.id] || member.image}
                          alt={member.name}
                          className="w-24 h-24 object-cover rounded-xl"
                        />
                        <div className="flex-1 w-full">
                          <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                          <p className="text-[#e94560]">{member.role}</p>
                          
                          {editingTeamId === member.id ? (
                            <div className="mt-4 space-y-4">
                              <div>
                                <label className="block text-gray-400 text-sm mb-2">Bio</label>
                                <textarea
                                  rows={4}
                                  defaultValue={member.bio}
                                  id={`bio-${member.id}`}
                                  className="w-full px-4 py-3 bg-[#16213e] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#e94560] resize-none"
                                />
                              </div>
                              
                              {/* Team Member Image Upload */}
                              <ImageUpload
                                currentImage={teamImages[member.id] || member.image}
                                onImageChange={(img) => setTeamImages({ ...teamImages, [member.id]: img })}
                                label="Profile Image"
                                aspectRatio="aspect-square"
                              />

                              {/* Add Project from Link for Team Member */}
                              <div className="p-4 bg-[#0f3460] rounded-lg border border-[#e94560]/30">
                                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                                  <Plus size={16} />
                                  Add Project from Link
                                </h4>
                                <p className="text-gray-400 text-xs mb-3">Add a project to {member.name}'s portfolio by pasting a website URL</p>
                                <ProjectLinkImport 
                                  onProjectAdded={(project) => {
                                    const newProjectId = project.id || Date.now().toString();
                                    addProject({
                                      id: newProjectId,
                                      title: project.title,
                                      description: project.description,
                                      image: project.image_url,
                                      technologies: project.technologies,
                                      link: project.project_link,
                                      category: project.category
                                    });
                                    // Auto-assign to this team member
                                    const projectsInput = document.getElementById(`projects-${member.id}`) as HTMLInputElement;
                                    const currentProjects = projectsInput.value.split(',').map(p => p.trim()).filter(Boolean);
                                    projectsInput.value = [...currentProjects, newProjectId].join(', ');
                                    showSaveMessage();
                                  }}
                                  existingProjects={content.projects}
                                />
                              </div>

                              <div>
                                <label className="block text-gray-400 text-sm mb-2">Assigned Project IDs (comma separated)</label>
                                <input
                                  type="text"
                                  defaultValue={member.projects.join(', ')}
                                  id={`projects-${member.id}`}
                                  placeholder="Project IDs (comma separated)"
                                  className="w-full px-4 py-3 bg-[#16213e] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#e94560]"
                                />
                              </div>
                              
                              <div className="flex gap-2">
                                <button
                                  onClick={() => {
                                    const bioEl = document.getElementById(`bio-${member.id}`) as HTMLTextAreaElement;
                                    const projectsEl = document.getElementById(`projects-${member.id}`) as HTMLInputElement;
                                    updateTeamMember({
                                      ...member,
                                      bio: bioEl.value,
                                      image: teamImages[member.id] || member.image,
                                      projects: projectsEl.value.split(',').map(p => p.trim()).filter(Boolean)
                                    });
                                    setEditingTeamId(null);
                                    showSaveMessage();
                                  }}
                                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#e94560] to-[#ff6b6b] text-white font-medium rounded-lg"
                                >
                                  <Save size={16} />
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditingTeamId(null)}
                                  className="px-4 py-2 text-gray-300 bg-[#16213e] rounded-lg"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="mt-4">
                              <p className="text-gray-400 text-sm">{member.bio}</p>
                              <button
                                onClick={() => setEditingTeamId(member.id)}
                                className="mt-4 px-4 py-2 text-gray-300 bg-[#16213e] rounded-lg hover:bg-gray-700"
                              >
                                Edit Member
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Contact Section */}
              {activeTab === 'contact' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white">Contact Information</h2>
                  <div>
                    <label className="block text-white font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0f3460] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#e94560]"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Phone</label>
                    <input
                      type="text"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0f3460] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#e94560]"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Address</label>
                    <input
                      type="text"
                      value={contactForm.address}
                      onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0f3460] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#e94560]"
                    />
                  </div>
                  <button
                    onClick={handleSaveContact}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#e94560] to-[#ff6b6b] text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#e94560]/30 transition-all"
                  >
                    <Save size={18} />
                    Save Changes
                  </button>
                </div>
              )}

              {/* Footer Section */}
              {activeTab === 'footer' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white">Footer Settings</h2>
                  <div>
                    <label className="block text-white font-medium mb-2">Copyright Text</label>
                    <input
                      type="text"
                      value={footerForm.copyright}
                      onChange={(e) => setFooterForm({ ...footerForm, copyright: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0f3460] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#e94560]"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Tagline</label>
                    <input
                      type="text"
                      value={footerForm.tagline}
                      onChange={(e) => setFooterForm({ ...footerForm, tagline: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0f3460] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#e94560]"
                    />
                  </div>
                  <button
                    onClick={handleSaveFooter}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#e94560] to-[#ff6b6b] text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#e94560]/30 transition-all"
                  >
                    <Save size={18} />
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

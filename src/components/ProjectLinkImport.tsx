import { useState } from 'react';
import { Link, Loader, AlertCircle, CheckCircle } from 'lucide-react';
import { Project } from '../types';
import { scrapeWebsiteMetadata } from '../utils/scrapeMetadata';

interface ProjectLinkImportProps {
  onProjectAdded: (project: Project) => void;
  existingProjects: Project[];
}

export function ProjectLinkImport({ onProjectAdded, existingProjects }: ProjectLinkImportProps) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [previewProject, setPreviewProject] = useState<Partial<Project> | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({});

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    setError('');
    setSuccess('');
  };

  const handleFetchMetadata = async () => {
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const metadata = await scrapeWebsiteMetadata(url);
      
      const newProject: Partial<Project> = {
        id: Date.now().toString(),
        title: metadata.title,
        description: metadata.description,
        image: metadata.image,
        technologies: metadata.technologies,
        link: metadata.link,
        category: 'Web Development', // Default category
      };

      setPreviewProject(newProject);
      setFormData(newProject);
      setSuccess('Website information fetched successfully! Review and adjust below.');
    } catch (err) {
      setError(`Error fetching website information: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setPreviewProject(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProject = () => {
    if (!formData.title || !formData.description) {
      setError('Title and description are required');
      return;
    }

    const newProject: Project = {
      id: formData.id || Date.now().toString(),
      title: formData.title,
      description: formData.description,
      image: formData.image || 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600',
      technologies: formData.technologies || [],
      link: formData.link || '',
      category: formData.category || 'Web Development',
    };

    onProjectAdded(newProject);
    setUrl('');
    setFormData({});
    setPreviewProject(null);
    setSuccess('Project added successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <div className="p-6 bg-[#0f3460] rounded-xl border border-gray-600">
      <div className="flex items-center gap-2 mb-4">
        <Link size={20} className="text-[#e94560]" />
        <h3 className="text-lg font-semibold text-white">Add Project from Link</h3>
      </div>

      <p className="text-gray-400 text-sm mb-4">
        Paste a website URL below to automatically fetch project information, images, and metadata.
      </p>

      {/* URL Input */}
      <div className="mb-4">
        <label className="block text-white font-medium mb-2">Website URL</label>
        <div className="flex gap-2">
          <input
            type="url"
            value={url}
            onChange={handleUrlChange}
            placeholder="https://example.com"
            className="flex-1 px-4 py-3 bg-[#16213e] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#e94560]"
            disabled={loading}
          />
          <button
            onClick={handleFetchMetadata}
            disabled={loading || !url.trim()}
            className="px-6 py-3 bg-gradient-to-r from-[#e94560] to-[#ff6b6b] text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#e94560]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader size={18} className="animate-spin" />
                Fetching...
              </>
            ) : (
              'Fetch Info'
            )}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg flex items-gap gap-2 text-red-400 text-sm">
          <AlertCircle size={18} className="flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg flex items-center gap-2 text-green-400 text-sm">
          <CheckCircle size={18} className="flex-shrink-0" />
          {success}
        </div>
      )}

      {/* Preview and Edit Form */}
      {previewProject && (
        <div className="mt-6 p-4 bg-[#16213e] rounded-lg border border-gray-600">
          <h4 className="text-white font-semibold mb-4">Review & Edit Project Details</h4>

          {/* Image Preview */}
          {formData.image && (
            <div className="mb-4">
              <div className="w-full aspect-video rounded-lg overflow-hidden bg-[#0f3460] border border-gray-600">
                <img 
                  src={formData.image} 
                  alt="Project" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <label className="block text-white font-medium mt-2 mb-1 text-sm">Image URL</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-3 py-2 bg-[#0f3460] border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-[#e94560]"
              />
            </div>
          )}

          {/* Title */}
          <div className="mb-4">
            <label className="block text-white font-medium mb-1 text-sm">Title</label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 bg-[#0f3460] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#e94560]"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-white font-medium mb-1 text-sm">Description</label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 bg-[#0f3460] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#e94560] resize-none text-sm"
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-white font-medium mb-1 text-sm">Category</label>
            <input
              type="text"
              value={formData.category || ''}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              placeholder="e.g., Web Development, Mobile Development"
              className="w-full px-3 py-2 bg-[#0f3460] border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-[#e94560]"
            />
          </div>

          {/* Technologies */}
          <div className="mb-4">
            <label className="block text-white font-medium mb-1 text-sm">Technologies (comma-separated)</label>
            <input
              type="text"
              value={formData.technologies?.join(', ') || ''}
              onChange={(e) => setFormData({ 
                ...formData, 
                technologies: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
              })}
              className="w-full px-3 py-2 bg-[#0f3460] border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-[#e94560]"
            />
          </div>

          {/* Project Link */}
          <div className="mb-4">
            <label className="block text-white font-medium mb-1 text-sm">Project Link (URL to visit the project)</label>
            <input
              type="url"
              value={formData.link || ''}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              placeholder="https://example.com/project"
              className="w-full px-3 py-2 bg-[#0f3460] border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-[#e94560]"
            />
            <p className="text-gray-500 text-xs mt-1">This is the URL users will visit when they click on the project</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-6">
            <button
              onClick={handleAddProject}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-[#e94560] to-[#ff6b6b] text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#e94560]/30 transition-all"
            >
              Add Project
            </button>
            <button
              onClick={() => {
                setPreviewProject(null);
                setFormData({});
                setUrl('');
              }}
              className="flex-1 px-4 py-3 bg-gray-700 text-gray-300 font-medium rounded-lg hover:bg-gray-600 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

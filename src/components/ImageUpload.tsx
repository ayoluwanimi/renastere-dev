import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  currentImage: string;
  onImageChange: (imageData: string) => void;
  label: string;
  aspectRatio?: string;
}

export function ImageUpload({ currentImage, onImageChange, label, aspectRatio = 'aspect-video' }: ImageUploadProps) {
  const [preview, setPreview] = useState<string>(currentImage);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreview(base64String);
        onImageChange(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleUrlChange = (url: string) => {
    setPreview(url);
    onImageChange(url);
  };

  const clearImage = () => {
    setPreview('');
    onImageChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-white font-medium">{label}</label>
      
      {/* Current Preview */}
      {preview && (
        <div className="relative group">
          <div className={`${aspectRatio} rounded-xl overflow-hidden bg-[#0f3460] border border-gray-600`}>
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={() => setPreview('')}
            />
          </div>
          <button
            onClick={clearImage}
            className="absolute top-2 right-2 p-2 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
          isDragging
            ? 'border-[#e94560] bg-[#e94560]/10'
            : 'border-gray-600 hover:border-[#e94560]/50 hover:bg-[#16213e]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          className="hidden"
        />
        <div className="flex flex-col items-center gap-2">
          {preview ? (
            <Upload size={24} className="text-[#e94560]" />
          ) : (
            <ImageIcon size={24} className="text-gray-400" />
          )}
          <p className="text-gray-400 text-sm">
            {preview ? 'Click or drag to replace image' : 'Click or drag to upload image'}
          </p>
          <p className="text-gray-500 text-xs">PNG, JPG, GIF up to 5MB</p>
        </div>
      </div>

      {/* URL Input Alternative */}
      <div className="flex items-center gap-2">
        <span className="text-gray-500 text-sm">or</span>
        <input
          type="text"
          placeholder="Enter image URL"
          value={preview.startsWith('data:') ? '' : preview}
          onChange={(e) => handleUrlChange(e.target.value)}
          className="flex-1 px-4 py-2 bg-[#0f3460] border border-gray-600 rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:border-[#e94560]"
        />
      </div>
    </div>
  );
}

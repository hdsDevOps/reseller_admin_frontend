import React, { useState } from 'react';

interface SEOData {
    contentTitle: string;
    contentDescription: string;
    altImageText: string;
    image: string;
    keywords: string;
    urlLink: string;
  }

const SEO = () => {
    const [seoData, setSeoData] = useState<SEOData>({
      contentTitle: 'Landing Page',
      contentDescription: '',
      altImageText: '',
      image: '/flower-image.jpg',
      keywords: '',
      urlLink: ''
    });
  
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="flex items-center justify-start p-4 border-b">
          <button className="px-4 py-1 text-white bg-green-500 rounded hover:bg-green-600">
            Edit
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="block text-gray-600">Content Title</label>
            <input 
              className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-gray-200"
              value={seoData.contentTitle}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-gray-600">Content Description</label>
            <input 
              className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-gray-200"
              placeholder="Enter the description meta tags with comma separator"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-gray-600">Alt Image Text</label>
            <input 
              className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-gray-200"
              placeholder="Enter the keywords here with comma separator"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-gray-600">Image</label>
            <img src="/api/placeholder/100/100" alt="Preview" className="w-24 h-24 border rounded object-cover" />
          </div>
          <div className="space-y-2">
            <label className="block text-gray-600">Keywords</label>
            <input 
              className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-gray-200"
              placeholder="Enter the keywords here with comma separator"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-gray-600">URL Link</label>
            <input 
              className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-gray-200"
              placeholder="Enter the URL Link"
            />
          </div>
        </div>
      </div>
    );
  };

export default SEO;
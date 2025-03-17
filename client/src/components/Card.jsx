import React from 'react';
import { download } from '../assets';
import { downloadImage } from '../utils';

const Card = ({ _id, name, prompt, photo }) => (
  <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-out">
    <img 
      className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105" 
      src={photo} 
      alt={prompt} 
    />
    
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex flex-col justify-end">
      <div className="glass-morphism backdrop-blur-sm rounded-xl p-4 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
        <p className="text-gray-100 text-sm mb-4 relative max-h-24 overflow-y-auto">
          {prompt}
          <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />
        </p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-400 to-purple-600 w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {name[0].toUpperCase()}
            </div>
            <div>
              <p className="text-white font-medium">{name}</p>
              <p className="text-gray-300 text-xs">Creator</p>
            </div>
          </div>
          
          <button 
            onClick={() => downloadImage(_id, photo)}
            className="glass-morphism hover:bg-white/20 p-2 rounded-lg transition-colors relative group/download"
            aria-label="Download image"
          >
            <img src={download} alt="download" className="w-5 h-5 invert" />
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/75 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover/download:opacity-100 transition-opacity">
              Download
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Card;
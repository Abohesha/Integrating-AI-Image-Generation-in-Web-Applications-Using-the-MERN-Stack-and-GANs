import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', prompt: '', photo: '' });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSurpriseMe = () => setForm({ ...form, prompt: getRandomPrompt(form.prompt) });

  const generateImage = async () => {
    if (!form.prompt) return alert('Please provide a prompt');
    
    try {
      setGeneratingImg(true);
      const response = await fetch('http://localhost:8080/api/v1/dalle/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: form.prompt }),
      });

      const data = await response.json();
      setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
    } catch (err) {
      alert('Error generating image');
    } finally {
      setGeneratingImg(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.prompt || !form.photo) return alert('Please generate an image first');

    setLoading(true);
    try {
      await fetch('http://localhost:8080/api/v1/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      alert('Success');
      navigate('/');
    } catch (err) {
      alert('Error submitting post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="font-extrabold text-gradient text-4xl md:text-5xl mb-3">
          Create AI Art
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Transform your ideas into stunning AI-generated artwork and share it with our creative community
        </p>
      </div>

      <form className="max-w-3xl mx-auto" onSubmit={handleSubmit}>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <FormField
              labelName="Creator Name"
              type="text"
              name="name"
              placeholder="Enter your name or alias"
              value={form.name}
              handleChange={handleChange}
              customStyles="rounded-xl"
            />
            
            <div className="relative">
              <FormField
                labelName="AI Prompt"
                type="text"
                name="prompt"
                placeholder="Describe your vision..."
                value={form.prompt}
                handleChange={handleChange}
                isSurpriseMe
                handleSurpriseMe={handleSurpriseMe}
                customStyles="pr-24 rounded-xl"
              />
              <button
                type="button"
                onClick={handleSurpriseMe}
                className="absolute right-2 top-9 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-1.5 rounded-lg text-sm hover:scale-105 transition-transform"
              >
                🪄 Surprise Me
              </button>
            </div>
          </div>

          <div className="glass-morphism p-6 rounded-2xl shadow-lg">
            <div className="aspect-square relative group">
              <div className={`w-full h-full rounded-xl border-2 border-dashed ${form.photo ? 'border-transparent' : 'border-gray-200'} transition-all`}>
                {form.photo ? (
                  <img 
                    src={form.photo} 
                    alt={form.prompt} 
                    className="w-full h-full object-cover rounded-xl animate-fadeIn" 
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <img 
                      src={preview} 
                      alt="preview" 
                      className="w-16 opacity-40 mb-4" 
                    />
                    <span className="text-gray-400 text-sm">Preview will appear here</span>
                  </div>
                )}
                
                {generatingImg && (
                  <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
                    <Loader />
                    <p className="mt-16 text-white/80 text-sm">Painting your vision...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            type="button"
            onClick={generateImage}
            disabled={generatingImg}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-medium hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
          >
            {generatingImg ? (
              <span className="flex items-center gap-2">
                <Loader /> Generating...
              </span>
            ) : 'Generate Art'}
          </button>

          {form.photo && (
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-xl font-medium hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader /> Sharing...
                </span>
              ) : 'Publish to Gallery'}
            </button>
          )}
        </div>

        {form.photo && (
          <p className="mt-6 text-center text-gray-500 text-sm">
            ✨ Ready to share your masterpiece with the community?
          </p>
        )}
      </form>
    </section>
  );
};

export default CreatePost;

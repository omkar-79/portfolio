'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface BlogPost {
  title: string;
  description: string;
  thumbnail: string;
  link: string;
  pubDate: string;
  subtitle?: string;     // Add this
  publishDate?: string;  // Add this
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to extract image URL from description
  const extractImageUrl = (description: string) => {
    const imgRegex = /<img[^>]+src="([^">]+)"/;
    const match = description.match(imgRegex);
    return match ? match[1] : '/blog-placeholder.jpg';
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Replace with your Medium username
        const username = 'omkarbalekundri77';
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${username}`);
        const data = await response.json();
        
        const formattedPosts = data.items.map((item: any) => ({
          title: item.title,
          description: item.description,
          subtitle: item.description.replace(/<[^>]*>/g, '').slice(0, 100) + '...',
          thumbnail: extractImageUrl(item.description),
          link: item.link,
          pubDate: item.pubDate,
          publishDate: new Date(item.pubDate).toLocaleDateString()
        }));

        setPosts(formattedPosts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="py-16 w-full max-w-6xl mx-auto px-4">
      <motion.h2 
        className="text-3xl font-bold text-center mb-12 text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Blog Posts
      </motion.h2>

      {isLoading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#49c5b6]"></div>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {posts.map((post, index) => (
            <motion.a
              key={post.link}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#2A2F32] rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="relative h-48">
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-[#49c5b6]">
                  {post.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  {post.subtitle}
                </p>
                <p className="text-gray-400 text-xs">
                  Published on {post.publishDate}
                </p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      )}
    </section>
  );
}
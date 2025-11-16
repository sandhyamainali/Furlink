'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PostsPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>All Posts</h1>
        <Link href="/posts/new" style={{
          padding: '10px 15px',
          color: 'white',
          backgroundColor: '#0070f3',
          textDecoration: 'none',
          borderRadius: '5px'
        }}>
          Create New Post
        </Link>
      </div>
      {posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post.id} style={{ marginBottom: '10px', listStyle: 'none' }}>
              <Link href={`/posts/${post.id}`} style={{ textDecoration: 'none', color: '#0070f3', fontSize: '18px' }}>
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PostPage() {
  const [post, setPost] = useState(null);
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    if (id) {
      fetch(`/api/posts/${id}`)
        .then((res) => res.json())
        .then((data) => setPost(data));
    }
  }, [id]);

  if (!post) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <Link href="/posts" style={{ textDecoration: 'none', color: '#0070f3', marginBottom: '20px', display: 'inline-block' }}>
        &larr; Back to Posts
      </Link>
      <h1 style={{ marginBottom: '20px' }}>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // এটি বিল্ড করার পর ./out ফোল্ডারে static index.html তৈরি করবে
  images: {
    unoptimized: true, // Next.js Static Export-এ Image Optimization বন্ধ রাখতে হয়
  },
};

export default nextConfig;

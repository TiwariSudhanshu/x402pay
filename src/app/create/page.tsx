"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { toast } from "sonner";

export default function CreateArticlePage() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    priceEth: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.url) {
        setImageUrl(data.url);
        toast.success('Image uploaded successfully!');
      } else {
        toast.error(data.error || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConnected || !address) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!imageUrl) {
      toast.error("Please upload an image");
      return;
    }

    if (!formData.title || !formData.description || !formData.content || !formData.priceEth) {
      toast.error("Please fill in all fields");
      return;
    }

    const priceEth = parseFloat(formData.priceEth);
    if (isNaN(priceEth) || priceEth <= 0) {
      toast.error("Please enter a valid price");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/articles/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          content: formData.content,
          image: imageUrl,
          priceEth: priceEth,
          creatorAddress: address,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Article created successfully!");
        router.push("/");
      } else {
        toast.error(data.error || "Failed to create article");
      }
    } catch (error) {
      console.error("Error creating article:", error);
      toast.error("An error occurred while creating the article");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="mb-6 text-6xl">🔒</div>
          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            Connect Your Wallet
          </h1>
          <p className="mb-8 text-gray-600">
            You need to connect your wallet to create an article.
          </p>
          <button
            onClick={() => router.push("/")}
            className="rounded-md bg-amber-500 px-6 py-3 text-white font-semibold hover:bg-amber-600"
          >
            Go to Home Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-8">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </button>
          <h1 className="text-4xl font-bold text-zinc-900">Create New Article</h1>
          <p className="mt-2 text-base text-zinc-600">
            Share your knowledge and get paid for your content
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border-2 border-black p-8 shadow-sm">
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-900 mb-2">
                Article Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-gray-900 focus:border-amber-500 focus:outline-none"
                placeholder="Enter a compelling title"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-900 mb-2">
                Short Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={2}
                className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-gray-900 focus:border-amber-500 focus:outline-none resize-none"
                placeholder="Brief overview of your article"
              />
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-semibold text-gray-900 mb-2">
                Article Content *
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows={12}
                className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-gray-900 focus:border-amber-500 focus:outline-none resize-none font-mono text-sm"
                placeholder="Write your article content here..."
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Featured Image *
              </label>
              <div className="flex flex-col gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className={`w-full rounded-lg border-2 border-dashed border-gray-300 px-4 py-8 text-gray-600 hover:border-amber-500 hover:text-amber-500 transition-colors cursor-pointer ${
                    isUploading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isUploading ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-amber-500"></div>
                      <span className="text-sm font-medium">Uploading...</span>
                    </div>
                  ) : imageUrl ? (
                    <div className="flex flex-col items-center gap-2">
                      <img src={imageUrl} alt="Preview" className="h-32 w-auto rounded-lg" />
                      <span className="text-sm font-medium">Click to change image</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm font-medium">Click to upload image</span>
                      <span className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</span>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Price */}
            <div>
              <label htmlFor="priceEth" className="block text-sm font-semibold text-gray-900 mb-2">
                Price (ETH) *
              </label>
              <input
                type="number"
                id="priceEth"
                name="priceEth"
                value={formData.priceEth}
                onChange={handleChange}
                required
                step="0.0001"
                min="0"
                className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-gray-900 focus:border-amber-500 focus:outline-none"
                placeholder="0.001"
              />
              <p className="mt-1 text-sm text-gray-500">
                Set the price readers will pay to access this article
              </p>
            </div>

            {/* Creator Address Display */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Creator Address
              </label>
              <div className="rounded-lg border-2 border-gray-200 bg-gray-50 px-4 py-3 text-gray-600 font-mono text-sm">
                {address}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full rounded-lg px-6 py-3 text-white font-semibold transition-colors ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-amber-500 hover:bg-amber-600"
                }`}
              >
                {isSubmitting ? "Creating Article..." : "Create Article"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

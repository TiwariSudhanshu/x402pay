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
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-zinc-100 flex items-center justify-center">
            <svg className="w-10 h-10 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-zinc-900 mb-4">
            Connect Your Wallet
          </h1>
          <p className="text-zinc-600 mb-8">
            You need to connect your wallet to create and publish articles
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 rounded-lg text-sm font-semibold text-white bg-zinc-900 hover:bg-zinc-800 transition-all shadow-lg"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 py-8 sm:py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-8">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 mb-6 group"
          >
            <svg className="h-5 w-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
          <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-2">Create Article</h1>
          <p className="text-zinc-600">
            Share your knowledge and start earning
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-zinc-200 p-6 sm:p-8 shadow-sm">
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-zinc-900 mb-2">
                Article Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-zinc-200 px-4 py-3 text-zinc-900 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 focus:outline-none transition-all"
                placeholder="Enter a compelling title"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-zinc-900 mb-2">
                Short Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={2}
                className="w-full rounded-lg border border-zinc-200 px-4 py-3 text-zinc-900 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 focus:outline-none resize-none transition-all"
                placeholder="Brief overview of your article"
              />
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-semibold text-zinc-900 mb-2">
                Article Content *
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows={8}
                className="w-full rounded-lg border border-zinc-200 px-4 py-3 text-zinc-900 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 focus:outline-none resize-none font-mono text-sm transition-all"
                placeholder="Write your article content here..."
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-zinc-900 mb-2">
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
                  className={`w-full rounded-lg border-2 border-dashed border-zinc-200 px-4 py-8 text-zinc-600 hover:border-zinc-900 hover:bg-zinc-50 transition-colors cursor-pointer ${
                    isUploading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isUploading ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-200 border-t-zinc-900"></div>
                      <span className="text-sm font-medium">Uploading...</span>
                    </div>
                    ) : imageUrl ? (
                    <div className="flex flex-col items-center gap-2">
                      <img src={imageUrl} alt="Preview" className="h-28 sm:h-32 w-auto rounded-lg shadow-sm" />
                      <span className="text-sm font-medium">Click to change image</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm font-medium">Click to upload image</span>
                      <span className="text-xs text-zinc-500">PNG, JPG, GIF up to 5MB</span>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Price */}
            <div>
              <label htmlFor="priceEth" className="block text-sm font-semibold text-zinc-900 mb-2">
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
                className="w-full rounded-lg border border-zinc-200 px-4 py-3 text-zinc-900 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 focus:outline-none transition-all"
                placeholder="0.001"
              />
              <p className="mt-2 text-sm text-zinc-500">
                Set the price readers will pay to access this article
              </p>
            </div>

            {/* Creator Address Display */}
            <div>
              <label className="block text-sm font-semibold text-zinc-900 mb-2">
                Creator Address
              </label>
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-600 font-mono text-sm">
                {address}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full rounded-lg px-6 py-3.5 font-semibold transition-all shadow-md ${
                  isSubmitting
                    ? "bg-zinc-200 text-zinc-500 cursor-not-allowed"
                    : "bg-zinc-900 text-white hover:bg-zinc-800 hover:shadow-lg"
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

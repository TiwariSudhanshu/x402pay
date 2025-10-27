# x402pay - Setup Guide

## New Features Implemented

1. ✅ **Create Article Page** - Users can create articles with title, description, content, price, and image
2. ✅ **MongoDB Integration** - Articles are stored in MongoDB with creator's wallet address and price
3. ✅ **Cloudinary Integration** - Images are uploaded and stored in Cloudinary
4. ✅ **Dynamic Article Fetching** - All articles are fetched from MongoDB on the main page
5. ✅ **API Content Delivery** - Article content is delivered via API after payment verification
6. ✅ **x402 Payment Logic** - Payment verification using x402 protocol (unchanged)

## Prerequisites

1. Node.js (v18 or higher)
2. MongoDB (local or cloud instance)
3. Cloudinary account

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# MongoDB Connection String
MONGODB_URI=mongodb://localhost:27017/x402pay
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/x402pay

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

### 3. Set Up Cloudinary

1. Go to [Cloudinary](https://cloudinary.com/) and create a free account
2. In your Cloudinary dashboard:
   - Go to **Settings** → **Upload**
   - Scroll to **Upload presets**
   - Click **Add upload preset**
   - Set **Preset name** to `x402pay`
   - Set **Signing Mode** to **Unsigned**
   - Save the preset
3. Copy your **Cloud Name** from the dashboard
4. Add it to your `.env.local` file

### 4. Set Up MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB locally
# Start MongoDB service
mongod

# MongoDB will run on mongodb://localhost:27017
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Add it to `.env.local`

### 5. Run the Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## Features Guide

### Creating an Article

1. Connect your wallet
2. Click **"Create Article"** button in the header or on the main page
3. Fill in the form:
   - **Title**: Article title
   - **Description**: Short description (preview)
   - **Content**: Full article content
   - **Image**: Upload featured image via Cloudinary
   - **Price**: Set price in ETH
4. Click **"Create Article"**
5. Article will be saved to MongoDB with your wallet address

### Purchasing an Article

1. Connect your wallet to Base Sepolia network
2. Click **"Buy Now"** on any article card
3. The x402 payment flow will be triggered:
   - If not paid: 402 Payment Required response
   - Transaction sent to blockchain
   - Payment verified with X-PAYMENT header
   - Access granted via cookie
4. You'll be redirected to the article content

### Reading an Article

- After successful purchase, the article content is fetched from MongoDB
- Access is verified via HTTP-only cookie
- Content is displayed in a clean, readable format

## API Endpoints

### Articles

- `GET /api/articles` - Fetch all articles (without content)
- `POST /api/articles/create` - Create a new article
- `POST /api/articles/[id]/purchase` - Purchase an article (x402 protected)
- `GET /api/articles/[id]/content` - Get article content (requires payment)

### Legacy (Backward Compatible)

- `POST /api/blog1` - Old blog 1 payment endpoint
- `POST /api/blog2` - Old blog 2 payment endpoint
- `POST /api/blog3` - Old blog 3 payment endpoint
- `POST /api/verify-access` - Old access verification

## Database Schema

```typescript
{
  title: String,
  description: String,
  content: String,
  image: String,
  priceEth: Number,
  creatorAddress: String,
  createdAt: Date,
  updatedAt: Date
}
```

## x402 Payment Flow

The payment logic remains **unchanged** and follows the x402 protocol:

1. Client requests protected resource
2. Server responds with 402 Payment Required
3. Client sends ETH transaction
4. Client retries request with X-PAYMENT header
5. Server verifies payment and grants access
6. Cookie set for future access

## Tech Stack

- **Frontend**: Next.js 14, React 19, TailwindCSS
- **Blockchain**: Wagmi, Viem, Base Sepolia
- **Database**: MongoDB with Mongoose
- **File Storage**: Cloudinary
- **Payment Protocol**: x402-next

## Notes

- The old blog posts (IDs 1, 2, 3) still work for backward compatibility
- New database articles use dynamic MongoDB IDs
- All payments use Base Sepolia testnet
- Images are stored in Cloudinary for reliability
- Creator wallet addresses are stored with each article

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string in `.env.local`
- Whitelist your IP in MongoDB Atlas

### Cloudinary Upload Issues
- Verify cloud name in `.env.local`
- Ensure upload preset is set to "unsigned"
- Check preset name is exactly `x402pay`

### Payment Issues
- Ensure you're on Base Sepolia network
- Have test ETH in your wallet
- Check browser console for errors

## Support

For issues or questions, check the console logs or open an issue in the repository.

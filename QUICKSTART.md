# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set Up Cloudinary (2 minutes)

1. Go to https://cloudinary.com/ and sign up (free)
2. After login, go to **Settings** → **Upload** → **Upload presets**
3. Click **"Add upload preset"**
4. Configure:
   - **Preset name**: `x402pay`
   - **Signing Mode**: `Unsigned`
   - Click **Save**
5. Copy your **Cloud Name** from the dashboard

### Step 3: Create Environment File

Create `.env.local` in the root directory:

```env
# For local MongoDB (easiest)
MONGODB_URI=mongodb://localhost:27017/x402pay

# Add your Cloudinary cloud name
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=paste_your_cloud_name_here
```

### Step 4: Start MongoDB

**Option A - Local MongoDB** (recommended for testing)
```bash
# Install MongoDB: https://www.mongodb.com/try/download/community
# Then start it:
mongod
```

**Option B - MongoDB Atlas** (cloud, free tier)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env.local`

### Step 5: Run the App
```bash
npm run dev
```

Visit: http://localhost:3000

## 🎯 Test the Features

1. **Connect Wallet** (top right) - Use MetaMask on Base Sepolia
2. **Create Article** - Click "Create Article" button
   - Fill in title, description, content
   - Upload an image
   - Set price (e.g., 0.001 ETH)
   - Submit
3. **View Article** - See it on homepage
4. **Purchase** - Click "Buy Now" to test x402 payment flow
5. **Read** - Access content after payment

## 🔧 Troubleshooting

**Cloudinary upload not working?**
- Verify preset name is exactly `x402pay`
- Check it's set to "Unsigned"
- Confirm cloud name in `.env.local`

**MongoDB connection failed?**
- Ensure MongoDB is running: `mongod`
- Check the connection string
- For Atlas: whitelist your IP

**Payment not working?**
- Switch to Base Sepolia network in MetaMask
- Get test ETH from a faucet
- Check browser console for errors

## 📚 More Info

- Full setup guide: `SETUP_GUIDE.md`
- Implementation details: `IMPLEMENTATION_SUMMARY.md`

Enjoy building with x402pay! 🎉

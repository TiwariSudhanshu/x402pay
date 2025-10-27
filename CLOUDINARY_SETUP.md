# Cloudinary Upload Preset Setup Guide

## Problem
Getting an error when trying to upload images? You need to create an **unsigned upload preset** in Cloudinary.

## Solution (Takes 2 minutes)

### Step 1: Access Cloudinary Dashboard
1. Go to: https://console.cloudinary.com/
2. Log in with your account

### Step 2: Open Settings
1. Click the **⚙️ Settings** icon in the top right corner
2. OR go directly to: https://console.cloudinary.com/settings

### Step 3: Navigate to Upload Tab
1. Click on the **"Upload"** tab in the settings menu
2. Scroll down to the **"Upload presets"** section

### Step 4: Create Upload Preset
1. Click the **"Add upload preset"** button
2. Fill in the form:
   ```
   Upload preset name: x402pay
   Signing Mode: Unsigned ← IMPORTANT!
   Folder: (optional - can leave empty or use "articles")
   ```
3. Click **"Save"**

### Step 5: Verify
- You should now see `x402pay` in your upload presets list
- Make sure it shows **"Unsigned"** mode
- The preset should be **"Enabled"**

### Step 6: Test
1. Go back to your application: http://localhost:3000/create
2. Click "Create Article"
3. Try uploading an image - it should work now! ✅

## Visual Guide

```
Cloudinary Console
└── Settings ⚙️
    └── Upload Tab
        └── Upload Presets
            └── Add upload preset
                ├── Name: x402pay
                ├── Signing Mode: Unsigned ✓
                └── [Save]
```

## Common Issues

### Error: "Upload preset not found"
- **Cause**: Preset doesn't exist or has wrong name
- **Fix**: Make sure preset name is exactly `x402pay` (lowercase)

### Error: "Upload preset must be unsigned"
- **Cause**: Signing mode is set to "Signed"
- **Fix**: Change to "Unsigned" in preset settings

### Error: "Invalid cloud name"
- **Cause**: Wrong cloud name in .env.local
- **Fix**: Your cloud name is `dr51pu9n9` - verify it matches in `.env.local`

## Alternative: Using a Different Preset Name

If you prefer a different name, update the code:

1. Create your preset with any name (must be unsigned)
2. Update `src/app/create/page.tsx`:
   ```tsx
   <CldUploadWidget
     uploadPreset="your-preset-name-here"  // Change this line
     onSuccess={handleImageUpload}
   ```

## Need Help?

If you're still having issues:
1. Check browser console (F12) for error messages
2. Verify your cloud name: `dr51pu9n9`
3. Make sure the preset is set to "Unsigned"
4. Try refreshing the page after creating the preset

## Screenshot Reference

Your upload preset should look like this:

```
┌─────────────────────────────────────┐
│ Upload preset name: x402pay         │
│ Signing Mode: ⚪ Signed             │
│               ⚫ Unsigned ← Select  │
│ Folder: articles (optional)         │
│                                      │
│ [Save]                               │
└─────────────────────────────────────┘
```

Done! Your image uploads should now work perfectly. 🎉

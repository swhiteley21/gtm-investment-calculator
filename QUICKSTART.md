# Quick Start Guide - Deploy to Vercel in 5 Minutes

## Option 1: Automated Setup (Easiest)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Test Locally
```bash
npm run dev
```
Visit http://localhost:3000 to see your calculator

### Step 3: Run Setup Script
```bash
./setup.sh
```

### Step 4: Create GitHub Repository
1. Go to https://github.com/new
2. Name: `design-investment-calculator`
3. Don't initialize with anything
4. Click "Create repository"

### Step 5: Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/design-investment-calculator.git
git branch -M main
git push -u origin main
```

### Step 6: Deploy to Vercel
1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your `design-investment-calculator` repo
4. Click "Deploy"
5. Wait 2-3 minutes
6. Done! Your app is live 🎉

---

## Option 2: Manual Setup

### 1. Install and Test
```bash
npm install
npm run dev
```

### 2. Initialize Git
```bash
git init
git add .
git commit -m "Initial commit"
```

### 3. Create GitHub Repo
- Visit: https://github.com/new
- Create repository
- Follow GitHub's instructions to push

### 4. Connect to Vercel
- Visit: https://vercel.com
- Sign in with GitHub
- Click "New Project"
- Import your repository
- Click "Deploy"

---

## Troubleshooting

### Build Fails
- Check Node version: `node -v` (needs 18+)
- Clear cache: `rm -rf .next node_modules`
- Reinstall: `npm install`
- Try again: `npm run build`

### Can't Push to GitHub
- Check remote: `git remote -v`
- Re-add remote: `git remote add origin YOUR_REPO_URL`
- Force push: `git push -u origin main --force`

### Vercel Won't Deploy
- Check build logs in Vercel dashboard
- Ensure package.json has all dependencies
- Try manual deploy: `vercel --prod` (requires Vercel CLI)

---

## URLs After Deployment

- **Live Site**: `https://your-project.vercel.app`
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Edit Project**: https://vercel.com/your-username/your-project

---

## Customization

### Change Site Title
Edit `app/layout.tsx`:
```typescript
title: 'Your Custom Title'
```

### Change Colors
Edit color values in `app/page.tsx`:
- `#1F1E24` - Main dark color
- Modify Tailwind classes for other colors

### Add Custom Domain
1. Go to Vercel Dashboard → Your Project
2. Click "Settings" → "Domains"
3. Add your domain
4. Follow DNS instructions

---

## Support

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Full Guide: See `vercel-deployment-guide.md`

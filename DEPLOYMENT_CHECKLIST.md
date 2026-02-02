# Vercel Deployment Checklist

Use this checklist to ensure successful deployment of your Design Investment Calculator.

## Pre-Deployment
- [ ] Node.js 18+ installed (`node -v`)
- [ ] Git installed (`git --version`)
- [ ] GitHub account created
- [ ] Vercel account created (https://vercel.com)

## Local Setup
- [ ] Dependencies installed (`npm install`)
- [ ] App runs locally (`npm run dev`)
- [ ] App accessible at http://localhost:3000
- [ ] All features working (toggle services, see ROI calculations)
- [ ] No console errors in browser dev tools

## Git Repository
- [ ] Git initialized (`git init`)
- [ ] .gitignore file present
- [ ] All files added (`git add .`)
- [ ] Initial commit created (`git commit -m "Initial commit"`)
- [ ] GitHub repository created
- [ ] Remote added (`git remote add origin YOUR_URL`)
- [ ] Code pushed to GitHub (`git push -u origin main`)

## Vercel Configuration
- [ ] Logged into Vercel
- [ ] GitHub connected to Vercel
- [ ] Project imported from GitHub
- [ ] Framework preset: Next.js (auto-detected)
- [ ] Root directory: `./`
- [ ] Build command: `npm run build` (default)
- [ ] Output directory: `.next` (default)

## Deployment
- [ ] Clicked "Deploy" button
- [ ] Build completed successfully
- [ ] No build errors in logs
- [ ] Deployment URL generated
- [ ] Site is accessible at Vercel URL

## Post-Deployment Testing
- [ ] Live site loads without errors
- [ ] All sections visible (Brand, Interface, Website)
- [ ] Can toggle service selections
- [ ] Prices calculate correctly
- [ ] ROI metrics display properly
- [ ] Tooltips show on hover
- [ ] Expandable rows work
- [ ] Page count controls work in Website section
- [ ] Mobile responsive design works
- [ ] No console errors on live site

## Optional Enhancements
- [ ] Custom domain configured
- [ ] Domain DNS settings updated
- [ ] SSL certificate active (automatic with Vercel)
- [ ] Analytics enabled in Vercel dashboard
- [ ] Environment variables set (if needed)
- [ ] Production URL bookmarked

## Ongoing Maintenance
- [ ] Automatic deployments enabled (default with GitHub connection)
- [ ] Preview deployments for branches enabled
- [ ] Team members invited (if applicable)
- [ ] Monitoring set up for downtime alerts

## Rollback Plan (If Needed)
- [ ] Know how to access previous deployments
- [ ] Understand instant rollback in Vercel dashboard
- [ ] Have local backup of working code

---

## Quick Commands Reference

```bash
# Local development
npm install              # Install dependencies
npm run dev             # Start dev server
npm run build           # Test production build
npm start               # Run production locally

# Git operations
git status              # Check file status
git add .               # Stage all files
git commit -m "msg"     # Commit changes
git push                # Push to GitHub

# Vercel CLI (optional)
npm i -g vercel         # Install Vercel CLI
vercel login            # Login to Vercel
vercel                  # Deploy preview
vercel --prod           # Deploy production
```

---

## Success Criteria

✅ **Deployment Successful When:**
1. Live URL is accessible
2. All calculator features work
3. No 404 or 500 errors
4. Mobile version displays correctly
5. Automatic deployments work from GitHub pushes

---

## Need Help?

- Review: `QUICKSTART.md` for step-by-step guide
- Read: `vercel-deployment-guide.md` for detailed instructions
- Visit: https://vercel.com/docs
- Support: https://vercel.com/support

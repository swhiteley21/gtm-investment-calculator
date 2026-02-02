#!/bin/bash

# Design Investment Calculator - Vercel Deployment Script
# This script helps you quickly deploy your calculator to Vercel

echo "🚀 Design Investment Calculator - Vercel Deployment Helper"
echo "============================================================"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
  echo "📦 Initializing Git repository..."
  git init
  echo "✅ Git initialized"
else
  echo "✅ Git repository already exists"
fi

# Check if .gitignore exists
if [ ! -f .gitignore ]; then
  echo "⚠️  Warning: .gitignore not found!"
else
  echo "✅ .gitignore found"
fi

# Add all files
echo ""
echo "📝 Adding files to Git..."
git add .

# Commit
echo "💾 Creating initial commit..."
git commit -m "Initial commit: Design Investment Calculator"

echo ""
echo "✅ Local setup complete!"
echo ""
echo "Next steps:"
echo "==========="
echo ""
echo "1. Create a new repository on GitHub:"
echo "   → Go to: https://github.com/new"
echo "   → Repository name: design-investment-calculator"
echo "   → Make it public or private (your choice)"
echo "   → DON'T initialize with README, .gitignore, or license"
echo ""
echo "2. Link your local repository to GitHub:"
echo "   → Run: git remote add origin https://github.com/YOUR_USERNAME/design-investment-calculator.git"
echo "   → Run: git branch -M main"
echo "   → Run: git push -u origin main"
echo ""
echo "3. Deploy to Vercel:"
echo "   → Go to: https://vercel.com/new"
echo "   → Import your GitHub repository"
echo "   → Click 'Deploy'"
echo ""
echo "4. Your app will be live at: https://your-project.vercel.app"
echo ""
echo "📖 For detailed instructions, see: vercel-deployment-guide.md"

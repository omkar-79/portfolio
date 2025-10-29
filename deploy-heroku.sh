#!/bin/bash

# Heroku Deployment Script for Next.js Portfolio

echo "🚀 Starting Heroku Deployment..."

# 1. Commit the Procfile and updated package.json
echo "📝 Committing Heroku configuration files..."
git add Procfile package.json
git commit -m "Add Heroku deployment configuration"

# 2. Create a Heroku app (run this only once, or skip if you already have an app)
echo "🆕 Creating Heroku app..."
echo "Note: If you already have a Heroku app, skip this step or replace 'portfolio-app' with your app name"
# heroku create portfolio-app

# 3. Or connect to existing Heroku app
# heroku git:remote -a your-existing-app-name

# 4. Set environment variable for production
echo "⚙️  Setting environment variables..."
heroku config:set NODE_ENV=production

# 5. Deploy to Heroku
echo "📤 Pushing to Heroku..."
git push heroku main

# 6. Open the deployed app
echo "🌐 Opening your app..."
heroku open

echo "✅ Deployment complete!"
echo "📊 Check logs with: heroku logs --tail"


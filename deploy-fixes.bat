@echo off
cd /d "C:\Users\renat\Documents\affiliateB"
echo Staging all changes...
git add -A
echo.
echo Committing...
git commit -m "fix: markdown rendering in reviews, homepage CMS wiring, compare routes, review SEO sections"
echo.
echo Pushing to remote...
git push
echo.
echo Done! Netlify will pick this up and redeploy automatically.
pause

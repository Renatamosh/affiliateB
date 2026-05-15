@echo off
cd /d "C:\Users\renat\Documents\affiliateB"
git add -A
git commit -m "fix: heading level selector, duplicate CTA fields, image extension, features page"
git pull --rebase origin main
git push origin main > push-output.txt 2>&1
echo Exit code: %errorlevel% >> push-output.txt
echo Done! >> push-output.txt

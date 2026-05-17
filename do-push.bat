@echo off
cd /d "C:\Users\renat\Documents\affiliateB"
git add -A
git commit -m "fix: guard empty generateStaticParams for strategy/guides/how-to/compare collections"
git pull --rebase origin main
git push origin main > push-output.txt 2>&1
echo Exit code: %errorlevel% >> push-output.txt
echo Done! >> push-output.txt

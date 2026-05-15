@echo off
cd /d "C:\Users\renat\Documents\affiliateB"
echo Starting... > push-output.txt 2>&1
git add -A >> push-output.txt 2>&1
git commit -m "feat: wire all homepage sections to CMS, fix about metadata, add SEO fields to all collections" >> push-output.txt 2>&1
echo Pulling remote changes... >> push-output.txt 2>&1
git pull --rebase origin main >> push-output.txt 2>&1
echo. >> push-output.txt
echo Pushing... >> push-output.txt
git push origin main >> push-output.txt 2>&1
echo. >> push-output.txt
echo Exit code: %errorlevel% >> push-output.txt
echo Done! >> push-output.txt

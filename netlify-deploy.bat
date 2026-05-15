@echo off
cd /d "C:\Users\renat\Documents\affiliateB"
echo Starting Netlify deploy... > netlify-output.txt 2>&1
npx -y netlify-cli deploy --prod --site=8dbd440b-f29e-4bc3-9403-3a63294e0017 >> netlify-output.txt 2>&1
echo Exit code: %errorlevel% >> netlify-output.txt
echo Done >> netlify-output.txt

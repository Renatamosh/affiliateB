@echo off
cd /d "C:\Users\renat\Documents\affiliateB"
echo === GIT LOG (last 3 commits) === > git-output.txt
git log --oneline -3 >> git-output.txt 2>&1
echo. >> git-output.txt
echo === GIT STATUS === >> git-output.txt
git status >> git-output.txt 2>&1
echo. >> git-output.txt
echo === GIT REMOTE === >> git-output.txt
git remote -v >> git-output.txt 2>&1
echo Done. >> git-output.txt

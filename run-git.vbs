Set oShell = CreateObject("WScript.Shell")
Set oFSO = CreateObject("Scripting.FileSystemObject")

Dim sDir
sDir = "C:\Users\renat\Documents\affiliateB"

Dim sCmd
sCmd = "cmd /c cd /d """ & sDir & """ && git add -A && git commit -m ""fix: markdown rendering in reviews, CMS homepage wiring, compare routes, review SEO sections"" && git push >> """ & sDir & "\git-output.txt"" 2>&1"

oShell.Run sCmd, 0, True

MsgBox "Git push complete! Check git-output.txt for results.", 64, "Bridge Playbook Deploy"

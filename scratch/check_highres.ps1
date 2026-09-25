Add-Type -AssemblyName System.Drawing
$b = [System.Drawing.Bitmap]::FromFile("C:\Users\Admin\.gemini\antigravity-ide\brain\fe63e2f6-a606-458c-9726-32a47123ffe4\.user_uploaded\media_1790162609577.png")
Write-Output "Highres PNG size: $($b.Width) x $($b.Height)"
$b.Dispose()

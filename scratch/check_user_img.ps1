Add-Type -AssemblyName System.Drawing
$b = [System.Drawing.Bitmap]::FromFile("C:\Users\Admin\.gemini\antigravity-ide\brain\8ecb201a-e396-4dc1-813b-ba644cc3ea3d\.user_uploaded\media_1790163955570.png")
Write-Output "Size of media_1790163955570.png: $($b.Width) x $($b.Height)"
$b.Dispose()

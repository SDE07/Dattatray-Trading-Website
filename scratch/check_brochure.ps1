Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Bitmap]::FromFile("C:\Users\Admin\.gemini\antigravity-ide\brain\fe63e2f6-a606-458c-9726-32a47123ffe4\.user_uploaded\media_1790162154144.jpg")
Write-Output "High-res brochure size: $($img.Width) x $($img.Height)"
$img.Dispose()

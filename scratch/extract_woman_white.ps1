Add-Type -AssemblyName System.Drawing
$b = [System.Drawing.Bitmap]::FromFile("C:\Users\Admin\.gemini\antigravity-ide\brain\fe63e2f6-a606-458c-9726-32a47123ffe4\.user_uploaded\media_1790162609577.png")

# Let's crop from x=310 to x=675, y=30 to y=597
$rect = New-Object System.Drawing.Rectangle(315, 32, 355, 565)
$crop = $b.Clone($rect, $b.PixelFormat)
$b.Dispose()

$crop.Save("c:\CRM-FOX\Websites\Dattatray-Traders\scratch\woman_from_white.png", [System.Drawing.Imaging.ImageFormat]::Png)
$crop.Dispose()
Write-Output "Woman from white saved"

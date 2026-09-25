Add-Type -AssemblyName System.Drawing
$b = [System.Drawing.Bitmap]::FromFile("C:\Users\Admin\.gemini\antigravity-ide\brain\fe63e2f6-a606-458c-9726-32a47123ffe4\.user_uploaded\media_1790162154144.jpg")

# Crop the woman region
$rect = New-Object System.Drawing.Rectangle(320, 0, 380, 680)
$crop = $b.Clone($rect, $b.PixelFormat)
$b.Dispose()

$crop.Save("c:\CRM-FOX\Websites\Dattatray-Traders\scratch\woman_from_black.png", [System.Drawing.Imaging.ImageFormat]::Png)
$crop.Dispose()
Write-Output "Woman from black saved"

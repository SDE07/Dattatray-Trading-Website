Add-Type -AssemblyName System.Drawing
$srcPath = "C:\Users\Admin\.gemini\antigravity-ide\brain\fe63e2f6-a606-458c-9726-32a47123ffe4\.user_uploaded\media_1790157950993.png"
$src = [System.Drawing.Bitmap]::FromFile($srcPath)
$rect = New-Object System.Drawing.Rectangle(450, 0, ($src.Width - 450), $src.Height)
$crop = $src.Clone($rect, $src.PixelFormat)
$crop.Save("c:\CRM-FOX\Websites\Dattatray-Traders\scratch\ref_products.png", [System.Drawing.Imaging.ImageFormat]::Png)
$src.Dispose()
$crop.Dispose()
Write-Output "Crop saved: $($rect.Width) x $($rect.Height)"

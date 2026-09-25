Add-Type -AssemblyName System.Drawing

$srcPath = "c:\CRM-FOX\Websites\Dattatray-Traders\src\assets\why_choose_hero.jpg"
$img = [System.Drawing.Bitmap]::FromFile($srcPath)

$minX = $img.Width; $maxX = 0; $minY = $img.Height; $maxY = 0

for ($y = 0; $y -lt $img.Height; $y++) {
    for ($x = 0; $x -lt $img.Width; $x++) {
        $c = $img.GetPixel($x, $y)
        if ($c.A -gt 20) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

Write-Output "Alpha bounds: minX=$minX, maxX=$maxX, minY=$minY, maxY=$maxY"
$pad = 6
$cropX = [Math]::Max(0, $minX - $pad)
$cropY = [Math]::Max(0, $minY - $pad)
$cropW = [Math]::Min($img.Width - $cropX, ($maxX - $minX + 1) + ($pad * 2))
$cropH = [Math]::Min($img.Height - $cropY, ($maxY - $minY + 1) + ($pad * 2))

$rect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)
$cropped = $img.Clone($rect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$img.Dispose()

# Save as why_choose_hero_tight.png and also replace why_choose_hero.png
$destPng = "c:\CRM-FOX\Websites\Dattatray-Traders\src\assets\why_choose_hero.png"
$cropped.Save($destPng, [System.Drawing.Imaging.ImageFormat]::Png)

# Also save to a temp file and replace why_choose_hero.jpg so existing import works
$tempJpg = "c:\CRM-FOX\Websites\Dattatray-Traders\scratch\temp_hero.png"
$cropped.Save($tempJpg, [System.Drawing.Imaging.ImageFormat]::Png)
$cropped.Dispose()

Copy-Item $tempJpg $srcPath -Force
Write-Output "Cropped to size: $cropW x $cropH and saved to both .png and .jpg"

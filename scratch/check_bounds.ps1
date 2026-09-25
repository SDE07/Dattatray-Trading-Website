Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Bitmap]::FromFile("c:\CRM-FOX\Websites\Dattatray-Traders\src\assets\why_choose_hero.jpg")

$minX = $img.Width; $maxX = 0; $minY = $img.Height; $maxY = 0

for ($y = 0; $y -lt $img.Height; $y++) {
    for ($x = 0; $x -lt $img.Width; $x++) {
        $c = $img.GetPixel($x, $y)
        # Check non-black
        if ($c.R -gt 15 -or $c.G -gt 15 -or $c.B -gt 15) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

Write-Output "Image size: $($img.Width) x $($img.Height)"
Write-Output "Non-black bounding box: minX=$minX, maxX=$maxX, minY=$minY, maxY=$maxY"
Write-Output "Subject size: $($maxX - $minX + 1) x $($maxY - $minY + 1)"
$img.Dispose()

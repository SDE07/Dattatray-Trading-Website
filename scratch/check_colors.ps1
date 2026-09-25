Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Bitmap]::FromFile("c:\CRM-FOX\Websites\Dattatray-Traders\src\assets\why_choose_hero.jpg")
$c0 = $img.GetPixel(0, 0)
$c1 = $img.GetPixel(10, 10)
$cCenter = $img.GetPixel([int]($img.Width / 2), [int]($img.Height / 2))
Write-Output "Pixel 0,0: R=$($c0.R), G=$($c0.G), B=$($c0.B)"
Write-Output "Pixel 10,10: R=$($c1.R), G=$($c1.G), B=$($c1.B)"
Write-Output "Center: R=$($cCenter.R), G=$($cCenter.G), B=$($cCenter.B)"
$img.Dispose()

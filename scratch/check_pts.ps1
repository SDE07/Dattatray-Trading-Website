Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Bitmap]::FromFile("c:\CRM-FOX\Websites\Dattatray-Traders\src\assets\why_choose_hero.jpg")
$pts = @(@(0,0), @(50,50), @(100,100), @(200,200), @(320, 200), @(500,200), @(600,400))
foreach ($p in $pts) {
    $c = $img.GetPixel($p[0], $p[1])
    Write-Output "Pixel ($($p[0]), $($p[1])): R=$($c.R), G=$($c.G), B=$($c.B), A=$($c.A)"
}
$img.Dispose()

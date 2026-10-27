Add-Type -AssemblyName System.Drawing

$image = [System.Drawing.Bitmap]::new(1200, 630)
$graphics = [System.Drawing.Graphics]::FromImage($image)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

function New-Brush([string]$hex) {
    return [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml($hex))
}

$oat = New-Brush '#F1F3D0'
$plum = New-Brush '#173B37'
$paprika = New-Brush '#E85B4A'
$peach = New-Brush '#8FDDD3'
$gold = New-Brush '#FFC040'
$lime = New-Brush '#D6E85A'
$white = New-Brush '#FFFFFF'
$sage = New-Brush '#27C7B7'
$muted = New-Brush '#4F6964'
$heading = [System.Drawing.Font]::new('Georgia', 80, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$body = [System.Drawing.Font]::new('Arial', 32, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$eyebrow = [System.Drawing.Font]::new('Arial', 22, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$footer = [System.Drawing.Font]::new('Arial', 23, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)

try {
    $graphics.FillRectangle($oat, 0, 0, 1200, 630)
    $graphics.FillRectangle($paprika, 0, 0, 14, 630)
    $graphics.FillRectangle($plum, 806, 0, 394, 630)
    $graphics.FillEllipse($peach, 646, -115, 285, 285)

    $graphics.FillEllipse($paprika, 70, 68, 57, 57)
    $brandMark = [System.Drawing.Font]::new('Georgia', 36, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
    try { $graphics.DrawString('R', $brandMark, $white, 84, 73) } finally { $brandMark.Dispose() }
    $graphics.DrawString('WOMEN LED  /  WOMEN RUN  /  WOMEN GROWN', $eyebrow, $paprika, 146, 83)

    $graphics.DrawString('RUMIRA', $heading, $plum, 68, 168)
    $graphics.DrawString('FOODS', $heading, $paprika, 68, 257)
    $graphics.DrawString('Healthy food everyday.', $body, $plum, 72, 385)
    $graphics.DrawString('Your go-to clean label food brand.', $body, $plum, 72, 427)
    $graphics.FillRectangle($paprika, 72, 493, 72, 5)
    $graphics.DrawString('MILLET & YOU  /  COFFEE DIPS  /  HERBAL TEAS', $footer, $muted, 72, 530)

    $graphics.FillEllipse($peach, 825, 105, 330, 330)
    $graphics.FillEllipse($white, 867, 145, 247, 247)
    $graphics.FillEllipse($paprika, 908, 185, 120, 120)
    $graphics.FillEllipse($lime, 1014, 226, 57, 57)
    $graphics.FillEllipse($sage, 936, 283, 72, 40)
    $graphics.FillEllipse($sage, 988, 307, 76, 35)
    $graphics.FillEllipse($gold, 830, 452, 42, 42)
    $graphics.FillEllipse($paprika, 1105, 464, 23, 23)
    $graphics.DrawString('RUMIRA FOODS', $eyebrow, $white, 888, 533)

    $destination = Join-Path (Get-Location) 'public/og-rumira-foods.png'
    $image.Save($destination, [System.Drawing.Imaging.ImageFormat]::Png)
    Write-Output $destination
} finally {
    foreach ($item in @($heading, $body, $eyebrow, $footer, $oat, $plum, $paprika, $peach, $gold, $lime, $white, $sage, $muted, $graphics, $image)) {
        $item.Dispose()
    }
}

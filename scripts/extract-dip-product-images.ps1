Add-Type -AssemblyName System.Drawing

$projectRoot = Split-Path $PSScriptRoot -Parent
$sourcePath = Join-Path $projectRoot 'public/dip-tea-coffee-catalog.png'
$outputDir = Join-Path $projectRoot 'public/dip-product-images'
New-Item -ItemType Directory -Path $outputDir -Force | Out-Null

# Crop only the supplied product photographs, excluding headings and descriptions.
$items = @(
    @{ Id = 'coffee-dips-ashwagandha'; X = 0; Y = 43; W = 230; H = 120 },
    @{ Id = 'coffee-dips-herbal'; X = 230; Y = 43; W = 230; H = 120 },
    @{ Id = 'coffee-dips-shilajit'; X = 460; Y = 43; W = 230; H = 120 },
    @{ Id = 'coffee-dips-dark-roast'; X = 690; Y = 43; W = 230; H = 120 },
    @{ Id = 'coffee-dips-turmeric-pepper'; X = 920; Y = 43; W = 232; H = 120 },
    @{ Id = 'flavoured-coffee-berry'; X = 0; Y = 296; W = 288; H = 120 },
    @{ Id = 'flavoured-coffee-orange'; X = 288; Y = 296; W = 288; H = 120 },
    @{ Id = 'flavoured-coffee-cardamom'; X = 576; Y = 296; W = 288; H = 120 },
    @{ Id = 'flavoured-coffee-chocolate'; X = 864; Y = 296; W = 288; H = 120 },
    @{ Id = 'herbal-teas-ashwagandha-green'; X = 0; Y = 549; W = 288; H = 126 },
    @{ Id = 'herbal-teas-turmeric-ginger'; X = 288; Y = 549; W = 288; H = 126 },
    @{ Id = 'herbal-teas-ginger-peppermint'; X = 576; Y = 549; W = 288; H = 126 },
    @{ Id = 'herbal-teas-chamomile-lavender'; X = 864; Y = 549; W = 288; H = 126 }
)

$source = [System.Drawing.Image]::FromFile($sourcePath)
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
    Where-Object MimeType -eq 'image/jpeg'
$parameters = [System.Drawing.Imaging.EncoderParameters]::new(1)
$parameters.Param[0] = [System.Drawing.Imaging.EncoderParameter]::new(
    [System.Drawing.Imaging.Encoder]::Quality, [long]88
)

try {
    if ($source.Width -ne 1152 -or $source.Height -ne 768) {
        throw "Unexpected catalogue dimensions: $($source.Width)x$($source.Height)"
    }

    foreach ($item in $items) {
        $canvas = [System.Drawing.Bitmap]::new(840, 630)
        $graphics = [System.Drawing.Graphics]::FromImage($canvas)
        try {
            $graphics.Clear([System.Drawing.ColorTranslator]::FromHtml('#faf8f3'))
            $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

            $height = [int][Math]::Round(840 * $item.H / $item.W)
            $top = [int][Math]::Round((630 - $height) / 2)
            $destination = [System.Drawing.Rectangle]::new(0, $top, 840, $height)
            $crop = [System.Drawing.Rectangle]::new($item.X, $item.Y, $item.W, $item.H)
            $graphics.DrawImage($source, $destination, $crop, [System.Drawing.GraphicsUnit]::Pixel)

            $outputPath = Join-Path $outputDir "$($item.Id).jpg"
            $canvas.Save($outputPath, $codec, $parameters)
            Write-Output $outputPath
        } finally {
            $graphics.Dispose()
            $canvas.Dispose()
        }
    }
} finally {
    $parameters.Dispose()
    $source.Dispose()
}

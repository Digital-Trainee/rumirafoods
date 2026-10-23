param([string]$Document = 'C:\Users\DELL\Downloads\RUMIRA FOODS.docx')

Add-Type -AssemblyName System.IO.Compression.FileSystem
$archive = [System.IO.Compression.ZipFile]::OpenRead($Document)
try {
    function Read-Entry([string]$name) {
        $reader = [System.IO.StreamReader]::new($archive.GetEntry($name).Open())
        try { return $reader.ReadToEnd() } finally { $reader.Dispose() }
    }
    $documentXml = [xml](Read-Entry 'word/document.xml')
    $relationships = [xml](Read-Entry 'word/_rels/document.xml.rels')
    $images = @{}
    foreach ($relationship in $relationships.Relationships.Relationship) {
        $images[$relationship.Id] = $relationship.Target
    }
    $namespaces = [System.Xml.XmlNamespaceManager]::new($documentXml.NameTable)
    $namespaces.AddNamespace('w', 'http://schemas.openxmlformats.org/wordprocessingml/2006/main')
    $namespaces.AddNamespace('a', 'http://schemas.openxmlformats.org/drawingml/2006/main')
    $paragraphs = @($documentXml.SelectNodes('//w:body//w:p', $namespaces) | ForEach-Object {
        $content = ($_.SelectNodes('.//w:t', $namespaces) | ForEach-Object { $_.'#text' }) -join ''
        $blip = $_.SelectSingleNode('.//a:blip', $namespaces)
        if ($content.Trim() -or $blip) {
            [pscustomobject]@{
                text = $content.Trim()
                image = if ($blip) { $images[$blip.GetAttribute('embed', 'http://schemas.openxmlformats.org/officeDocument/2006/relationships')] } else { $null }
            }
        }
    })
    $categories = @('powders', 'fruits', 'millets', 'snacks', 'seasonings', 'botanicals')
    $groupIndex = -1
    $products = @()
    for ($i = 0; $i -lt $paragraphs.Count; $i++) {
        if ($paragraphs[$i].text -match '^([1-6])\. ') { $groupIndex = [int]$Matches[1] - 1; continue }
        if ($paragraphs[$i].text -match '^7\. ') { break }
        if ($groupIndex -lt 0 -or -not $paragraphs[$i].image) { continue }
        $name = $paragraphs[$i + 1].text
        $description = $paragraphs[$i + 2].text
        if (-not $name -or -not $description) { throw "Missing product text after image at paragraph $i" }
        $slug = ($name.ToLowerInvariant() -replace '[^a-z0-9]+', '-').Trim('-')
        $id = "$($categories[$groupIndex])-$slug"
        $filename = "$id.jpg"
        $target = Join-Path 'public/product-images' $filename
        New-Item -ItemType Directory -Force -Path (Split-Path $target) | Out-Null
        $source = $archive.GetEntry("word/$($paragraphs[$i].image)")
        [System.IO.Compression.ZipFileExtensions]::ExtractToFile($source, (Join-Path (Get-Location) $target), $true)
        $products += [pscustomobject]@{ id = $id; name = $name; groupId = $categories[$groupIndex]; description = $description; image = "/product-images/$filename" }
    }
    $json = $products | ConvertTo-Json -Depth 4
    [System.IO.File]::WriteAllText((Join-Path (Get-Location) 'src/catalog-data.json'), $json, [System.Text.UTF8Encoding]::new($false))
    "Imported $($products.Count) products."
} finally {
    $archive.Dispose()
}

# Synchronize the small browser-readable index with the two Markdown references.
$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot
$sources = [ordered]@{ layout = '页面布局设计全景分类参考.md'; motion = '动效界面设计风格全景分类参考.md' }
$index = [ordered]@{}
foreach ($page in $sources.Keys) {
  $group = ''
  $index[$page] = @(foreach ($line in Get-Content -Encoding utf8 -LiteralPath $sources[$page]) {
    if ($line -match '^## (.+)$') { $group = $Matches[1] }
    if ($line -match '^### (\d+\.\d+)\s+(.+)$') {
      [ordered]@{ id = $Matches[1]; title = $Matches[2]; group = $group }
    }
  })
}
Set-Content -Encoding utf8 -LiteralPath '图鉴目录数据.js' -Value ('window.UI_GUIDE_INDEX = ' + ($index | ConvertTo-Json -Depth 4) + ';')

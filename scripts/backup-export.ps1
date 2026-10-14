$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression.FileSystem
$repoPath = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..')).Path
$sourcePath = (Resolve-Path -LiteralPath (Join-Path $repoPath 'design-system-export')).Path
$backupDirectory = Join-Path (Split-Path $repoPath -Parent) 'backups'
New-Item -ItemType Directory -Path $backupDirectory -Force | Out-Null
$backupPath = Join-Path $backupDirectory ('prime-padel-design-system-export-' + (Get-Date -Format 'yyyyMMdd-HHmmss') + '.zip')
if ($backupPath.StartsWith($repoPath + [IO.Path]::DirectorySeparatorChar)) { throw 'Backup precisa ficar fora do repositório.' }
[IO.Compression.ZipFile]::CreateFromDirectory($sourcePath, $backupPath)
$archive = [IO.Compression.ZipFile]::OpenRead($backupPath)
try {
  $inventory = Get-Content -LiteralPath (Join-Path $repoPath 'design-system/INVENTORY.json') -Raw | ConvertFrom-Json
  $entries = @($archive.Entries | Where-Object { $_.Name })
  if ($entries.Count -ne $inventory.files.Count) { throw 'Quantidade de arquivos divergente.' }
  foreach ($item in $inventory.files) {
    $entry = $entries | Where-Object { $_.FullName.Replace('\','/') -eq $item.path }
    if (-not $entry) { throw ('Arquivo ausente: ' + $item.path) }
    $stream = $entry.Open()
    try {
      $sha = [Security.Cryptography.SHA256]::Create()
      try { $hash = [BitConverter]::ToString($sha.ComputeHash($stream)).Replace('-','') } finally { $sha.Dispose() }
    } finally { $stream.Dispose() }
    if ($hash -ne $item.sha256) { throw ('Hash divergente: ' + $item.path) }
  }
  Write-Output ('BACKUP_VERIFIED=' + $backupPath)
  Write-Output ('FILES_VERIFIED=' + $entries.Count)
} finally { $archive.Dispose() }

Set-Location -LiteralPath (Split-Path -Parent $PSScriptRoot)

$node = (Get-Command node.exe).Source
& $node --preserve-symlinks --preserve-symlinks-main ".\scripts\next-dev-sandbox.cjs"

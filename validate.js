$csv = Import-Csv "data\produtos.csv"

# 1. Remove duplicatas (primeira ocorrência de cada SKU)
$csv = $csv | Group-Object -Property sku | ForEach-Object { $_.Group[0] }

# 2. Preenche preço vazio com 0.00 na coluna CERTA
$csv | ForEach-Object {
    if ([string]::IsNullOrWhiteSpace($_.precoNormal)) { $_.precoNormal = "0.00" }
}

# 3. Salva sem BOM
$csv | ConvertTo-Json -Depth 10 |
    ForEach-Object { [System.IO.File]::WriteAllText("$pwd\data\produtos.json", $_) }
"""Verify original uploads remain intact; typed research validation runs in prepare-data.ts."""
from pathlib import Path
import hashlib, json, csv
root = Path(__file__).resolve().parents[1]
manifest = json.loads((root / 'archive/manifest.json').read_text())
for item in manifest:
    path = root / 'archive/uploads' / item['file']
    if hashlib.sha256(path.read_bytes()).hexdigest() != item['sha256']:
        raise ValueError(f'Original upload changed: {path}')
for path in (root / 'data').rglob('*.csv'):
    with path.open(newline='', encoding='utf-8-sig') as stream:
        rows = list(csv.reader(stream))
    if not rows or len(rows[0]) != len(set(rows[0])):
        raise ValueError(f'Invalid headers: {path}')
    for number, row in enumerate(rows[1:], 2):
        if len(row) != len(rows[0]):
            raise ValueError(f'{path}:{number}: uneven columns')
print(f'Verified {len(manifest)} original upload checksums and CSV structure.')

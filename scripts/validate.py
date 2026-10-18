"""Validate preserved uploads, research formats and JavaScript syntax."""
from pathlib import Path
import csv, hashlib, json, subprocess
root = Path(__file__).resolve().parents[1]
manifest = json.loads((root / 'archive/manifest.json').read_text())
for item in manifest:
    path = root / 'archive/uploads' / item['file']
    assert hashlib.sha256(path.read_bytes()).hexdigest() == item['sha256'], path
count = 0
for path in sorted((root / 'site/data').iterdir()):
    if path.suffix == '.csv':
        with path.open(newline='', encoding='utf-8-sig') as stream:
            rows = list(csv.reader(stream))
        assert len(rows) > 1, f'Empty dataset: {path}'
        assert len(rows[0]) == len(set(rows[0])), f'Duplicate headers: {path}'
        for number, row in enumerate(rows[1:], 2):
            assert len(row) == len(rows[0]), f'{path.name}:{number}: uneven columns'
        count += len(rows) - 1
    elif path.suffix == '.json':
        json.loads(path.read_text())
for path in (root / 'site/assets/js').glob('*.js'):
    subprocess.run(['node', '--check', str(path)], check=True)
print(f'Validated {len(manifest)} original uploads, {count} CSV records, JSON and JavaScript syntax.')

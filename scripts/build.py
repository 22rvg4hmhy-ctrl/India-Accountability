"""Produce the static deployable site without publishing development archives."""
from pathlib import Path
import shutil
root = Path(__file__).resolve().parents[1]
shutil.rmtree(root / 'dist', ignore_errors=True)
shutil.copytree(root / 'site', root / 'dist')
(root / 'dist' / '.nojekyll').touch()
print('Built dist/')

import os
import glob

# Get all html files
files = glob.glob('**/*.html', recursive=True)
count = 0
for file in files:
    if 'node_modules' in file:
        continue
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if '<link rel="icon"' not in content:
        content = content.replace('</head>', '    <link rel="icon" type="image/png" href="/logo.png">\n</head>')
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        count += 1
print(f"Updated {count} files.")

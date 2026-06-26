import sys, json
d = json.load(sys.stdin)
print(json.dumps(d, indent=2, ensure_ascii=False)[:3000])

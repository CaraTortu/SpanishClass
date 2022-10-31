with open("json/masterclass_mp4.json", "r") as f:
    a = f.read()
with open("json/masterclass_yt.json", "r") as f:
    b = f.read()
# now we have two json STRINGS
import json
dictA = json.loads(a)
dictB = json.loads(b)

merged_dict = {**dictA, **dictB}

# string dump of the merged dict
jsonString_merged = json.dumps(merged_dict)

with open("production/masterclass.json", "w") as f:
    f.write(jsonString_merged)
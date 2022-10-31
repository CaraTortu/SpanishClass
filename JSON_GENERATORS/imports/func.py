import json

db = {}

cookies = {}

def get_db(name):
    with open(name, "r") as f:
        db = f.read()
        db = json.loads(db)
        return db

def append_db(key, value):
    global db
    db[key] = value
    
def write_db(name):
    global db
    with open(name, "w") as f:
        f.write(json.dumps(db))

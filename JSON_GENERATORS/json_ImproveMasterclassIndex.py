import imports.func as func
import json, requests, bs4, datetime, time

with open("json/masterclass.json", "r") as f:
    db = f.read()
    db = json.loads(db)
    cleanedDB = {}

page = requests.get("https://academia.youtalkonline.com/lessons/2018/").text
tmp = []
soup = bs4.BeautifulSoup(page)

for s in soup.strings:
    if "Master" in s:
        tmp.append(s.replace("Master Class – ", "").replace("/", "-").strip())

tmp.pop(0)

# Sort out list

unix_times = []

for date in tmp:
    day, month, year = date.split("-")
    date_time = datetime.datetime(int(year), int(month), int(day))
    unix = time.mktime(date_time.timetuple())
    unix_times.append(int(unix))

unix_times.sort()

tmp = []

for unixstamp in unix_times:
    date = datetime.datetime.utcfromtimestamp(unixstamp).strftime('%d-%m-20%y')
    tmp.append(date)

for i in range(1,108):
    cleanedDB[tmp[i-1]] = db[str(i)]

with open("json/masterclass_mp4.json", "w") as f:
    f.write(json.dumps(cleanedDB))
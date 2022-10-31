import requests, datetime
from bs4 import BeautifulSoup
import imports.func as func

def get_pos(top):

    base_url = "https://academia.youtalkonline.com/topic/master-class-"
    initial_date = "24-02-2021"
    base = datetime.datetime.strptime(initial_date, "%d-%m-20%y")
    for i in range(1,top):
        daysToAdd = (i-1)*7
        date = base + datetime.timedelta(days=daysToAdd)
        date = date.strftime("%d-%m-20%y")
        url = f"{base_url}{date}/"
        r = requests.get(url, cookies=func.cookies)
        if r.status_code == 200:
            soup = BeautifulSoup(r.text)
            for link in soup.find_all('iframe'):
                title = link.get('title')
                if title is None:
                    continue
                if "master" not in title.lower():
                    continue
                l = link.get("src")
                if "youtube" in l:
                    url = l
                    break
            print(f"url: {url} - {i}")
            if "youtube" in url:
                url = url.replace("https://www.youtube.com/embed/", "https://www.youtube.com/watch?v=").replace("?feature=oembed", "")
                func.append_db(date, url)
                


db = func.get_db("json/masterclass_yt.json")

get_pos(100)

func.write_db("json/masterclass_yt.json")
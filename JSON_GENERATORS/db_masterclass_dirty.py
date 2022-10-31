import requests
from bs4 import BeautifulSoup
import imports.func as func

def get_pos(top):

    base_url = "https://academia.youtalkonline.com/topic/master-class-"
    for i in range(1,top):
        url = f"{base_url}{i}/"
        r = requests.get(url, cookies=func.cookies)
        if r.status_code == 200:
            soup = BeautifulSoup(r.text)
            for link in soup.find_all('video'):
                l = link.text
                if "uploads" in l:
                    url = l
                    break
            print(f"url: {url} - {i}")
            if "youtube" in url or "uploads" in url:
                func.append_db(i, url)
                


db = func.get_db("json/masterclass.json")

get_pos(113)

func.write_db("json/masterclass.json")
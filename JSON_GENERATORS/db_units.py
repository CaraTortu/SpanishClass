import requests, threading
from bs4 import BeautifulSoup
import imports.func as func


def get_pos(i):

    base_url = "https://academia.youtalkonline.com/topic/class-"
    options = ["-grammar", "-sentences", "-vocabulary"]
    for j in range(1,10):
        for option in options:
            url = f"{base_url}{i}-{j}{option}/"
            r = requests.get(url, cookies=func.cookies)
            if r.status_code == 200:
                soup = BeautifulSoup(r.text)
                for link in soup.find_all('source'):
                    url = link.get('src')
                print("url: " + url)
                func.append_db(f"{i}.{j}", url)
                break

threads = []
func.db = func.get_db("json/units.json")

for i in range(1,50):
    t = threading.Thread(target=get_pos, args=[i])
    threads.append(t)
    t.start()

for thread in threads:
    thread.join()

func.write_db("json/units.json")
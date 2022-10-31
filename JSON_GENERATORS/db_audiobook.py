import requests, threading, re
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

                # Find PDF
                for link in soup.find_all('audio', attrs={'src': re.compile("^https:\/\/curso\.youtalkonline\.com\/wp-")}):
                    audio = link.get('src')
                    if ".mp3" in audio and "audio" not in audio:   
                        print("audio: " + audio, "-", f"{i}.{j}")
                        func.append_db(f"{i}.{j}", audio)
                        break

threads = []
func.db = func.get_db("json/audiobooks.json")

for i in range(1,50):
    t = threading.Thread(target=get_pos, args=[i])
    threads.append(t)
    t.start()

for thread in threads:
    thread.join()

func.write_db("json/audiobooks.json")
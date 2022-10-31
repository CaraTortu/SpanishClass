import imports.func as func

def get_pos(top):

    base_url = "https://academia.youtalkonline.com/quizzes/test-nivel-"
    for i in range(1,top):
        url = f"{base_url}{i*5}/"
        func.append_db(i*5, url)
                


func.db = func.get_db("json/questionares.json")

get_pos(11)

func.write_db("json/questionares.json")
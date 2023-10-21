import json
import os
import shutil
import re


# read json data
f = open("../content.json","r")
data = json.loads(f.read())
f.close()

# delete existing file
try:
	shutil.rmtree("content")
except OSError as e:
    print("Error: %s - %s." % (e.filename, e.strerror))

def parseSymbol(string):
    # symbols = [' ', '-', '/', '(', ')']
    symbols = ['/']
    for symbol in symbols:
        string = string.replace(symbol, '_')
    return string


def removeEmojis(string):
    emoji_pattern = re.compile("["
                               u"\U0001F600-\U0001F64F"  # 表情符號（一般）
                               u"\U0001F300-\U0001F5FF"  # 圖形與裝飾
                               u"\U0001F680-\U0001F6FF"  # 交通運輸
                               u"\U0001F1E0-\U0001F1FF"  # 國旗符號
                               u"\U00002702-\U000027B0"  # 其他裝飾符號
                               u"\U000024C2-\U0001F251"  # 字母符號
                               "]+", flags=re.UNICODE)
    cleaned_string = re.sub(emoji_pattern, '', string)
    
    return cleaned_string


# parse the path accroding to the structure
def parsePath(page,subpage,subsubpage,subsubsubpage,depth=1):
	page = parseSymbol(page)
	page = parseSymbol(page)
	subpage = parseSymbol(subpage)
	subsubpage = parseSymbol(subsubpage)
	subsubsubpage = parseSymbol(subsubsubpage)
	struct = [
		f"content/{page}_{subpage}_{subsubpage}_{subsubsubpage}", # depth = 1
		f"content/{page}/{subpage}_{subsubpage}_{subsubsubpage}", # depth = 2
		f"content/{page}/{subpage}/{subsubpage}_{subsubsubpage}", # depth = 3
		f"content/{page}/{subpage}/{subsubpage}/{subsubsubpage}", # depth = 4
	]
	return struct[depth-1]







print("""
 !!! Choosing a type of structure !!!
 -------------------------------------------------
 depth = 1 : subsubsubpage
 depth = 2 : page/subsubsubpage
 depth = 3 : page/subpage/subsubsubpage
 depth = 4 : page/subpage/subsubpage/subsubsubpage
 -------------------------------------------------
""")
depth = int(input("depth = "))

if (depth in [1,2,3,4]):
	for page in data.keys():
		for subpage in data[page].keys():
			for subsubpage in data[page][subpage].keys():
				for subsubsubpage in data[page][subpage][subsubpage]:
					path = parsePath(page,subpage,subsubpage,subsubsubpage["title"],depth=depth)
					os.makedirs(path)
					print(path)
else:
	print("depth must be 1,2,3,4.")





from PIL import Image
import os

path_to_img = '/home/rohit/Desktop/Machine Learning/Projects/Celebrity Image Classification/model/data/new_persons/sundar_pichai'

total = len(os.listdir(path_to_img))
for count,entry in enumerate(os.scandir(path_to_img)):
    extension = entry.path.split('.')[-1]
    if extension != 'png':
        file_name_without_ext = entry.path.split('.')[-2]
        img = Image.open(entry.path).convert('RGB')
        img.save(file_name_without_ext+'.png','png')
        os.remove(entry)

    print(f'{total}/{count+1}',end='\r')

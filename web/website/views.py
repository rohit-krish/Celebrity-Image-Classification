from flask import Blueprint, render_template, request, jsonify
from .util import classify_image

views = Blueprint('views', __name__)

@views.route('/')
def home():
    return render_template('home.html')


@views.route('/classify_image', methods=['POST'])
def classify():
    image_data = request.form['image_data']
    res = classify_image(base64_data=image_data,file_path=None)
    return jsonify(res)

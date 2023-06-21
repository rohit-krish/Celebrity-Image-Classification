from website import create_app
from website.util import load_saved_artifacts

app = create_app()

if __name__ == '__main__':
    load_saved_artifacts()
    app.run(debug=True)

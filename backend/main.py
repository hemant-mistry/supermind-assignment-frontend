from flask import Flask, request, jsonify
import langflowsetup

app = Flask(__name__)

@app.route("/api/getresponse", methods = ['POST'])
def get_response():

    print(langflowsetup.start_flow())
    

if __name__ == "__main__":
    app.run(debug=True)
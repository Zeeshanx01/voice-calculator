from flask import Flask, jsonify, request
from flask_cors import CORS
import re

app = Flask(__name__)
CORS(app)

def parse_expression(command):
    pattern = r'(\d+)\s*(\+|\-|\*|\/)\s*(\d+)'
    match = re.search(pattern, command)
    if match:
        num1, operator, num2 = match.groups()
        return num1, operator, num2
    else:
        return None, None, None

def evaluate_expression(num1, operator, num2):
    try:
        result = eval(f"{num1} {operator} {num2}")
        return result
    except Exception as e:
        print(f"Error: {e}")
        return None

@app.route('/command', methods=['POST'])
def command_route():
    data = request.get_json()
    command = data.get('text', '')
    if not command:
        return jsonify({"error": "No command text provided"}), 400

    num1, operator, num2 = parse_expression(command)
    if num1 and operator and num2:
        result = evaluate_expression(num1, operator, num2)
        if result is not None:
            return jsonify({"result": result})
        else:
            return jsonify({"error": "Could not evaluate expression"}), 400
    else:
        return jsonify({"error": "Could not parse command"}), 400

@app.route('/test-command', methods=['POST'])
def test_command():
    # you can keep this same or remove if redundant, /command covers this
    data = request.get_json()
    command = data.get('text', '')
    if not command:
        return jsonify({"error": "No command text provided"}), 400

    num1, operator, num2 = parse_expression(command)
    if num1 and operator and num2:
        result = evaluate_expression(num1, operator, num2)
        return jsonify({"command": command, "result": result})
    else:
        return jsonify({"error": "Could not parse command"}), 400

if __name__ == "__main__":
    app.run()

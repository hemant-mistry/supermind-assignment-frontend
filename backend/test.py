# Note: Replace **<YOUR_APPLICATION_TOKEN>** with your actual Application token

import argparse
import json
from argparse import RawTextHelpFormatter
import requests
from typing import Optional
import warnings

BASE_API_URL = "https://api.langflow.astra.datastax.com"
LANGFLOW_ID = "7e6db9b1-c905-4e97-bd57-b3a2d11be873"
FLOW_ID = "45256a0f-5cb8-4716-977e-1041068497f5"
APPLICATION_TOKEN = "AstraCS:oNGMsltLhausOFQCIZUsicpa:a6c2729991ff01baaf0cd81ee62036ce604f1613c977283d95ccc7502045353d"
ENDPOINT = "verve" # You can set a specific endpoint name in the flow settings

TWEAKS = {
  "ChatInput-LHXvo": {},
  "ParseData-ky5qO": {},
  "Prompt-jTpSM": {},
  "ChatOutput-xmthY": {},
  "AstraDB-Vs39Y": {},
  "GoogleGenerativeAIModel-TNst9": {},
  "AzureOpenAIEmbeddings-kjFM2": {},
  "File-D15VC": {},
  "SplitText-q7NLv": {},
  "AzureOpenAIEmbeddings-Es3Fd": {},
  "AstraDB-SItgZ": {}
}

def run_flow(message: str,
  endpoint: str,
  output_type: str = "chat",
  input_type: str = "chat",
  tweaks: Optional[dict] = None,
  application_token: Optional[str] = None) -> dict:
    """
    Run a flow with a given message and optional tweaks.

    :param message: The message to send to the flow
    :param endpoint: The ID or the endpoint name of the flow
    :param tweaks: Optional tweaks to customize the flow
    :return: The JSON response from the flow
    """
    api_url = f"https://api.langflow.astra.datastax.com/lf/7e6db9b1-c905-4e97-bd57-b3a2d11be873/api/v1/run/45256a0f-5cb8-4716-977e-1041068497f5?stream=false"

    payload = {
        "input_value": message,
        "output_type": output_type,
        "input_type": input_type,
    }
    headers = None
    if tweaks:
        payload["tweaks"] = tweaks
    if application_token:
        headers = {"Authorization": "Bearer " + application_token, "Content-Type": "application/json"}
    response = requests.post(api_url, json=payload, headers=headers)
    return response.json()

def main():
    parser = argparse.ArgumentParser(description="""Run a flow with a given message and optional tweaks.
Run it like: python <your file>.py "your message here" --endpoint "your_endpoint" --tweaks '{"key": "value"}'""",
        formatter_class=RawTextHelpFormatter)
    parser.add_argument("message", type=str, help="The message to send to the flow")
    parser.add_argument("--endpoint", type=str, default=ENDPOINT or FLOW_ID, help="The ID or the endpoint name of the flow")
    parser.add_argument("--tweaks", type=str, help="JSON string representing the tweaks to customize the flow", default=json.dumps(TWEAKS))
    parser.add_argument("--application_token", type=str, default=APPLICATION_TOKEN, help="Application Token for authentication")
    parser.add_argument("--output_type", type=str, default="chat", help="The output type")
    parser.add_argument("--input_type", type=str, default="chat", help="The input type")
    parser.add_argument("--upload_file", type=str, help="Path to the file to upload", default=None)
    parser.add_argument("--components", type=str, help="Components to upload the file to", default=None)

    args = parser.parse_args()
    try:
      tweaks = json.loads(args.tweaks)
    except json.JSONDecodeError:
      raise ValueError("Invalid tweaks JSON string")

    response = run_flow(
        message=args.message,
        endpoint=args.endpoint,
        output_type=args.output_type,
        input_type=args.input_type,
        tweaks=tweaks,
        application_token=args.application_token
    )
    response_message = response["outputs"][0]["outputs"][0]["results"]["message"]["text"]
    print(response_message)

if __name__ == "__main__":
    main()

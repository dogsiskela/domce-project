
import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv('OPENAI_KEY')
gpt_model = "gpt-4o-mini"
role = "user"


client = OpenAI(
    api_key=api_key,
)

total_tokens = 0


def get_location_keys(content):
    global total_tokens

    result = client.chat.completions.create(
        messages=[{"role": role,
                   "content": "Extract only locations from a string, separated by a comma. Example: 'Se izdava namesten 2-soben stan 55m2 vo Aerodrom pozadi T.C Biser, skoro renoviran na 5- ti kat со lift.' returns Aerodrom, T.C Biser. If none return only 'None'. Now do it for:"+content}],
        model=gpt_model,
    )

    total_tokens = total_tokens + result.usage.total_tokens

    return result.choices[0].message.content
import os

from mangum import Mangum
from server import app


OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
MODEL = os.getenv("OPENROUTER_MODEL")
BASE_URL = os.getenv("OPENROUTER_BASE_URL")
# Create the Lambda handler
handler = Mangum(app)
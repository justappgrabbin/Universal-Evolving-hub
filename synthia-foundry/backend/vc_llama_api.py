
from fastapi import FastAPI
from pydantic import BaseModel
from llama_cpp import Llama
import os

app = FastAPI()

model_path = os.getenv("LLAMA_MODEL_PATH", "tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf")
llm = Llama(model_path=model_path, n_ctx=2048, n_threads=8)

class Query(BaseModel):
    prompt: str
    birth_anchor: str | None
    extra_context: str | None

@app.post("/llama/generate")
def generate(query: Query):
    full_prompt = f"[ANCHOR: {query.birth_anchor}]
{query.extra_context or ''}{query.prompt}"
    out = llm(full_prompt, max_tokens=256, stop=["</s>"])
    text = out["choices"][0]["text"].strip()
    return {"response": text}

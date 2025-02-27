from gpt4all import GPT4All
model = GPT4All(model_name="Meta-Llama-3-8B-Instruct.Q4_0.gguf", model_path="/models", device="cpu")
with model.chat_session():
    print(model.generate("How can I run LLMs efficiently on my laptop?", max_tokens=1024))

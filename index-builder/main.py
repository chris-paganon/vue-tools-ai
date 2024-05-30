import os

import qdrant_client
from llama_index.core import Settings
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader  
from llama_index.core import StorageContext
from llama_index.vector_stores.qdrant import QdrantVectorStore
from llama_index.embeddings.together import TogetherEmbedding
# from dotenv import load_dotenv, dotenv_values

# load_dotenv()

docs_index = [
  {
    "path": "vuejs/src/guide",
    "base_url": "https://vuejs.org/guide"
  },
  {
    "path": "vuejs/src/api",
    "base_url": "https://vuejs.org/api"
  },
  {
    "path": "pinia/packages/docs/core-concepts",
    "base_url": "https://pinia.vuejs.org/core-concepts"
  },
  {
    "path": "pinia/packages/docs/api",
    "base_url": "https://pinia.vuejs.org/api"
  },
  {
    "path": "pinia/packages/docs/cookbook",
    "base_url": "https://pinia.vuejs.org/cookbook"
  },
  {
    "path": "router/packages/docs/guide",
    "base_url": "https://router.vuejs.org/guide"
  },
  {
    "path": "router/packages/docs/api",
    "base_url": "https://router.vuejs.org/api"
  }
]

def add_url_meta(file_path):
  for doc_index in docs_index:
    if doc_index['path'] in file_path:
      return {
        "url": doc_index['base_url'] + file_path.split(doc_index['path'])[1]
      }
  return {}

def build_index():
  print("Building index")

  Settings.embed_model = TogetherEmbedding(
    model_name="togethercomputer/m2-bert-80M-2k-retrieval",
    api_key=""
  )

  for doc_index in docs_index:
    print('Building index for', doc_index['path'])
    reader = SimpleDirectoryReader(
      input_dir=doc_index['path'],
      recursive=True,
      file_metadata=add_url_meta
    )
    documents = reader.load_data()

    db_client = qdrant_client.QdrantClient(
      host="vector-db",
      port=6333
    )

    print('Creating vector store')
    vector_store = QdrantVectorStore(
      client=db_client, 
      collection_name="vue-docs"
    )
    storage_context = StorageContext.from_defaults(vector_store=vector_store)

    print('Indexing documents')
    index = VectorStoreIndex.from_documents(
      documents,
      storage_context=storage_context,
    )

build_index()
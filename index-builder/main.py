import os
from dotenv import load_dotenv, dotenv_values

import qdrant_client
from llama_index.core import Settings
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader  
from llama_index.core import StorageContext
from llama_index.vector_stores.qdrant import QdrantVectorStore
from llama_index.embeddings.together import TogetherEmbedding

load_dotenv()

docs_index = [
  {
    "path": "vuejs/src/guide",
    "base_url": "https://vuejs.org/guide",
    "library": "vuejs",
    "library_description": "Main VueJS framework",
    "directory_description": "Main documentation for VueJS"
  },
  {
    "path": "vuejs/src/api",
    "base_url": "https://vuejs.org/api",
    "library": "vuejs",
    "library_description": "Main VueJS framework",
    "directory_description": "VueJS API Reference"
  },
  {
    "path": "pinia/packages/docs/core-concepts",
    "base_url": "https://pinia.vuejs.org/core-concepts",
    "library": "pinia",
    "library_description": "State Management for VueJS",
    "directory_description": "Pinia core concepts main documentation"
  },
  {
    "path": "pinia/packages/docs/api",
    "base_url": "https://pinia.vuejs.org/api",
    "library": "pinia",
    "library_description": "State Management for VueJS",
    "directory_description": "Pinia API Reference"
  },
  {
    "path": "pinia/packages/docs/cookbook",
    "base_url": "https://pinia.vuejs.org/cookbook",
    "library": "pinia",
    "library_description": "State Management for VueJS",
    "directory_description": "Pinia code examples"
  },
  {
    "path": "router/packages/docs/guide",
    "base_url": "https://router.vuejs.org/guide",
    "library": "vue-router",
    "library_description": "Official Router for VueJS",
    "directory_description": "Vue Router main documentation"
  },
  {
    "path": "router/packages/docs/api",
    "base_url": "https://router.vuejs.org/api",
    "library": "vue-router",
    "library_description": "Official Router for VueJS",
    "directory_description": "Vue Router API Reference"
  }
]

def add_url_meta(file_path):
  for doc_index in docs_index:
    if doc_index['path'] in file_path:
      relative_path = file_path.split(doc_index['path'])[1]
      file_extension = relative_path.split('.')[-1]
      relative_url_path = relative_path.replace('.' + file_extension, '')

      return {
        "url": doc_index['base_url'] + relative_url_path,
        "library": doc_index['library'],
        "library_description": doc_index['library_description'],
        "directory_description": doc_index['directory_description'],
      }
  return {}

def build_index():
  print("Initializing index builder")
  db_client = qdrant_client.QdrantClient(
    host="vector-db",
    port=6333
  )

  if db_client.collection_exists("vue-docs"):
    print("Collection already exists, skipping index building")
    return
  
  Settings.embed_model = TogetherEmbedding(
    model_name="togethercomputer/m2-bert-80M-2k-retrieval",
    api_key=os.getenv('NUXT_TOGETHER_API_KEY')
  )

  for doc_index in docs_index:
    print('Building index for', doc_index['path'])
    reader = SimpleDirectoryReader(
      input_dir=doc_index['path'],
      recursive=True,
      file_metadata=add_url_meta
    )
    documents = reader.load_data()

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

    print('Index built successfully for', doc_index['path'])

  print('Full index built successfully')

build_index()
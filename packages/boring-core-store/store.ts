import { openDB, deleteDB, wrap, unwrap, IDBPDatabase } from "idb";
import { BoringDocument, BoringDocumentId } from "@boring.so/document-model";

/*no-export*/ const _document_store_db_v = 1;
/*no-export*/ const _document_store_db_n = "documents";
/*no-export*/ const _boring_documents_store_name = "boring.so/documents";
/*no-export*/ const boring_document_store_name = (id: string) =>
  `boring.so/documents/${id}`;
export class BoringDocumentsStore {
  private _db: IDBPDatabase;
  async db(): Promise<IDBPDatabase> {
    if (this._db) {
      return this._db;
    }
    return await this.prewarm();
  }

  constructor() {
    this.prewarm();
  }

  async prewarm(): Promise<IDBPDatabase> {
    this._db = await openDB(_document_store_db_n, _document_store_db_v, {
      upgrade(db) {
        const store = db.createObjectStore(_boring_documents_store_name, {
          keyPath: "id",
        });
      },
    });
    return this._db;
  }

  async get(id: string): Promise<BoringDocument> {
    return await (await this.db()).get(_boring_documents_store_name, id);
  }

  async set(doc: BoringDocument) {
    await (await this.db()).add(_boring_documents_store_name, doc);
  }

  async put(doc: BoringDocument) {
    await (await this.db()).put(_boring_documents_store_name, doc);
  }
}

export class BoringDocumentStore {
  private readonly unique_storename;
  readonly service: BoringDocumentsStore;
  constructor(readonly id: string) {
    this.unique_storename = boring_document_store_name(id);
    this.service = new BoringDocumentsStore();
  }

  async get() {
    return this.service.get(this.id);
  }

  async put(doc: BoringDocument, id?: BoringDocumentId) {
    if (!doc.id && id) {
      doc.id = id;
    }
    return this.service.put(doc);
  }
}

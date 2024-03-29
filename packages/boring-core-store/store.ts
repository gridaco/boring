import { openDB, deleteDB, wrap, unwrap, IDBPDatabase } from "idb";
import {
  BoringContent,
  BoringDocument,
  BoringDocumentId,
} from "@boring.so/document-model";

/*no-export*/ const _document_store_db_v = 1;
/*no-export*/ const _document_store_db_n = "documents";
/*no-export*/ const _boring_documents_store_name = "boring.so/documents";
/*no-export*/ const boring_document_store_name = (id: string) =>
  `boring.so/documents/${id}`;
export class BoringDocumentsStore {
  private _db: IDBPDatabase;
  private readonly tmpstore = new Map<string, BoringDocument>();
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
    if (typeof indexedDB === "undefined") {
      return;
    }

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
    try {
      return this.tmpstore.has(id)
        ? this.tmpstore.get(id)
        : await (await this.db()).get(_boring_documents_store_name, id);
    } catch (e) {}
  }

  async set(doc: BoringDocument) {
    try {
      this.tmpstore.set(doc.id, doc);
      await (await this.db()).add(_boring_documents_store_name, doc);
      this.tmpstore.delete(doc.id);
    } catch (e) {}
  }

  async put(doc: BoringDocument) {
    try {
      await (await this.db()).put(_boring_documents_store_name, doc);
    } catch (e) {}
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
    const doc = await this.service.get(this.id);
    return doc;
  }

  async put(doc: BoringDocument, id?: BoringDocumentId) {
    if (!doc.id && id) {
      doc.id = id;
    }
    return this.service.put(doc);
  }

  async updateContent(content: string) {
    try {
      const beforeupdate = await this.get();
      beforeupdate.content = new BoringContent(content);
      /*no-await (no need to await)*/ this.put(beforeupdate);
      return beforeupdate;
    } catch (e) {}
  }
}

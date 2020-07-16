import firebase from "firebase/app";
import storage from "./async-storage";

export default class GenericStorage {
  private storagePath: string;

  constructor(storagePath: string) {
    if (!storagePath) {
      throw new Error("GenericStorage initialised without a path");
    }
    this.storagePath = storagePath;
  }

  /**
   * Upload a file or blob to Cloud Storage
   * @param file
   * @param id
   */
  async create(file: File | Blob | null, id: any = String(+new Date())) {
    if (file === null) {
      return;
    }
    const fileRef = (await storage())
      .ref()
      .child(this.storagePath)
      .child(`${id}`);
    const snapshot:
      | firebase.storage.UploadTaskSnapshot
      | undefined = await fileRef.put(file);
    return {
      snapshot,
      imageUrl: await fileRef.getDownloadURL(),
      imageName: fileRef.name,
      //   createTimestamp: new Date(),
      //   updateTimestamp: new Date()
    };
  }

  /**
   * Delete an object from Cloud Storage
   * @param imageName
   */
  async delete(imageName: string) {
    const fileRef = (await storage())
      .ref()
      .child(this.storagePath)
      .child(`${imageName}`);
    const response = await fileRef.delete();
    console.log({ response });
    return {
      response,
    };
  }
}

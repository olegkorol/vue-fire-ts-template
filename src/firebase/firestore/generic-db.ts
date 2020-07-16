import { isNil, keys, cloneDeep } from "lodash";
import firebase from "firebase/app";

import firestore from "./async-firestore";

interface Constraint {
  fieldPath: string | firebase.firestore.FieldPath;
  opStr: firebase.firestore.WhereFilterOp;
  value: any;
}

export default class GenericDB {
  collectionPath: string;

  constructor(collectionPath: string) {
    this.collectionPath = collectionPath;
  }

  /**
   * Create a document in the collection
   * @param data
   * @param id
   */
  async create(data: any, id: any = null) {
    const collectionRef = (await firestore()).collection(this.collectionPath);
    const timestamp = String((+new Date() / 1000).toFixed()); // dates as UNIX ts in seconds

    const dataToCreate = {
      ...data,
      createTimestamp: timestamp,
      updateTimestamp: timestamp
    };

    const createPromise = isNil(id)
      ? // Create doc with generated id
        collectionRef.add(dataToCreate).then((doc: any) => doc.id)
      : // Create doc with custom id
        collectionRef
          .doc(id)
          .set(dataToCreate)
          .then(() => id);

    const docId = await createPromise;

    return {
      id: docId,
      ...data,
      createTimestamp: new Date(),
      updateTimestamp: new Date()
    };
  }

  /**
   * Read a document in the collection
   * @param id
   */
  async read(id: any) {
    const result = await (await firestore())
      .collection(this.collectionPath)
      .doc(id)
      .get();

    const data = result.exists ? result.data() : null;

    if (isNil(data)) return null;

    this.convertObjectTimestampPropertiesToDate(data);
    return { id, ...data };
  }

  /**
   * Read all documents in the collection following constraints
   * @param constraints
   */
  async readAll(constraints: Constraint[] | null = null) {
    const collectionRef = (await firestore()).collection(this.collectionPath);
    let query: any = collectionRef;

    if (constraints) {
      constraints.forEach((constraint: Constraint) => {
        const { fieldPath, opStr, value } = constraint;
        query = query.where(fieldPath, opStr, value);
      });
    }

    const formatResult = (result: any) =>
      result.docs.map((ref: any) =>
        this.convertObjectTimestampPropertiesToDate({
          id: ref.id,
          ...ref.data()
        })
      );

    return query.get().then(formatResult);
  }

  /**
   * Update a document in the collection
   * @param data
   */
  async update(data: any) {
    const { id } = data;
    const clonedData = cloneDeep(data);
    delete clonedData.id;

    await (await firestore())
      .collection(this.collectionPath)
      .doc(id)
      .update({
        ...clonedData,
        updateTimestamp: String((+new Date() / 1000).toFixed())
      });

    return id;
  }

  /**
   * Delete a document in the collection
   * @param id
   */
  async delete(id: any) {
    return (await firestore())
      .collection(this.collectionPath)
      .doc(id)
      .delete();
  }

  /**
   * Convert all object Timestamp properties to date
   * @param obj
   */
  convertObjectTimestampPropertiesToDate(obj: any) {
    const newObj: any = {};

    keys(obj)
      .filter(prop => obj[prop] instanceof Object)
      .forEach(prop => {
        if (obj[prop] instanceof firebase.firestore.Timestamp) {
          newObj[prop] = obj[prop].toDate();
        } else {
          this.convertObjectTimestampPropertiesToDate(obj[prop]);
        }
      });

    return {
      ...obj,
      ...newObj
    };
  }
}

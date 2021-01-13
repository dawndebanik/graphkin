import {Models} from "../constants";

export type Metadata = {
  modelName: Models;
  id: number;
  type?: string;
  data: unknown;
};

export default interface MetadataGenerable {
  /**
   * Generate metadata of the entity.
   * @returns: metadata of the entity.
   */
  metadata(): Metadata;
}

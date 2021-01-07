import { Models } from "../constants";

export type Metadata = {
  type: Models;
  id: number;
  data: unknown;
};

export default interface MetadataGenerable {
  /**
   * Generate metadata of the entity.
   * @returns: metadata of the entity.
   */
  metadata(): Metadata;
}

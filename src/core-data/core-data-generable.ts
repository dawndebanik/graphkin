import { Models } from "../constants";

export type CoreData = {
  type: Models.NODE | Models.RELATIONSHIP;
  id: number;
  data: unknown;
};

export default interface CoreDataGenerable {
  /**
   * Get the core data stored inside the entity.
   * @returns: core data that is stored inside the entity.
   */
  coreData(): CoreData;
}

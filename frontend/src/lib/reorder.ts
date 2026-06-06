import { arrayMove } from "@dnd-kit/sortable";

/**
 * Reordena el subconjunto visible (`filtered`) moviendo `activeId` a la posición
 * de `overId`, y devuelve el orden COMPLETO de ids manteniendo en su sitio los
 * elementos que no están en la vista filtrada.
 */
export function reorderWithinFiltered<T extends { id: string }>(
  full: T[],
  filtered: T[],
  activeId: string,
  overId: string,
): string[] {
  const fIds = filtered.map((f) => f.id);
  const oldIdx = fIds.indexOf(activeId);
  const newIdx = fIds.indexOf(overId);
  if (oldIdx < 0 || newIdx < 0) return full.map((f) => f.id);
  const newFilteredIds = arrayMove(fIds, oldIdx, newIdx);
  const filteredSet = new Set(fIds);
  let k = 0;
  return full.map((item) => (filteredSet.has(item.id) ? newFilteredIds[k++] : item.id));
}

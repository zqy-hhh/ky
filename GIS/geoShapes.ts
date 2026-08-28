import { BufferGeometry, Path, Shape, Vector3, type Vector2 } from "three";

export type ProjectedPolygon = Vector2[][];

export function createGeoShapes(polygons: ProjectedPolygon[]) {
  return polygons.flatMap((rings) => {
    const [outerRing, ...holeRings] = rings;
    if (!outerRing || outerRing.length < 3) return [];

    const shape = new Shape(outerRing);
    shape.holes = holeRings
      .filter((ring) => ring.length >= 3)
      .map((ring) => new Path(ring));

    return [shape];
  });
}

export function createGeoOutlineGeometry(polygons: ProjectedPolygon[]) {
  const segments: Vector3[] = [];

  polygons.forEach((rings) => {
    rings.forEach((ring) => {
      for (let index = 0; index < ring.length; index += 1) {
        const current = ring[index];
        const next = ring[(index + 1) % ring.length];
        if (!current || !next || current.equals(next)) continue;

        segments.push(
          new Vector3(current.x, current.y, 0),
          new Vector3(next.x, next.y, 0)
        );
      }
    });
  });

  return new BufferGeometry().setFromPoints(segments);
}

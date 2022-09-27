export class SortService {
  public static mapOrder<T>(array: T[], sortOrder: string[], key: keyof T) {
    array.sort((a, b) => {
      return (
        sortOrder.indexOf(a[key as string]) -
        sortOrder.indexOf(b[key as string])
      );
    });
    return array;
  }
}

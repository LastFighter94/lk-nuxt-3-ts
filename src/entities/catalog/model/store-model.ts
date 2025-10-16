export enum categoryNames {
  wine = 'Вино',
  products = 'Продукты',
  teaAndCoffee = 'Чай и кофе',
}

// модели описываем в отдельном файле model.ts
export interface IState {
  categoryName:
    | categoryNames.wine
    | categoryNames.products
    | categoryNames.teaAndCoffee;
  categoryProductsNumber: number;
  isShowMobilePopupOptions: boolean;
  mobilePopupOptions: { value: string; label: string }[];
  mobilePopupOptionsName: string;
  isProductsGridDisplay: boolean;
}

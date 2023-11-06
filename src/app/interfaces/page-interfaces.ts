export interface Inavs{
    href    :string,
    label   :string,
    active  : boolean
}


export interface OrderResponse {
    message: string;
    order: {
      customer: string;
      FullName: string;
      ZipCode: string;
      City: string;
      Country: string;
      emailTo: string;
      products: {
        product: string;
        quantity: number;
        _id: string;
      }[];
      totalAmount: number;
      status: boolean;
      _id: string;
      orderDate: string;
      __v: number;
    };
  }
  
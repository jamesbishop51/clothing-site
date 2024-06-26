type Size = {
  Id: number;
  Size: string;
  InStock: number;
  ColourId: number;
};

type Colour = {
  Id: number;
  Name: string;
  Image: string;
  ProductId: number;
  Size: Size[];
};

type Product = {
  Id: number;
  code: string;
  Name: string;
  Description: string;
  Price: number;
  Colours: Colour[];
};

type CartItem = {
  product: Product;
  colour: Colour;
  size: Size;
  quantity: number;
};

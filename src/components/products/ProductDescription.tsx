import { Box } from "@material-ui/core";
import React from "react";

export interface ProductDescriptionProps {
  discription: string;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({
  discription,
}) => {
  return <Box dangerouslySetInnerHTML={{ __html: discription }}></Box>;
};

export default ProductDescription;

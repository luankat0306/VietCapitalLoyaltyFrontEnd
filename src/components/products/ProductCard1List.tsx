import FlexBox from '@component/FlexBox'
import ModalLayMa from '@component/modals/ModalLayMa'
import ProductCard1 from '@component/product-cards/ProductCard1'
import { Grid, Pagination, Skeleton } from '@material-ui/core'
import React, { useState } from 'react'
import { Product } from '_types/Product'

const numPage = (totalItemsCount: any, numberOfItemsPerPage: any) => {
  return Math.floor(
    (totalItemsCount + numberOfItemsPerPage - 1) / numberOfItemsPerPage
  )
}

// function paginate(array: any[], page_size: any, page_number: any) {
//   // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
//   return array.slice((page_number - 1) * page_size, page_number * page_size)
// }
export interface ProductCard1ListProps {
  productDatabase?: Product[]
  count: number
  // page: number
  loading: boolean
  onPageChange: any
}

const ProductCard1List: React.FC<ProductCard1ListProps> = ({
  productDatabase,
  count,
  loading,
  // page,
  onPageChange,
}) => {
  const [openLayMa, setOpenLayMa] = useState(false)
  const [sanPham, setSanPham] = useState<Product>()

  const [page, setPage] = useState(1)
  // const handlePageChange = () => {
  //   onPageChange(limit + 6)
  // }

  const handleClickOpenLayMa = async (sanPham: Product) => {
    setSanPham(sanPham)
    setOpenLayMa(true)
  }

  // const [openXemMa, setOpenXemMa] = useState(false)
  // const [donHang, setDonHang] = useState<Bill>()
  // const handleClickOpenXemMa = (item: any) => {
  //   setOpenXemMa(true)
  //   setDonHang(item)
  // }

  return (
    <div>
      <Grid container spacing={3}>
        {loading
          ? [...Array(6).keys()].map((_, index) => (
              <Grid item lg={4} sm={6} xs={12} key={index}>
                <Skeleton variant="rectangular" width="265px" height="274px" />
              </Grid>
            ))
          : Array.isArray(productDatabase) &&
            productDatabase?.map((item, ind) => (
              <Grid item lg={4} sm={6} xs={12} key={ind}>
                <ProductCard1
                  id={item.id}
                  imgUrl={item?.image}
                  title={item.title || ''}
                  price={item.price || '0'}
                  layMaNgay={() => handleClickOpenLayMa(item)}
                />
              </Grid>
            ))}
      </Grid>

      <FlexBox flexWrap="wrap" justifyContent="flex-end" alignItems="center" mt={4}>
        {/* {count !== productDatabase?.length && (
          <LoadingButton
            onClick={handlePageChange}
            loading={loading}
            loadingIndicator="Loading..."
            variant="outlined"
            color="primary"
            size="small"
          >
            Xem thêm
          </LoadingButton>
        )} */}

        {/* <Span color="grey.600">Showing 1-9 of 1.3k Products</Span> */}
        <Pagination
          count={numPage(count, 6)}
          defaultPage={1}
          page={page}
          onChange={(e, page) => {
            setPage(page)
            onPageChange(e, page)
          }}
          variant="outlined"
          color="primary"
        />
      </FlexBox>
      {openLayMa && sanPham && (
        <ModalLayMa open={openLayMa} setOpen={setOpenLayMa} sanPham={sanPham} />
      )}
      {/* {openXemMa && donHang && (
        <ModalXemMa open={openXemMa} setOpen={setOpenXemMa} donHang={donHang} />
      )} */}
    </div>
  )
}

export default ProductCard1List

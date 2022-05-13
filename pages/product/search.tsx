import FlexBox from '@component/FlexBox'
import NavbarLayout from '@component/layout/NavbarLayout'
import ProductCard1List from '@component/products/ProductCard1List'
import ProductFilterCard from '@component/products/ProductFilterCard'
import { H5, Paragraph } from '@component/Typography'
import { Card, Grid, MenuItem, TextField } from '@material-ui/core'
import { Box } from '@material-ui/system'
import { useProducts } from 'hooks/product/useProducts'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const ProductSearchResult = () => {
  // const [view, setView] = useState('grid')
  // const width = useWindowSize()
  // const isTablet = width < 1024

  const router = useRouter()
  // const { sanPhams } = useTimKiemSanPham(router.query.tenSanPham)
  const tenSanPham = router.query.tenSanPham
  // const danhMuc = router.query.danhMuc
  const [start, setStart] = useState(0)
  // const [limit, setLimit] = useState(3)
  const {
    sanPhams: products,
    count,
    isLoading,
  } = useProducts({
    _start: start,
    _limit: 6,
    search: tenSanPham,
  })
  // const [products, setProducts] = useState<Product[]>([])
  // useEffect(() => {
  //   setProducts(sanPhams)
  // }, [sanPhams])
  // const toggleView = useCallback(
  //   (v) => () => {
  //     setView(v)
  //   },
  //   []
  // )

  return (
    <NavbarLayout>
      <Box pt={2.5}>
        <Card
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: '55px',
            p: {
              xs: '1.25rem 1.25rem 0.25rem',
              sm: '1rem 1.25rem',
              md: '0.5rem 1.25rem',
            },
          }}
          elevation={1}
        >
          <div>
            <H5>{`Tìm kiếm “ ${router.query.tenSanPham} ”`}</H5>
            <Paragraph color="grey.600">
              {Array.isArray(products) ? products.length : 0} Kết quả được tìm thấy
            </Paragraph>
          </div>
          <FlexBox alignItems="center" flexWrap="wrap" my="0.5rem">
            <FlexBox alignItems="center" flex="1 1 0">
              <Paragraph color="grey.600" mr={2} whiteSpace="pre">
                Lọc theo:
              </Paragraph>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Short by"
                select
                defaultValue={sortOptions[0].value}
                fullWidth
                sx={{
                  flex: '1 1 0',
                  mr: '1.75rem',
                  minWidth: '150px',
                }}
              >
                {sortOptions.map((item) => (
                  <MenuItem value={item.value} key={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
            </FlexBox>

            {/* <FlexBox alignItems="center" my="0.25rem">
              <Paragraph color="grey.600" mr={1}>
                View:
              </Paragraph>
              <IconButton onClick={toggleView("grid")}>
                <Apps
                  color={view === "grid" ? "primary" : "inherit"}
                  fontSize="small"
                />
              </IconButton>
              <IconButton onClick={toggleView("list")}>
                <ViewList
                  color={view === "list" ? "primary" : "inherit"}
                  fontSize="small"
                />
              </IconButton>

              {!!isTablet && (
                <Sidenav
                  handle={
                    <IconButton>
                      <FilterList fontSize="small" />
                    </IconButton>
                  }
                >
                  <ProductFilterCard />
                </Sidenav>
              )}
            </FlexBox> */}
          </FlexBox>
        </Card>

        <Grid container spacing={3}>
          <Grid
            item
            lg={3}
            xs={12}
            sx={{
              '@media only screen and (max-width: 1024px)': {
                display: 'none',
              },
            }}
          >
            <ProductFilterCard />
          </Grid>

          <Grid item lg={9} xs={12}>
            {/* {view === 'grid' ? ( */}
            <ProductCard1List
              productDatabase={products}
              count={count}
              loading={isLoading}
              // page={page}
              onPageChange={(_: any, page: any) => {
                setStart((page - 1) * 6)
                // setLimit(limit)
              }}
            />
            {/* ) : (
              <ProductCard9List />
            )} */}
          </Grid>
        </Grid>
      </Box>
    </NavbarLayout>
  )
}

const sortOptions = [
  { label: 'Liên quan', value: 'Liên quan' },
  { label: 'Thời gian', value: 'Thời gian' },
  { label: 'Giá từ Thấp đến Cao', value: 'Giá từ Thấp đến Cao' },
  { label: 'Giá từ Cao đến Thấp', value: 'Giá từ Cao đến Thấp' },
]

export default ProductSearchResult

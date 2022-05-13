import BazarMenu from '@component/BazarMenu'
import FlexBox from '@component/FlexBox'
import { useCategories } from '@hook/category/useCategories'
import { useTimKiemSanPham } from '@hook/product/useTimKiemSanPham'
import { Box, Card, MenuItem, TextField } from '@material-ui/core'
import TouchRipple from '@material-ui/core/ButtonBase'
import { styled } from '@material-ui/core/styles'
import { debounce } from '@material-ui/core/utils'
import KeyboardArrowDownOutlined from '@material-ui/icons/KeyboardArrowDownOutlined'
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import { useRouter } from 'next/router'
import queryString from 'query-string'
import React, { FC, useCallback, useEffect, useRef, useState } from 'react'

// styled components
// also used in the GrocerySearchBox component
export const SearchOutlinedIcon = styled(SearchOutlined)(({ theme }) => ({
  color: theme.palette.grey[600],
  marginRight: 6,
}))

// also used in the GrocerySearchBox component
export const SearchResultCard = styled(Card)(() => ({
  position: 'absolute',
  top: '100%',
  paddingTop: '0.5rem',
  paddingBottom: '0.5rem',
  width: '100%',
  zIndex: 99,
}))

const DropDownHandler = styled(FlexBox)(({ theme }) => ({
  borderTopRightRadius: 300,
  borderBottomRightRadius: 300,
  whiteSpace: 'pre',
  borderLeft: `1px solid ${theme.palette.text.disabled}`,
  [theme.breakpoints.down('xs')]: {
    display: 'none',
  },
}))

const SearchBox: FC = () => {
  const router = useRouter()
  const [category, setCategory] = useState('Chọn danh mục')
  const { categories } = useCategories()
  const [resultList, setResultList] = useState<any[]>([])
  const parentRef = useRef()
  const [value, setValue] = useState()
  const { sanPhams } = useTimKiemSanPham(value)
  const handleCategoryChange = (cat: any) => () => {
    setCategory(cat)
  }

  const search = debounce((e) => {
    const value = e.target?.value
    if (!value) setResultList([])
    setValue(value)
  }, 200)

  const hanldeSearch = useCallback((event) => {
    event.persist()
    search(event)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDocumentClick = () => {
    setResultList([])
  }

  useEffect(() => {
    if (!sanPhams) setResultList([])
    else
      setResultList(
        sanPhams?.filter((_, index) => index <= 10)?.map((item) => item?.title) || []
      )
  }, [sanPhams])

  useEffect(() => {
    window.addEventListener('click', handleDocumentClick)
    return () => {
      window.removeEventListener('click', handleDocumentClick)
    }
  }, [])

  const categoryDropdown = (
    <BazarMenu
      direction="left"
      handler={
        <DropDownHandler
          alignItems="center"
          bgcolor="grey.100"
          height="100%"
          px={3}
          color="grey.700"
          component={TouchRipple}
        >
          <Box mr={0.5}>{category}</Box>
          <KeyboardArrowDownOutlined fontSize="small" color="inherit" />
        </DropDownHandler>
      }
    >
      {categories ? (
        categories.map((item, index) => (
          <MenuItem key={index} onClick={handleCategoryChange(item?.title)}>
            {item?.title}
          </MenuItem>
        ))
      ) : (
        <div></div>
      )}
    </BazarMenu>
  )

  return (
    <Box
      position="relative"
      flex="1 1 0"
      maxWidth="670px"
      mx="auto"
      {...{ ref: parentRef }}
    >
      <TextField
        variant="outlined"
        placeholder="Nhập voucher cần tìm..."
        fullWidth
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            const query = queryString.stringify({
              tenSanPham: value,
              danhMuc: category === 'Chọn danh mục' ? undefined : category,
            })
            router.push(`/product/search?${query}`)
          }
        }}
        onChange={hanldeSearch}
        InputProps={{
          sx: {
            height: 44,
            borderRadius: 300,
            paddingRight: 0,
            color: 'grey.700',
            overflow: 'hidden',
          },
          endAdornment: categoryDropdown,
          startAdornment: <SearchOutlinedIcon fontSize="small" />,
        }}
      />

      {!!resultList.length && (
        <SearchResultCard elevation={2}>
          {resultList.map((item) => (
            <MenuItem
              onClick={() =>
                router.push({
                  pathname: '/product/search',
                  query: {
                    tenSanPham: item,
                    danhMuc: category === 'Chọn danh mục' ? undefined : category,
                  },
                })
              }
              key={item}
            >
              {item}
            </MenuItem>
          ))}
        </SearchResultCard>
      )}
    </Box>
  )
}

export default SearchBox

import BazarButton from '@component/BazarButton'
import { Box, debounce, MenuItem, TextField } from '@material-ui/core'
import Link from 'next/link'
import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { SearchOutlinedIcon, SearchResultCard } from './SearchBox'

const GrocerySearchBox: FC = () => {
  const [resultList, setResultList] = useState<string[]>([])
  const parentRef = useRef()

  const search = debounce((e) => {
    const value = e.target?.value

    if (!value) setResultList([])
    else setResultList(dummySearchResult)
  }, 200)

  const hanldeSearch = useCallback((event) => {
    event.persist()
    search(event)
  }, [])

  const handleDocumentClick = () => {
    setResultList([])
  }

  useEffect(() => {
    window.addEventListener('click', handleDocumentClick)
    return () => {
      window.removeEventListener('click', handleDocumentClick)
    }
  }, [])

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
        placeholder="Searching for..."
        fullWidth
        onChange={hanldeSearch}
        InputProps={{
          sx: {
            height: 44,
            borderRadius: 300,
            paddingRight: 0,
            color: 'grey.700',
            overflow: 'hidden',
          },
          endAdornment: (
            <BazarButton
              color="primary"
              variant="contained"
              disableElevation
              sx={{
                px: '3rem',
                height: '100%',
                borderRadius: '0 300px 300px 0',
              }}
            >
              Search
            </BazarButton>
          ),
          startAdornment: <SearchOutlinedIcon fontSize="small" />,
        }}
      />

      {!!resultList.length && (
        <SearchResultCard elevation={2}>
          {resultList.map((item) => (
            <Link href={`/product/search/${item}`} key={item}>
              <MenuItem key={item}>{item}</MenuItem>
            </Link>
          ))}
        </SearchResultCard>
      )}
    </Box>
  )
}

const dummySearchResult = [
  'Macbook Air 13',
  'Asus K555LA',
  'Acer Aspire X453',
  'iPad Mini 3',
]

export default GrocerySearchBox

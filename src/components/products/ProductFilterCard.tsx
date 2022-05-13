import FlexBox from '@component/FlexBox'
import { H5, H6, Paragraph } from '@component/Typography'
import { useCategories } from '@hook/category/useCategories'
import { Card, Divider, TextField } from '@material-ui/core'
import { useRouter } from 'next/router'
import React from 'react'

const ProductFilterCard = () => {
  const { categories: categroyList } = useCategories()
  const router = useRouter()

  const tenSanPham = router.query.tenSanPham
  const danhMuc = router.query.danhMuc

  return (
    <Card sx={{ p: '18px 27px', overflow: 'auto' }} elevation={1}>
      <H6 mb={1.25}>Danh mục</H6>

      {categroyList?.map(
        (item) => (
          // item.subCategories ? (
          //   <Accordion key={item.title} expanded>
          //     <AccordionHeader px={0} py={0.75} color="grey.600">
          //       <Span sx={{ cursor: "pointer", mr: "9px" }}>{item.title}</Span>
          //     </AccordionHeader>
          //     {item.subCategories.map((name) => (
          //       <Paragraph
          //         fontSize="14px"
          //         color="grey.600"
          //         pl="22px"
          //         py={0.75}
          //         key={name}
          //         sx={{ cursor: "pointer" }}
          //       >
          //         {name}
          //       </Paragraph>
          //     ))}
          //   </Accordion>
          // ) : (
          <Paragraph
            sx={{
              cursor: 'pointer',
              color:
                Array.isArray(danhMuc) ||
                danhMuc?.split('+').join(' ') === item?.title
                  ? '#D23F57'
                  : 'grey.600',
            }}
            className="cursor-pointer"
            fontSize="14px"
            py={0.75}
            onClick={() =>
              router.push('/product/search', {
                query: {
                  tenSanPham,
                  danhMuc: item?.title,
                },
              })
            }
            key={item?.title}
          >
            {item?.title}
          </Paragraph>
        )
        // )
      )}

      <Divider sx={{ mt: '18px', mb: '24px' }} />

      <H6 mb={2}>Điểm</H6>
      <FlexBox justifyContent="space-between" alignItems="center">
        <TextField placeholder="0" type="number" size="small" fullWidth />
        <H5 color="grey.600" px={1}>
          -
        </H5>
        <TextField placeholder="250" type="number" size="small" fullWidth />
      </FlexBox>

      {/* <Divider sx={{ my: '1.5rem' }} />

      <H6 mb={2}>Brands</H6>
      {brandList.map((item) => (
        <FormControlLabel
          control={<Checkbox size="small" color="secondary" />}
          label={<Span color="inherit">{item}</Span>}
          sx={{ display: 'flex' }}
          key={item}
        />
      ))} */}

      {/* <Divider sx={{ my: '1.5rem' }} />

      <H6 mb={2}>Ratings</H6>
      {[5, 4, 3, 2, 1].map((item) => (
        <FormControlLabel
          control={<Checkbox size="small" color="secondary" />}
          label={<Rating size="small" value={item} color="warn" readOnly />}
          sx={{ display: 'flex' }}
          key={item}
        />
      ))} */}

      {/* <Divider sx={{ my: '1.5rem' }} />

      <H6 mb={2}>Colors</H6>
      <FlexBox mb={2}>
        {colorList.map((item) => (
          <Box
            sx={{
              bgcolor: item,
              height: '25px',
              width: '25px',
              mr: '10px',
              borderRadius: 300,
              cursor: 'pointer',
            }}
            key={item}
          />
        ))}
      </FlexBox> */}
    </Card>
  )
}

// const categroyList = [
//   {
//     title: "Bath Preparations",
//     subCategories: ["Bubble Bath", "Bath Capsules", "Others"],
//   },
//   {
//     title: "Eye Makeup Preparations",
//   },
//   {
//     title: "Fragrance",
//   },
//   {
//     title: "Hair Preparations",
//   },
// ];

// const brandList = ['Maccs', 'Karts', 'Baars', 'Bukks', 'Luasis']
// const otherOptions = ['On Sale', 'In Stock', 'Featured']
// const colorList = ['#1C1C1C', '#FF7A7A', '#FFC672', '#84FFB5', '#70F6FF', '#6B7AFF']

export default ProductFilterCard

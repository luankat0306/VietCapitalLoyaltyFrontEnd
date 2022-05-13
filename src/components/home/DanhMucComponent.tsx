import BazarCard from '@component/BazarCard'
import Category from '@component/icons/Category'
import LazyImage from '@component/LazyImage'
import { Box, Container, Grid, styled } from '@material-ui/core'
import { fromImageToURL } from '@utils/urls'
import Link from 'next/link'
import React, { FC } from 'react'
import CategorySectionHeader from '../CategorySectionHeader'

const StyledBazarCard = styled(BazarCard)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '0.75rem',
  borderRadius: 8,
  transition: 'all 250ms ease-in-out',
  '&:hover': {
    boxShadow: theme.shadows[3],
  },
}))

interface DanhMucComponentProps {
  danhMucs: any[]
}
const DanhMucComponent: FC<DanhMucComponentProps> = ({ danhMucs }) => {
  return (
    <Container sx={{ mb: '70px' }}>
      <CategorySectionHeader title="Danh mục" icon={<Category color="primary" />} />

      <Grid container spacing={3}>
        {danhMucs.map((item, ind) => {
          return (
            <Grid item lg={2} md={3} sm={4} xs={12} key={ind}>
              <Link href={`/product/search?danhMuc=${item.id}`}>
                <a>
                  <StyledBazarCard elevation={1}>
                    <LazyImage
                      src={fromImageToURL(item?.anhDanhMuc?.[0]?.url)}
                      alt="fashion"
                      height={52}
                      width={52}
                      objectFit="contain"
                      borderRadius="8px"
                    />
                    <Box fontWeight="600" ml={1.25}>
                      {item?.tenDanhMuc}
                    </Box>
                  </StyledBazarCard>
                </a>
              </Link>
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}

export default DanhMucComponent

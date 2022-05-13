import Card1 from '@component/Card1'
import FlexBox from '@component/FlexBox'
import CustomerDashboardLayout from '@component/layout/CustomerDashboardLayout'
import CustomerDashboardNavigation from '@component/layout/CustomerDashboardNavigation'
import DashboardPageHeader from '@component/layout/DashboardPageHeader'
import {
  Avatar,
  Button,
  Grid,
  TextField,
  FormLabel,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core'

import CameraEnhance from '@material-ui/icons/CameraEnhance'
import Person from '@material-ui/icons/Person'
import AdapterDateFns from '@material-ui/lab/AdapterDateFns'
import DesktopDatePicker from '@material-ui/lab/DesktopDatePicker'
import LocalizationProvider from '@material-ui/lab/LocalizationProvider'
import { Box } from '@material-ui/system'
import { Formik } from 'formik'
import Link from 'next/link'
import React, { useState } from 'react'
import * as yup from 'yup'

const ProfileEditor = () => {
  const handleFormSubmit = async (values: any) => {
    console.log(values)
  }

  const [valueGender, setValueGender] = useState('Nam')

  const handleChangeGender = (event: any) => {
    setValueGender(event.target.value)
  }

  return (
    <CustomerDashboardLayout>
      <DashboardPageHeader
        icon={Person}
        title="Chỉnh sửa thông tin cá nhân"
        button={
          <Link href="/tai-khoan">
            <Button color="primary" sx={{ px: '2rem', bgcolor: 'primary.light' }}>
              Trang cá nhân
            </Button>
          </Link>
        }
        navigation={<CustomerDashboardNavigation />}
      />

      <Card1>
        <FlexBox alignItems="flex-end" mb={3}>
          <Avatar
            src="/assets/images/faces/ralph.png"
            sx={{ height: 64, width: 64 }}
          />

          <Box ml={-2.5}>
            <label htmlFor="profile-image">
              <Button
                component="span"
                color="secondary"
                sx={{
                  bgcolor: 'grey.300',
                  height: 'auto',
                  p: '8px',
                  borderRadius: '50%',
                }}
              >
                <CameraEnhance fontSize="small" />
              </Button>
            </label>
          </Box>
          <Box display="none">
            <input
              onChange={(e) => console.log(e.target.files)}
              id="profile-image"
              accept="image/*"
              type="file"
            />
          </Box>
        </FlexBox>

        <Formik
          initialValues={initialValues}
          validationSchema={checkoutSchema}
          onSubmit={handleFormSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box mb={4}>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          name="full_name"
                          label="Họ và tên"
                          disabled
                          fullWidth
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.full_name || ''}
                          error={!!touched.full_name && !!errors.full_name}
                          helperText={touched.full_name && errors.full_name}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          name="phoneNumber"
                          label="Số điện thoại"
                          fullWidth
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.phoneNumber || ''}
                          error={!!touched.phoneNumber && !!errors.phoneNumber}
                          helperText={touched.phoneNumber && errors.phoneNumber}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          name="email"
                          type="email"
                          label="Email"
                          fullWidth
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.email || ''}
                          error={!!touched.email && !!errors.email}
                          helperText={touched.email && errors.email}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DesktopDatePicker
                            label="Birth Date"
                            value={values.birth_date}
                            maxDate={new Date()}
                            inputFormat="dd/MM/yyyy"
                            renderInput={(props) => (
                              <TextField
                                size="small"
                                fullWidth
                                {...props}
                                error={
                                  (!!touched.birth_date && !!errors.birth_date) ||
                                  props.error
                                }
                                helperText={touched.birth_date && errors.birth_date}
                              />
                            )}
                            onChange={(newValue) =>
                              setFieldValue('birth_date', newValue)
                            }
                          />
                        </LocalizationProvider>
                      </Grid>

                      <Grid item xs={12}>
                        <FormControl component="fieldset">
                          <FormLabel component="legend">Giới tính</FormLabel>
                          <RadioGroup
                            aria-label="gender"
                            name="gender1"
                            value={valueGender}
                            onChange={handleChangeGender}
                          >
                            <Grid container>
                              <FormControlLabel
                                value="Nam"
                                control={<Radio />}
                                label="Nam"
                              />
                              <FormControlLabel
                                value="Nữ"
                                control={<Radio />}
                                label="Nữ"
                              />
                            </Grid>
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          name="delivery_address"
                          label="Địa chỉ giao hàng (mặc định)"
                          fullWidth
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.delivery_address || ''}
                          error={
                            !!touched.delivery_address && !!errors.delivery_address
                          }
                          helperText={
                            touched.delivery_address && errors.delivery_address
                          }
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <FormControl variant="outlined" size="small" fullWidth>
                          <InputLabel id="demo-simple-select-outlined-label">
                            Tỉnh/Thành phố
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={values.city}
                            name="city"
                            onChange={handleChange}
                            label="Tỉnh/Thành phố"
                          >
                            <MenuItem value={'Hồ Chí Minh'}>Hồ Chí Minh</MenuItem>
                            <MenuItem value={'Hà Nội'}>Hà Nội</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12}>
                        <FormControl variant="outlined" size="small" fullWidth>
                          <InputLabel id="demo-simple-select-outlined-label">
                            Quận/Huyện
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={values.district}
                            name="district"
                            onChange={handleChange}
                            label="Quận/Huyện"
                          >
                            <MenuItem value={'Bình Thạnh'}>Bình Thạnh</MenuItem>
                            <MenuItem value={'Quận 1'}>Quận 1</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12}>
                        <FormControl variant="outlined" size="small" fullWidth>
                          <InputLabel id="demo-simple-select-outlined-label">
                            Xã/Phường
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={values.ward}
                            name="ward"
                            onChange={handleChange}
                            label="Xã/Phường"
                          >
                            <MenuItem value={'Phường 1'}>Phường 1</MenuItem>
                            <MenuItem value={'Phường 2'}>Phường 2</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* <Grid item md={6} xs={12}>
                    <TextField
                      name="phoneNumber"
                      label="Số điện thoại"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.phoneNumber || ''}
                      error={!!touched.phoneNumber && !!errors.phoneNumber}
                      helperText={touched.phoneNumber && errors.phoneNumber}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="email"
                      type="email"
                      label="Email"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email || ''}
                      error={!!touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="contact"
                      label="Phone"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.contact || ''}
                      error={!!touched.contact && !!errors.contact}
                      helperText={touched.contact && errors.contact}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        label="Birth Date"
                        value={values.birth_date}
                        maxDate={new Date()}
                        inputFormat="dd MMMM, yyyy"
                        shouldDisableTime={() => false}
                        renderInput={(props) => (
                          <TextField
                            size="small"
                            fullWidth
                            {...props}
                            error={
                              (!!touched.birth_date && !!errors.birth_date) ||
                              props.error
                            }
                            helperText={touched.birth_date && errors.birth_date}
                          />
                        )}
                        onChange={(newValue) =>
                          setFieldValue('birth_date', newValue)
                        }
                      />
                    </LocalizationProvider>
                  </Grid> */}
                </Grid>
              </Box>

              <Button type="submit" variant="contained" color="primary">
                Lưu
              </Button>
            </form>
          )}
        </Formik>
      </Card1>
    </CustomerDashboardLayout>
  )
}

const initialValues = {
  full_name: 'NGUYEN TRONG THIEN BAO',
  phoneNumber: '0878578889',
  email: 'te2st@gmail.com',
  birth_date: new Date(),
  delivery_address: 'Bình Thạnh, TP.HCM',
  city: 'Hồ Chí Minh',
  district: 'Bình Thạnh',
  ward: 'Phường 1',
}

const checkoutSchema = yup.object().shape({
  full_name: yup.string().required('required'),
  phoneNumber: yup.string().required('required'),
  email: yup.string().email('invalid email').required('required'),
  contact: yup.string().required('required'),
  delivery_address: yup.string().required('required'),
  birth_date: yup.date().required('invalid date'),
})
ProfileEditor.auth = true
export default ProfileEditor

import BazarButton from '@component/BazarButton'
import BazarTextField from '@component/BazarTextField'
import { H3, Small } from '@component/Typography'
import { Card, CardProps } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'
import { useFormik } from 'formik'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import * as yup from 'yup'

const fbStyle = {
  background: '#3B5998',
  color: 'white',
}
const googleStyle = {
  background: '#4285F4',
  color: 'white',
}

type StyledCardProps = {
  passwordVisibility?: boolean
}

const StyledCard = styled<React.FC<StyledCardProps & CardProps>>(
  ({ children, passwordVisibility, ...rest }) => <Card {...rest}>{children}</Card>
)<CardProps>(({ theme, passwordVisibility }) => ({
  width: 500,
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },

  '.content': {
    textAlign: 'center',
    padding: '3rem 3.75rem 0px',
    [theme.breakpoints.down('xs')]: {
      padding: '1.5rem 1rem 0px',
    },
  },
  '.passwordEye': {
    color: passwordVisibility ? theme.palette.grey[600] : theme.palette.grey[400],
  },
  '.facebookButton': {
    marginBottom: 10,
    '&:hover': fbStyle,
    ...fbStyle,
  },
  '.googleButton': {
    '&:hover': googleStyle,
    ...googleStyle,
  },
  '.agreement': {
    marginTop: 12,
    marginBottom: 24,
  },
}))
interface LoginProps {
  onClose?: any
}
const Login: FC<LoginProps> = ({ onClose }) => {
  const router = useRouter()

  const handleFormSubmit = async (values: any) => {
    // const nguoiDung = await nguoiDungServices.getNguoiDung(values.cif)
    // if (nguoiDung) {
    //   dispatch({ type: 'SET_USER', payload: nguoiDung })
    //   onClose && onClose()
    // } else {
    //   alert('Đã xảy ra lỗi khi lấy thông tin')
    // }
    const res = await signIn('credentials', {
      redirect: false,
      cif: values.cif,
    })
    if (res) {
      if (onClose) {
        onClose()
      } else {
        router.push('/')
      }
    }
  }

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      onSubmit: handleFormSubmit,
      initialValues,
      validationSchema: formSchema,
    })

  return (
    <StyledCard elevation={3}>
      <form className="content" onSubmit={handleSubmit}>
        <H3 textAlign="center" mb={1}>
          Đăng nhập
        </H3>
        <Small
          fontWeight="600"
          fontSize="12px"
          color="grey.800"
          textAlign="center"
          mb={4.5}
          display="block"
        >
          Đăng nhập với số CIF
        </Small>

        <BazarTextField
          mb={1.5}
          name="cif"
          label="Số CIF"
          placeholder="093456"
          variant="outlined"
          size="small"
          fullWidth
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.cif || ''}
          error={!!touched.cif && !!errors.cif}
          helperText={touched.cif && errors.cif}
        />

        {/* <BazarTextField
          mb={2}
          name="password"
          label="Mật khẩu"
          placeholder="*********"
          autoComplete="on"
          type={passwordVisibility ? 'text' : 'password'}
          variant="outlined"
          size="small"
          fullWidth
          InputProps={{
            endAdornment: (
              <IconButton
                size="small"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {passwordVisibility ? (
                  <Visibility className="passwordEye" fontSize="small" />
                ) : (
                  <VisibilityOff className="passwordEye" fontSize="small" />
                )}
              </IconButton>
            ),
          }}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password || ''}
          error={!!touched.password && !!errors.password}
          helperText={touched.password && errors.password}
        /> */}

        <BazarButton
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          sx={{
            mb: '1.65rem',
            height: 44,
          }}
        >
          Đăng nhập
        </BazarButton>

        {/* <Box mb={2}>
          <Box width="200px" mx="auto">
            <Divider />
          </Box>

          <FlexBox justifyContent="center" mt={-1.625}>
            <Box color="grey.600" bgcolor="background.paper" px={2}>
              on
            </Box>
          </FlexBox>
        </Box>

        <BazarButton
          className="facebookButton"
          size="medium"
          fullWidth
          sx={{
            mb: '10px',
            height: 44,
          }}
        >
          <Image
            src="/assets/images/icons/facebook-filled-white.svg"
            alt="facebook"
          />
          <Box fontSize="12px" ml={1}>
            Continue with Facebook
          </Box>
        </BazarButton>
        <BazarButton
          className="googleButton"
          size="medium"
          fullWidth
          sx={{
            height: 44,
          }}
        >
          <Image src="/assets/images/icons/google-1.svg" alt="facebook" />
          <Box fontSize="12px" ml={1}>
            Continue with Google
          </Box>
        </BazarButton>

        <FlexBox justifyContent="center" alignItems="center" my="1.25rem">
          <Box>Chưa có tài khoản ?</Box>
          <Link href="/signup">
            <a>
              <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
                Đăng kí ngay
              </H6>
            </a>
          </Link>
        </FlexBox> */}
      </form>

      {/* <FlexBox justifyContent="center" bgcolor="grey.200" py={2.5}>
        <Link href="/">
          <a>
            <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
              Quên mật khẩu ?
            </H6>
          </a>
        </Link>
      </FlexBox> */}
    </StyledCard>
  )
}

const initialValues = {
  cif: '',
}

const formSchema = yup.object().shape({
  cif: yup.string().required('Vui lòng điền đủ thông tin'),
})

export default Login
